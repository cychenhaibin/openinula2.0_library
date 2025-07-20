import Input from "../index.jsx";

function Demo6() {
  let value = "";

  function handleInput(e) {
    value = e.target.value;
  }

  return (
    <div>
      <Input
        defaultValue="这是一个输入框"
        allowClear
        placeholder="请输入内容"
      />
    </div>
  );
}

export default Demo6;
