import Switch from "../index.jsx";
import Button from "../../button/index.jsx";

const SwitchDemo = () => {
  let checked = false;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <Switch />
        <text>Switch</text>
      </div>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <Switch size="small"/>
        <text>小号Switch</text>
      </div>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <Switch defaultChecked={true} />
        <text>带默认选中的Switch</text>
      </div>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <Switch defaultChecked={true} disabled={true} />
        <text>默认选中禁用的Switch</text>
      </div>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <Switch disabled={true} />
        <text>禁用的Switch</text>
      </div>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <Switch checked={true} style={{ backgroundColor: "pink" }} />
        <text>选中的Switch</text>
      </div>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <Switch checked={checked} />
        <Button onClick={() => (checked = !checked)}>切换</Button>
        <text>通过外部受控切换状态的Switch</text>
      </div>
    </div>
  );
};

export default SwitchDemo;
