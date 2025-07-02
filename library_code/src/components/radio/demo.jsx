import Radio from './index.jsx';

function RadioDemo() {
  let selected = 'a';

  function handleRadioChange(val) {
    selected = val;
  }

  return (
    <div>
      <h3>基本用法</h3>
      <Radio label="选项A" value="a" checked={selected === 'a'} onChange={handleRadioChange} name="group1" />
      <Radio label="选项B" value="b" checked={selected === 'b'} onChange={handleRadioChange} name="group1" />
      <Radio label="禁用" value="c" disabled label="禁用选项" name="group1" />
    </div>
  );
} 
export default RadioDemo;