import { Card } from "../index.jsx";
import Switch from "../../switch/index.jsx";
import Icon from "../../icon/index.jsx";

const actions = [
  <Icon value="wand-magic-sparkles" />,
  <Icon value="gear" />,
  <Icon value="ellipsis" />,
];

const CardDemo = () => {
  let loading = false;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
      <div style={{ display: "flex", gap: 20, alignItems: "center", width: '100%' }}>
      <text style={{width: '20%', textAlign: 'start'}}>定义加载内容状态的Card</text>
        <Card
          title="loading card"
          extra={<div>More</div>}
          cover={
            <img
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            />
          }
          actions={actions}
          loading={loading}
        >
          <div style={{ width: "100%" }}>Card content</div>
          <span>Card content</span>
          <span>Card content</span>
        </Card>
        <Switch
          checked={loading}
          onChange={() => {
            loading = !loading;
          }}
        />
        <text>点击切换内容加载状态</text>
      </div>
      <div style={{ display: "flex", gap: 20, alignItems: "center", width: '100%'}}>
        <text style={{width: '20%', textAlign:'start'}}>嵌套Card样式</text>
        <Card title="inner card" type="inner">
          <div style={{ width: "100%" }}>放在Card下的Card组件样式</div>
        </Card>
      </div>
    </div>
  );
};

export default CardDemo;
