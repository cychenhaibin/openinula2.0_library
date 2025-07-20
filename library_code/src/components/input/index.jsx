import "./index.css";

/**
 * 通用 Input 输入框组件
 * 支持受控/非受控、前后缀、数字统计、禁用、尺寸、形态等
 * openinula2.0 响应式兼容
 */
const Input = ({
  value, // 受控模式下输入值
  defaultValue = "", // 非受控模式下初始值
  allowClear = false, // 是否显示清除按钮
  onInput, // 输入事件
  onChange, // 变更事件
  disabled = false, // 是否禁用
  placeholder = "", // 占位符
  type = "text", // 输入类型
  className = "", // 自定义类名
  style = {}, // 自定义样式
  size = "default", // 输入框尺寸 large/default/small
  variant = "outlined", // 形态 outlined/filled/borderless/underlined
  addonBefore, // 前置标签
  addonAfter, // 后置标签
  showCount = false, // 是否显示字数统计
  maxLength = 100, // 最大长度
  ...rest
}) => {
  let innerValue = value !== undefined ? value : defaultValue;
  const count = innerValue.length;

  // 事件处理，自动调用父组件传递的 onInput/onChange
  const handleInput = (e) => {
    if (value !== undefined) {
      onInput && onInput(e);
      onChange && onChange(e);
    } else {
      innerValue = e.target.value;
      console.log("innerValue", innerValue);
      onInput && onInput(e);
      onChange && onChange(e.target.value);
    }
  }

  // 拼接输入框样式类名
  const inputClassNames = [
    "inula-input",
    `inula-input-${size}`,
    `inula-input-${variant}`,
    showCount ? "inula-input-has-count" : "",
    allowClear ? "inula-input-has-clear" : "",
    disabled ? "inula-input-disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // 拼接外层包裹样式类名
  const wrapperClassNames = [
    "inula-input-wrapper",
    addonBefore ? "inula-input-has-addon-before" : "",
    addonAfter ? "inula-input-has-addon-after" : "",
    `inula-input-wrapper-${size}`,
  ]
    .filter(Boolean)
    .join(" ");

  // 不让 rest 里的 className 覆盖 inputClassNames
  // const { className: _ignore, ...restProps } = rest;

  // 渲染
  return (
    <span className={wrapperClassNames} style={style}>
      {/* 前置标签 */}
      {addonBefore && (
        <span className="inula-input-addon inula-input-addon-before">
          {addonBefore}
        </span>
      )}
      <span className="inula-input-affix-wrapper">
        {/* 输入框本体，受控/非受控兼容 */}
        <input
          type={type}
          value={innerValue}
          defaultValue={defaultValue}
          disabled={disabled}
          placeholder={placeholder}
          maxLength={maxLength}
          onInput={(e) => handleInput(e)}
          // {...restProps}
          className={inputClassNames}
        />
        {/* 清除按钮（可选） */}
        {allowClear && !disabled && (value !== undefined ? value : defaultValue) && (
          <span className="inula-input-clear" onClick={handleClear}>×</span>
        )}
        {/* 字数统计（可选） */}
        {showCount && (
          <span className="inula-input-count-inside">
            {maxLength ? `${count} / ${maxLength}` : count}
          </span>
        )}
      </span>
      {/* 后置标签 */}
      {addonAfter && (
        <span className="inula-input-addon inula-input-addon-after">
          {addonAfter}
        </span>
      )}
    </span>
  );
};

export default Input;
