import { RangePicker } from "../index.jsx";
import Icon from "../../icon/index.jsx";

function RangePickerDemo() {
  const handleChange = (value) => {
    console.log("选择的值:", value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        padding: "20px",
        maxWidth: "800px",
      }}
    >
      <div>
        <h3 style={{ marginBottom: "12px", color: "#262626" }}>
          needConfirm 属性控制是否需要确认, showNow 属性控制是否显示“今天”按钮
        </h3>
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <RangePicker
            placeholder="请选择日期"
            needConfirm
            showNow={false}
            onChange={handleChange}
          />
          <RangePicker
            picker="week"
            placeholder="请选择周"
            needConfirm
            onChange={handleChange}
          />
          <RangePicker
            picker="month"
            placeholder="请选择月份"
            needConfirm
            onChange={handleChange}
          />
          <RangePicker
            picker="quarter"
            placeholder="请选择季度"
            needConfirm
            onChange={handleChange}
          />
          <RangePicker
            picker="year"
            placeholder="请选择年份"
            needConfirm
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: "12px", color: "#262626" }}>
          支持改变后缀，以及改变切换calendar切换箭头
        </h3>
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <RangePicker
            prefix={<Icon value="check" theme="filled" size={12} />}
            placeholder="prefix"
            onChange={handleChange}
          />
          <RangePicker
            suffixIcon={<Icon value="check" theme="filled" size={12} />}
            placeholder="suffixIcon"
            onChange={handleChange}
          />
          <RangePicker
            prevIcon={<Icon value="check" theme="filled" size={12} />}
            placeholder="prevIcon"
            onChange={handleChange}
          />
          <RangePicker
            nextIcon={<Icon value="check" theme="filled" size={12} />}
            placeholder="nextIcon"
            onChange={handleChange}
          />
          <RangePicker
            superPrevIcon={<Icon value="check" theme="filled" size={12} />}
            placeholder="superPrevIcon"
            onChange={handleChange}
          />
          <RangePicker
            superNextIcon={<Icon value="check" theme="filled" size={12} />}
            placeholder="superNextIcon"
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: "12px", color: "#262626" }}>
          支持defaultValue，支持format自定义格式，传入format时，defaultValue要与format匹配
        </h3>
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <RangePicker
            defaultValue={["2024-03-10", "2024-04-20"]}
            placeholder="日期-默认值"
            onChange={handleChange}
          />
          <RangePicker
            defaultValue={["2024-37周", "2024-40周"]}
            placeholder="周数-默认值"
            picker="week"
            onChange={handleChange}
          />
          <RangePicker
            defaultValue={["2024-10", "2025-10"]}
            picker="month"
            placeholder="月-默认值"
            onChange={handleChange}
          />
          <RangePicker
            defaultValue={["2024-Q1", "2025-Q4"]}
            picker="quarter"
            placeholder="季度-默认值"
            onChange={handleChange}
          />
          <RangePicker
            defaultValue={["2024", "2036"]}
            picker="year"
            placeholder="年-默认值"
            onChange={handleChange}
          />
          {/* <RangePicker
            defaultValue="2025/09/10"
            placeholder="日期-默认值"
            format="YYYY/MM/DD"
            onChange={handleChange}
          />
          <RangePicker
            defaultValue="2025-37周"
            placeholder="周数-默认值"
            picker="week"
            onChange={handleChange}
          />
          <RangePicker
            defaultValue="2025-09"
            picker="month"
            placeholder="月-默认值"
            onChange={handleChange}
          />
          <RangePicker
            defaultValue="2025-Q1"
            picker="quarter"
            placeholder="季度-默认值"
            onChange={handleChange}
          />
          <RangePicker
            defaultValue="2025"
            picker="year"
            placeholder="年-默认值"
            onChange={handleChange}
          /> */}
        </div>
      </div>

      {/* <div>
        <h3 style={{ marginBottom: "12px", color: "#262626" }}>
          支持defaultPickerValue，存在时每次打开面板，面板page都会重置到此处
        </h3>
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <RangePicker
            defaultPickerValue="2024-10-09"
            placeholder="默认面板"
            onChange={handleChange}
          />
          <RangePicker
            defaultPickerValue="2024-37周"
            placeholder="默认面板"
            picker="week"
            onChange={handleChange}
          />
          <RangePicker
            defaultPickerValue="2024-10"
            placeholder="默认面板"
            picker="month"
            onChange={handleChange}
          />
          <RangePicker
            defaultPickerValue="2024-Q3"
            placeholder="默认面板"
            picker="quarter"
            onChange={handleChange}
          />
          <RangePicker
            defaultPickerValue="2024-10-09"
            placeholder="默认面板"
            picker="year"
            onChange={handleChange}
          />
        </div>
      </div> */}
      <div>
        <h3 style={{ marginBottom: "12px", color: "#262626" }}>
          禁用disabledState，minDate，maxDate
        </h3>
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <RangePicker
            minDate={"2025-08-12"}
            maxDate={"2025-10-24"}
            disabledDate={["2025-09-11"]}
            placeholder="日期范围限定"
            style={{ width: 150 }}
            onChange={handleChange}
          />
          <RangePicker
            minDate={"2025-30周"}
            maxDate={"2025-38周"}
            disabledDate={["2025-33周"]}
            placeholder={"周日期范围限定"}
            style={{ width: 150 }}
            picker="week"
            onChange={handleChange}
          />
          <RangePicker
            minDate={"2024-08"}
            maxDate={"2026-01"}
            disabledDate={["2025-08"]}
            placeholder={"月日期范围限定"}
            style={{ width: 150 }}
            picker="month"
            onChange={handleChange}
          />
          <RangePicker
            minDate={"2023-Q3"}
            maxDate={"2027-Q1"}
            disabledDate={["2025-Q1"]}
            placeholder={"季度日期范围限定"}
            style={{ width: 150 }}
            picker="quarter"
            onChange={handleChange}
          />
          <RangePicker
            minDate={"2000"}
            maxDate={"2060"}
            disabledDate={["2028"]}
            placeholder={"年日期范围限定"}
            style={{ width: 150 }}
            picker="year"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default RangePickerDemo;
