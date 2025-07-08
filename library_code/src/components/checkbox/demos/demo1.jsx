import { Checkbox } from "../index.jsx";

const CheckboxDemo = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
      <Checkbox>普通Checkbox</Checkbox>
      <Checkbox checked={true}>选中</Checkbox>
      <Checkbox defaultChecked>默认选中</Checkbox>
      <Checkbox disabled>禁用未选中</Checkbox>
      <Checkbox disabled checked>
        禁用选中
      </Checkbox>
      <Checkbox disabled defaultChecked>
        禁用默认选中
      </Checkbox>
      <Checkbox indeterminate>indeterminate按钮</Checkbox>
      <Checkbox indeterminate checked>
        indeterminate选中
      </Checkbox>
      <Checkbox indeterminate disabled>
        indeterminate按钮禁用
      </Checkbox>
    </div>
  );
};

export default CheckboxDemo;
