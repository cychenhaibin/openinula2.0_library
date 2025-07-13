import Select from "./index.jsx";

function SelectDemo() {
  let value1 = '';
  let value2 = 'b';
  let value3 = '';
  let values = []; // 必须在组件内部声明

  const options = [
    { label: '选项A', value: 'a' },
    { label: '选项B', value: 'b' },
    { label: '选项C', value: 'c', disabled: true },
    { label: '选项D', value: 'd' },
  ];

  const options1 = [
    {
      label: '热门城市',
      options: [
        { value: 'Shanghai', label: '上海' },
        { value: 'Beijing', label: '北京' },
      ],
    },
    {
      label: '城市名',
      options: [
        { value: 'Chengdu', label: '成都' },
        { value: 'Shenzhen', label: '深圳' },
        { value: 'Guangzhou', label: '广州' },
        { value: 'Dalian', label: '大连' },
      ],
    },
  ];

  function handleChange1(val) {
    value1 = val;
    console.log('当前选择：', value1);
  }
  function handleChange2(val) {
    value2 = val;
  }
  function handleChange3(val) {
    value3 = val;
    console.log('当前选择：', value3);
  }
  function handleChange(val) {
    values = [...val]; // 直接赋值即可
    console.log('当前选择：', values);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <text>基本用法：</text>
        <Select options={options} onChange={handleChange1} />
      </div>
      <div>
        <text>受控用法：</text>
        <Select options={options} value={value2} onChange={handleChange2} />
      </div>
      <div>
        <text>禁用：</text>
        <Select options={options} disabled />
      </div>
      <div>
        <text>带默认值：</text>
        <Select options={options} defaultValue="d" onChange={handleChange3} />
      </div>
      <div>
        <text>可清空：</text>
        <Select options={options} allowClear onChange={handleChange1} />
      </div>
      <div>
        <text>多选：</text>
        <Select options={options} multiple onChange={handleChange} />
      </div>
      <div>
        <text>多选：</text>
        <Select options={options1} multiple onChange={handleChange} />
      </div>
    </div>
  );
}

export default SelectDemo; 