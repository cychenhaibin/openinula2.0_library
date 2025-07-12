import { Card } from "../index.jsx";
import Icon from "../../icon/index.jsx";

const actions = [
  <Icon value="wand-magic-sparkles" />,
  <Icon value="gear" />,
  <Icon value="ellipsis" />,
];

const CardDemo = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <Card
          title="Default size card"
          extra={<div>More</div>}
          cover={
            <img
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            />
          }
          actions={actions}
        >
          <div style={{ width: "100%" }}>Card content</div>
          <span>Card content</span>
          <span>Card content</span>
        </Card>
      </div>
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <Card title="borderless card" variant="borderless">
          <div style={{ width: "100%" }}>Card content</div>
        </Card>
        <Card title="outlined small hoverable card" size="small" hoverable>
          <div style={{ width: "100%" }}>Card content</div>
        </Card>
      </div>
    </div>
  );
};

export default CardDemo;
