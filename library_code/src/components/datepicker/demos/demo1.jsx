import DatePicker from '../index.jsx';

function Demo1() {
  const handleChange = (value) => {
    console.log('选择的值:', value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'}}>
      <DatePicker 
        placeholder="请选择日期"
        onChange={handleChange}
      />
      <DatePicker 
        mode="week"
        placeholder="请选择周"
        onChange={handleChange}
      />
      <DatePicker 
        mode="month"
        placeholder="请选择月份"
        onChange={handleChange}
      />
      <DatePicker 
        mode="quarter"
        placeholder="请选择季度"
        onChange={handleChange}
      />
      <DatePicker 
        mode="year"
        placeholder="请选择年份"
        onChange={handleChange}
      />
    </div>
  );
}

export default Demo1;
