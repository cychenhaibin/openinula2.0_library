import Input from "../index.jsx";

function Demo2() {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Input size="small" placeholder="小尺寸" />
        <Input size="default" placeholder="默认尺寸" />
        <Input size="large" placeholder="大尺寸" />
        <Input
            type="textarea"
            placeholder="小尺寸"
            size="small"
            autoSize={true}
            style={{ marginBottom: '10px' }}
        />
        <Input
            type="textarea"
            placeholder="默认尺寸"
            size="default"
            autoSize={true}
            style={{ marginBottom: '10px' }}
        />
        <Input
            type="textarea"
            placeholder="大尺寸"
            size="large"
            autoSize={true}
            style={{ marginBottom: '10px' }}
        />
    </div>
  );

}

export default Demo2;
