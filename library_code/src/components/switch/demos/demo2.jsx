import Switch from "../index.jsx";
import Icon from "../../icon/index.jsx";

const SwitchDemo = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <Switch
          checkedChildren="开启"
          unCheckedChildren="关闭"
          defaultChecked
        />
        <Switch checkedChildren="1" unCheckedChildren="0" />
        <Switch
          checkedChildren={<Icon value="check" color="white" size={18} />}
          unCheckedChildren={<Icon value="close" color="white" size={18} />}
          defaultChecked
        />
        <text>带内容的Switch</text>
      </div>
    </div>
  );
};

export default SwitchDemo;
