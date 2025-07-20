import Input from "../index.jsx";

function Demo2() {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Input size="small" placeholder="请输入内容" />
        <Input size="default" placeholder="请输入内容" />
        <Input size="large" placeholder="请输入内容" />
    </div>
  );
      
}

export default Demo2;
