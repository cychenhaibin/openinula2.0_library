import Switch from "../index.jsx";

const SwitchDemo = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <Switch defaultChecked loading />
        <Switch defaultValue={true} loading size="small" />
        <text>loading-Swicth</text>
      </div>
    </div>
  );
};

export default SwitchDemo;
