import Spin from "../index.jsx";

const SpinDemo = () => {

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <Spin />
        <text>一个简单的Spin</text>
      </div>
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <Spin size="small" />
        <Spin size="default" />
        <Spin size="large" />
        <text>小中大的Spin</text>
      </div>
    </div>
  );
};

export default SpinDemo;
