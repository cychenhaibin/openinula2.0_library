import Input from "../index.jsx";

function Demo3() {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Input size="default" variant="filled" placeholder="filled形态" />
        <Input size="default" variant="outlined" placeholder="outlined形态" />
        <Input size="default" variant="borderless" placeholder="borderless形态" />
        <Input size="default" variant="underlined" placeholder="underlined形态" />
        <Input size="default" disabled placeholder="禁用状态" />
        <Input
            type="textarea"
            placeholder="filled形态"
            variant="filled"
            autoSize={true}
        />
        <Input
            type="textarea"
            placeholder="outlined形态"
            variant="outlined"
            autoSize={true}
        />
        <Input
            type="textarea"
            placeholder="borderless形态"
            variant="borderless"
            autoSize={true}
        />
        <Input
            type="textarea"
            placeholder="underlined形态"
            variant="underlined"
            autoSize={true}
        />
        <Input
            type="textarea"
            placeholder="禁用状态的自动调整"
            autoSize={true}
            disabled={true}
        />
    </div>
  );

}

export default Demo3;
