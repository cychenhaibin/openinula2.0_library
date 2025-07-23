import Input from "../index.jsx";

function Demo1() {
    let value = "";

    function handleInput(e) {
        value = e.target.value;
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
                <span>非受控组件</span>
                <Input placeholder="请输入内容" />
                <span>受控组件</span>
                <Input value={value} onInput={handleInput} placeholder="请输入内容" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
                <span>不带默认值</span>
                <Input placeholder="请输入内容"/>
                <span>带默认值</span>
                <Input defaultValue="这是一个输入框" placeholder="请输入内容" />
            </div>
        </div>
    );
}

export default Demo1;
