import Spin from "../index.jsx";
import Switch from "../../switch/index.jsx";
const SpinDemo = () => {
  let loading = false;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <Spin spinning={loading}>
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
      </div>
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <Spin size="small" tip="loading">
          <div
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "skyblue",
            }}
          ></div>
        </Spin>
        <Spin size="default" tip="loading">
          <div
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "skyblue",
            }}
          ></div>
        </Spin>
        <Spin size="large" tip="loading">
          <div
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "skyblue",
            }}
          ></div>
        </Spin>
        <text>小中大自定义tip的Spin</text>
      </div>
    </div>
  );
};

export default SpinDemo;
