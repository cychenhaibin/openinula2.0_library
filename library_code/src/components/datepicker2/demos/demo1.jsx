import DatePicker from "../index.jsx";

function DatePickerDemo() {
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
          不同picker基础日期选择器
        </h3>
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <DatePicker placeholder="请选择日期" onChange={handleChange} />
          <DatePicker
            picker="week"
            placeholder="请选择周"
            onChange={handleChange}
          />
          <DatePicker
            picker="month"
            placeholder="请选择月份"
            onChange={handleChange}
          />
          <DatePicker
            picker="quarter"
            placeholder="请选择季度"
            onChange={handleChange}
          />
          <DatePicker
            picker="year"
            placeholder="请选择年份"
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: "12px", color: "#262626" }}>不同尺寸</h3>
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <DatePicker
            size="small"
            placeholder="小尺寸"
            onChange={handleChange}
          />
          <DatePicker
            size="default"
            placeholder="默认尺寸"
            onChange={handleChange}
          />
          <DatePicker
            size="large"
            placeholder="大尺寸"
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: "12px", color: "#262626" }}>禁用状态</h3>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <DatePicker disabled placeholder="禁用状态" onChange={handleChange} />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: "12px", color: "#262626" }}>
          不同varient变体
        </h3>
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <DatePicker placeholder="outlined" onChange={handleChange} />
          <DatePicker
            variant="filled"
            placeholder="filled"
            onChange={handleChange}
          />
          <DatePicker
            variant="borderless"
            placeholder="borderless"
            onChange={handleChange}
          />
          <DatePicker
            variant="underline"
            placeholder="underline"
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: "12px", color: "#262626" }}>
          status不同状态
        </h3>
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <DatePicker
            status="error"
            placeholder="error"
            onChange={handleChange}
          />
          <DatePicker
            status="warning"
            placeholder="warning"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default DatePickerDemo;
