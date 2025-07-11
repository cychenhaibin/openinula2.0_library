import Spin from "../index.jsx";
import Switch from "../../switch/index.jsx";
const SpinDemo = () => {
  let loading = false;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <Spin spinning={loading} delay={1000}>
          <div
            style={{
              width: "200px",
              height: "200px",
              backgroundColor: "skyblue",
            }}
          >
            测试children
          </div>
        </Spin>
        <Switch checked={loading} onChange={() => (loading = !loading)} />
        <text>延迟触发</text>
      </div>
    </div>
  );
};

export default SpinDemo;
