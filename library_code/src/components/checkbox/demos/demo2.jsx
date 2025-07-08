import { CheckboxGroup } from "../index.jsx";

const CheckboxDemo = () => {
  let checkedList = ["Apple", "Pear"];
  
  const options = [
    { label: "Apple", value: "Apple", disabled: true },
    { label: "Pear", value: "Pear" },
    { label: "Orange", value: "Orange" },
  ];
  
  const onChange = (list) => {
    checkedList = list;
  };

  return (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <CheckboxGroup
          options={options}
          defaultValue={["Apple"]}
          value={["Apple", "Pear"]}
        />
        <text>带默认选中和选中的CheckboxGroup</text>
      </div>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <CheckboxGroup options={options} defaultValue={["Apple"]} />
        <text>只带默认选中的CheckboxGroup</text>
      </div>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <CheckboxGroup options={options} value={["Apple", "Orange"]} />
        <text>只带选中的CheckboxGroup</text>
      </div>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <CheckboxGroup options={options} disabled />
        <text>全禁用的CheckboxGroup</text>
      </div>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <CheckboxGroup options={options} defaultValue={checkedList} onChange={onChange} />
        <text>受控的CheckboxGroup</text>
      </div>
    </div>
  );
};

export default CheckboxDemo;
