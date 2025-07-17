import Input from "./index.jsx";

function Demo1() {
  let value = "111";
  let value2 = "222";

  function handleInput(e) {
    value = e.target.value;
    console.log("val", value);
  }

  function handleInput2(e) {
    value2 = e.target.value;
    console.log("val2", value2);
  }

  return (
    <div>
      <Input />
      <Input
        size="large"
        defaultValue="hello"
        variant="filled"
        value={value}
        onInput={(e) => (value = e.target.value)}
      />
      <Input size="default" variant="filled" />
      <Input size="small" variant="filled" />
      <Input size="large" variant="outlined" />
      <Input size="default" variant="outlined" />
      <Input size="small" variant="outlined" />
      <Input size="large" variant="borderless" />
      <Input size="default" variant="borderless" />
      <Input addonBefore="http://" addonAfter=".com" />
      <div>
        <Input
          value={value}
          onInput={handleInput}
          showCount
          maxLength={20}
          placeholder="请输入内容1"
        />
        <Input
          value={value2}
          onInput={handleInput2}
          placeholder="请输入内容2"
        />
        <Input
          defaultValue="111"
          // onInput={handleInput2}
          showCount
          placeholder="请输入内容2"
        />
        {/* <div style={{marginTop: 8, color: '#888'}}>当前内容：{val}</div> */}
      </div>
    </div>
  );
}

export default Demo1;
