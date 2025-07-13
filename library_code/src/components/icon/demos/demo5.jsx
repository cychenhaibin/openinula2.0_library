import Icon from "../index.jsx";
import { success, error } from "../../Notification/index.jsx";
import "../index.css";
import { filledIconValueList, brandIconValueList } from "./iconlist.ts";

const handleCopy = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    success({ message: "Copy success!", placement: "top" });
  } catch (err) {
    error({ message: "Copy failed!", placement: "top" });
  }
};

const IconItem = ({ value, theme }) => {
  const text = `<Icon value="${value}" theme="${theme}" />`;
  return (
    <div className="inula-icon-item" onClick={() => handleCopy(text)}>
      <div>
        <Icon value={value} theme={theme} size={32} />
      </div>
      <text className="inula-icon-item-text">{value}</text>
    </div>
  );
};

const IconDemo = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24, width: "100%" }}>
      <div
        style={{
          display: "flex",
          gap: 16,
          width: "100%",
        }}
      >
        <text>实体图标表</text>
        <div className="inula-icon-table">
          {filledIconValueList.map((value) => (
            <IconItem key={value} value={value} theme="filled" />
          ))}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: 16,
          width: "100%",
        }}
      >
        <text>品牌图标表</text>
        <div className="inula-icon-table">
          {brandIconValueList.map((value) => (
            <IconItem key={value} value={value} theme="brand" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IconDemo;
