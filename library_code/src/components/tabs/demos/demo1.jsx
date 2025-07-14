import Tabs from "../index.jsx";
import Icon from "../../icon/index.jsx";
import Button from "../../button/index.jsx";

const LeftExtraContent = <Button type="primary">leftextra</Button>;
const RightExtraContent = <Button type="primary">rightextra</Button>;

const TabsDemo = () => {
  let pos = "top";
  let type = "line"; // line | card | editable-card
  let tabBarExtraContent = { left: LeftExtraContent, right: RightExtraContent };
  const items = [
    {
      key: "1",
      label: "Tab 1",
      children: "Content of Tab Pane 1",
      icon: <Icon value="home" />,
    //   closeIcon: <Icon value="close" />,
    },
    {
      key: "2",
      label: "Tab 2",
      children: "Content of Tab Pane 2",
      disabled: true,
    //   closeIcon: <Icon value="close" />,
    },
    { key: "3", label: "Tab 3", children: "Content of Tab Pane 3" },
  ];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24, width: "80%" }}>
      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
          width: "100%",
        }}
      >
        <Tabs
          items={items}
          tabPosition={pos}
          type={type}
          tabBarExtraContent={tabBarExtraContent}
        />
      </div>
      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
          width: "100%",
        }}
      >
        <Button
          onClick={() => {
            pos = "bottom";
          }}
        >
          bottom
        </Button>
        <Button
          onClick={() => {
            pos = "left";
          }}
        >
          left
        </Button>
        <Button
          onClick={() => {
            pos = "right";
          }}
        >
          right
        </Button>
        <Button
          onClick={() => {
            pos = "top";
          }}
        >
          top
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
          width: "100%",
        }}
      >
        <Button
          onClick={() => {
            type = "line";
          }}
        >
          line
        </Button>
        <Button
          onClick={() => {
            type = "card";
          }}
        >
          card
        </Button>
        <Button
          onClick={() => {
            type = "editable-card";
          }}
        >
          editable-card
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
          width: "100%",
        }}
      ></div>
    </div>
  );
};

export default TabsDemo;
