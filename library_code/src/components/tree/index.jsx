import "./index.css";
import { Checkbox } from "../checkbox/index.jsx";
import Icon from "../icon/index.jsx";
import { didMount, watch } from "@openinula/next";
import {
  getKeyToTreeMap,
  getChildToParentMap,
  getAllChildKeys,
  getAllRelatedChildKeys,
  initialAllExpandedKeys,
  initialCustomExpandedKeys,
  initialCustomCheckedKeys,
  initialCustomSelectedKeys,
  calculateExpandKeys,
  calculateCheckedKeys,
  calculateSelectedKeys,
  judgeHalfCheckedKeys,
} from "./utils/index.js";

const Tree = ({
  autoExpandParent = false, // 是否自动展开父节点
  blockNode = false, //是否节点占据一行
  checkable = false, // 是否显示复选框
  checkedKeys = [], // 受控选中复选框的树节点，父节点设置时子节点自动选中，string[] | checkStrictly：{checked: string[], halfChecked: string[]}
  checkStrictly = false, // 父子节点不再关联，完全受控
  defaultCheckedKeys = [], // 默认选中的树节点
  defaultExpandAll = false, // 默认展开所有树节点
  defaultExpandParent = true, // 默认展开父节点
  defaultExpandedKeys = [], // 默认展开指定的树节点
  expandedKeys = [], // 受控展开的树节点
  disabled = false, // 禁用树
  fieldNames = {}, // 自定义字段名
  filterTreeNode = () => true, // 按需筛选树节点
  height, //设置虚拟滚动容器高度，设置后内部不再支持横向滚动
  icon, //标题之前插入自定义图标，需设置showIcon为true
  loadData, // 异步加载数据，需设置loadData属性，返回Promise对象，返回值为树节点数据
  loadedKeys = [], // 受控已加载的树节点，用于控制异步加载，需配合loadData属性使用
  multiple = false, // 是否支持多选
  selectable = false, // 是否支持选中
  defaultSelectedKeys = [], //默认选中的树节点，多选需配合multiple属性使用
  selectedKeys = [], // 受控选中的树节点，多选需配合multiple属性使用
  showIcon = false, // 是否显示图标
  showLine = false, // 是否显示连接线
  switcherIcon, // 自定义展开图标
  switcherLoadingIcon, // 自定义加载中图标
  titleRender, // 自定义渲染节点
  rootStyle, //Tree最外层Style
  treeData, // 树节点数据,array<{key, title, children, [disabled, selectable]}>
  virtual = true, // 是否开启虚拟滚动，设置false关闭虚拟滚动
  onCheck, // 点击复选框触发
  onDrop, //drop事件触发
  onExpand, // 展开/收起节点时触发
  onLoad, // 异步加载数据时触发
  onSelect, // 选中/取消选中节点时触发
  onRightClick, // 右键点击节点时触发
  className, // 自定义类名
  ...rest
}) => {
  //选中、展开节点
  let customCheckedKeys = [];
  let customSelectedKeys = [];
  let customExpandedKeys = [];
  //节点树的相关信息
  let keyToNodeInfoMap = new Map(); //nodeInfo: { node, parent, depth, isLast };
  let maxDepth = 1; //树最大深度
  //异步节点管理
  let loadKeys = { loadedKeys: loadedKeys, loadingKeys: [] };
  // let test;
  // let customLoadedKeys;

  /**
   * 树节点展开控制
   * 优先级：受控 > all > 默认
   */
  //初始化
  const initialExpandedKeys = (currentTree) => {
    if (expandedKeys.length > 0) {
      return initialCustomExpandedKeys(
        currentTree,
        expandedKeys,
        autoExpandParent || defaultExpandParent
      );
    }
    if (defaultExpandAll) {
      return initialAllExpandedKeys(currentTree);
    }
    if (!defaultExpandAll && defaultExpandedKeys.length > 0) {
      return initialCustomExpandedKeys(
        currentTree,
        defaultExpandedKeys,
        autoExpandParent || defaultExpandParent
      );
    }
    return [];
  };

  /**
   * 树节点选中控制
   * 优先级：受控 > 默认
   */
  //checked选中
  const initialCheckedKeys = (currentTree) => {
    if (checkedKeys.length > 0) {
      return initialCustomCheckedKeys(currentTree, checkedKeys, checkStrictly);
    } else {
      return initialCustomCheckedKeys(
        currentTree,
        defaultCheckedKeys,
        checkStrictly
      );
    }
  };

  //selected选中
  const initialSelectedKeys = () => {
    if (selectedKeys.length > 0) {
      return initialCustomSelectedKeys(selectedKeys, multiple);
    } else {
      return initialCustomSelectedKeys(defaultCheckedKeys, multiple);
    }
  };

  /** 点击事件 */
  //type = 'expand' | 'check' | 'select'
  const hanldleClick = (target, type, e) => {
    switch (type) {
      case "expand": {
        const { loadedKeys, loadingKeys } = loadKeys;
        const isAlreadyLoaded = loadedKeys.includes(target.key);
        const isLoading = loadedKeys.includes(target.key);
        const shouldLoad = loadData && !isAlreadyLoaded && !isLoading;

        if (shouldLoad) {
          loadingKeys.push(target.key);
          loadData(target.key)
            .then(() => {
              loadKeys.loadedKeys.push(target.key);
              loadKeys = {
                ...loadKeys,
                loadingKeys: loadingKeys.filter((key) => key !== target.key),
              };
            })
            .catch(() => {
              loadKeys = {
                ...loadKeys,
                loadingKeys: loadingKeys.filter((key) => key !== target.key),
              };
            });
        }

        customExpandedKeys = calculateExpandKeys(target, [
          ...customExpandedKeys,
        ]);
        if (onExpand) onExpand(customExpandedKeys, e);
        break;
      }
      case "check": {
        const childKeys = getAllRelatedChildKeys(target);
        customCheckedKeys = calculateCheckedKeys(
          target,
          [...customCheckedKeys],
          keyToNodeInfoMap,
          childKeys,
          checkStrictly
        );
        if (onCheck) onCheck(customCheckedKeys, e);
        break;
      }
      case "select": {
        customSelectedKeys = calculateSelectedKeys(
          target,
          [...customSelectedKeys],
          multiple
        );
        if (onSelect) onSelect(customSelectedKeys, e);
        break;
      }
      default:
        console.error("错误操作");
    }
  };

  //样式控制
  const classNames = ["inula-tree", className].filter(Boolean).join(" ");
  const styles = {
    ...rootStyle,
  };

  /** TreeNode节点组件 */
  /*TreeNode Props
   * title: 节点标题
   * key: 节点唯一标识，必填
   * isLeaf: 是否为叶子节点，默认false
   * selectable: 是否可选，默认false
   * disabled: 是否禁用，默认false
   * children: 子节点，array<TreeNode>
   * icon: 自定义图标，ReactNode
   * disableCheckbox: 是否禁用复选框，默认false
   */
  const TreeNode = ({ node }) => {
    const nodeInfo = keyToNodeInfoMap.get(node.key);
    const isExpanded = customExpandedKeys.includes(node.key);
    const isChecked = customCheckedKeys.includes(node.key);
    const isSelected = customSelectedKeys.includes(node.key);
    const isCheckDisabled = node.disabled || node.disableCheckbox;
    const isSelectDisabled = node.disabled;
    const isHalfChecked =
      !isChecked &&
      node.children &&
      judgeHalfCheckedKeys(
        node,
        customCheckedKeys,
        getAllRelatedChildKeys(node)
      );
    const isLeafNode = node.isLeaf || !node.children;
    // const isLoading = loadKeys.loadingKeys.includes(node.key);

    const Switcher = () => {
      if (isLeafNode) return null;
      // if (isLoading) {
      //   return switcherLoadingIcon;
      // }
      if (switcherIcon) {
        return (
          <div
            style={{
              rotate: `${isExpanded ? 90 : 0}deg`,
              transition: "all 0.3s ease-in-out",
            }}
          >
            {switcherIcon}
          </div>
        );
      }

      return (
        <Icon
          value="caret-right"
          theme="filled"
          size={14}
          rotate={isExpanded ? 90 : 0}
        />
      );
    };

    const ChildrenRender = () => {
      let contentRef;
      // let maxHeight;

      // const setMaxHeight = () => {
      //   console.log(contentRef);
      //   if (isExpanded && maxHeight !== contentRef.scrollHeight) {
      //     // console.log(contentRef.scrollHeight);
      //     maxHeight = contentRef.scrollHeight;
      //   }
      // };

      // didMount(() => {
      //   console.log(contentRef);
      //   if (isExpanded && contentRef) {
      //     maxHeight = contentRef.scrollHeight;
      //   } else {
      //     maxHeight = 0;
      //   }
      // });

      // watch(() => {
      //   if (isExpanded && contentRef) {
      //     setMaxHeight();
      //   }
      // });

      if (isLeafNode || node.children.length === 0) return <></>;

      return (
        <div
          ref={contentRef}
          className={childClassNames}
          // style={{ "--max-height": `${maxHeight}px` }}
        >
          {node.children.map((child) => (
            <TreeNode key={child.key} node={child} />
          ))}
        </div>
      );
    };

    //TreeNode样式计算
    const treeNodeClassName = [
      "inula-tree-node",
      showLine && isLeafNode && "showLine",
    ]
      .filter(Boolean)
      .join(" ");

    const titleClassNames = [
      "inula-tree-node-content-title",
      nodeInfo.depth === maxDepth && "space",
      showLine && isLeafNode && "showLine",
    ]
      .filter(Boolean)
      .join(" ");

    const textClassNames = [
      "inula-tree-node-content-text",
      isSelected && "isSelected",
      isSelectDisabled && "disabled",
    ]
      .filter(Boolean)
      .join(" ");

    const childClassNames = [
      "inula-tree-children",
      !isExpanded ? "inula-tree-children-fold" : "",
      showLine && !nodeInfo.isLast && "showLine",
    ]
      .filter(Boolean)
      .join(" ");

    const switcherClassNames = [
      "inula-tree-node-content-switcher",
      isLeafNode && "notExpanded",
    ]
      .filter(Boolean)
      .join(" ");

    //渲染
    return (
      <li className={treeNodeClassName} data-leaf={isLeafNode}>
        <div className="inula-tree-node-content">
          {nodeInfo.depth !== maxDepth && (
            <div
              className={switcherClassNames}
              onClick={(e) => hanldleClick(node, "expand", e)}
            >
              <Switcher />
            </div>
          )}

          <div className={titleClassNames}>
            {showLine && isLeafNode && !nodeInfo.isLast && (
              <div className="inula-tree-node-content-line"></div>
            )}

            {checkable && (
              <Checkbox
                indeterminate={isHalfChecked}
                checked={isChecked}
                disabled={isCheckDisabled}
                onChange={(e) => hanldleClick(node, "check", e)}
              />
            )}

            {titleRender ? (
              titleRender(node)
            ) : (
              <text
                className={textClassNames}
                onClick={(e) =>
                  !isSelectDisabled && hanldleClick(node, "select", e)
                }
              >
                {showIcon && node.icon && <>{node.icon}</>}
                {node.title}
              </text>
            )}
          </div>
        </div>

        <ul>{ChildrenRender}</ul>
      </li>
    );
  };

  //初始化，以及受控初始化
  didMount(() => {
    onLoad && onLoad();
    const { map, depth } = getKeyToTreeMap(treeData);
    keyToNodeInfoMap = map;
    maxDepth = depth;
    customExpandedKeys = initialExpandedKeys(treeData);
    customCheckedKeys = initialCheckedKeys(treeData);
    customSelectedKeys = initialSelectedKeys(treeData);
  });

  watch(() => {
    const { map, depth } = getKeyToTreeMap(treeData);
    keyToNodeInfoMap = map;
    maxDepth = depth;
    customExpandedKeys = initialExpandedKeys(treeData);
    customCheckedKeys = initialCheckedKeys(treeData);
    customSelectedKeys = initialSelectedKeys(treeData);
  });

  return (
    <li className={classNames} style={styles} {...rest}>
      <ul>
        {treeData.map((node) => (
          <TreeNode key={node.key} node={node} />
        ))}
      </ul>
    </li>
  );
};

export default Tree;
