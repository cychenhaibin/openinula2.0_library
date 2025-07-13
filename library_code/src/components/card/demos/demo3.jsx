import { Card, CardMeta } from "../index.jsx";
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
        //   title="Default size card"
        //   extra={<div>More</div>}
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
          actions={actions}
        >
          <CardMeta
            avatar={
              <img src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
            }
            title="Card title"
            description="This is the description"
          />
        </Card>
      </div>
    </div>
  );
};

export default CardDemo;
