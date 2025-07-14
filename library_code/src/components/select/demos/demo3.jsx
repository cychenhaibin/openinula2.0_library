import Select from "../index.jsx";

function Demo3() {

  const options = [
    { label: '选项A', value: 'a' },
    { label: '选项B', value: 'b' },
    { label: '选项C', value: 'c', disabled: true },
    { label: '选项D', value: 'd' },
  ];

  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <Select options={options} size="small" />
      <Select options={options} disabled />
    </div>
  )
}

export default Demo3; 