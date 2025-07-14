import Input from "./index.jsx";
let val = '';
function Demo1() {
    function handleInput(e) {
        val = e.target.value;
      }

    return (
    <div>
        <Input />
        <Input size="large" defaultValue="hello" variant="filled" value={val} onInput={e => val = e.target.value} />
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
        value={val}
        onInput={handleInput}
        showCount
        maxLength={20}
        placeholder="请输入内容"
      />
      <Input
        value={val}
        onInput={handleInput}
        placeholder="请输入内容"
      />
      {/* <div style={{marginTop: 8, color: '#888'}}>当前内容：{val}</div> */}
    </div>
    </div>
    )
}

export default Demo1; 