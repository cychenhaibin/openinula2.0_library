import Switch from "../index.jsx";
import Button from "../../button/index.jsx";

const SwitchDemo = () => {
  let checked = false;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
          width: "100%",
        }}
      >
        <text style={{ width: "20%", textAlign: "start" }}>
          默认型号、小号开关
        </text>
        <Switch />
        <text>默认型号</text>
        <Switch size="small" />
        <text>小号</text>
      </div>
      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
          width: "100%",
        }}
      >
        <text style={{ width: "20%", textAlign: "start" }}>
          定义默认选中、选中的开关
        </text>
        <Switch defaultChecked={true} />
        <text>默认选中</text>
        <Switch checked={true} style={{ backgroundColor: "pink" }} />
        <text>选中</text>
      </div>
      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
          width: "100%",
        }}
      >
        <text style={{ width: "20%", textAlign: "start" }}>
          定义默认选中禁用、禁用的开关
        </text>
        <Switch defaultChecked={true} disabled={true} />
        <text>默认选中禁用</text>
        <Switch disabled={true} />
        <text>禁用</text>
      </div>
      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
          width: "100%",
        }}
      >
        <text style={{ width: "20%", textAlign: "start" }}>
          通过外部受控切换状态的开关
        </text>
        <Switch checked={checked} />
        <Button onClick={() => (checked = !checked)}>切换</Button>
      </div>
    </div>
  );
};

export default SwitchDemo;
