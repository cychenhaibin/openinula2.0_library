import Input from "../index.jsx";

function Demo3() {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Input size="default" variant="filled" placeholder="请输入内容" />
        <Input size="default" variant="outlined" placeholder="请输入内容" />
        <Input size="default" variant="borderless" placeholder="请输入内容" />
        <Input size="default" variant="underlined" placeholder="请输入内容" />
        <Input size="default" disabled placeholder="禁用状态" />
    </div>
  );
      
}

export default Demo3;
