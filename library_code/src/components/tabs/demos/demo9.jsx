import Button from "../../button/index.jsx";
import Tabs from "../index.jsx";

const TabsDemo = () => {
  const items = [
    {
      key: "1",
      label: "Tab 1",
      children: "Content of Tab Pane 1",
    },
    {
      key: "2",
      label: "Tab 2",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Tab 3",
      children: "Content of Tab Pane 3",
      closable: false,
    },
  ];

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24, width: "80%" }}>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <Button>ADD</Button>
      </div>
      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
          width: "100%",
        }}
      >
        <Tabs items={items} defaultActiveKey="1" type="editable-card" hideAdd />
      </div>
    </div>
  );
};

export default TabsDemo;
