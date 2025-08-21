import demo1 from "./demos/demo1.jsx";

const TreeDemo = () => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <h2>基本</h2>
        <div>默认选中第一项</div>
      </div>
      <div>
        <demo1 />
      </div>
    </div>
  );
};

export default TreeDemo;
