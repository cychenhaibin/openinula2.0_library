import Switch from "../index.jsx";

const SwitchDemo = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
      <div style={{ display: "flex", gap: 16, alignItems: "center", width: '100%' }}>
      <text style={{ width: "20%", textAlign: "start" }}>加载状态的开关</text>
        <Switch defaultChecked loading />
        <Switch defaultValue={true} loading size="small" />
      </div>
    </div>
  );
};

export default SwitchDemo;
