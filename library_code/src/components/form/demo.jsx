import demo1 from './demos/demo1.jsx';
import demo2 from './demos/demo2.jsx';
import demo3 from './demos/demo3.jsx';
// import demo4 from './demos/demo4.jsx';
// import demo5 from './demos/demo5.jsx';
// import demo6 from './demos/demo6.jsx';

function FormDemo() {
    let loading = false;
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex',alignItems:'center', gap: 16 }}>
                <h2>基本</h2>
                <div>基本的表单数据域控制展示，包含布局、初始化、验证、提交。</div>
            </div>
            <div><demo1 /></div>

            <div style={{ display: 'flex',alignItems:'center', gap: 16 }}>
                <h2>表单方法调用</h2>
                <div>展示表单的各种方法调用，包括校验、重置、设置值等。</div>
            </div>
            <div><demo2 /></div>

            <div style={{ display: 'flex',alignItems:'center', gap: 16 }}>
                <h2>表单布局</h2>
                <div>表单有三种布局。</div>
            </div>
            <div><demo3 /></div>

            <div style={{ display: 'flex',alignItems:'center', gap: 16 }}>
                <h2>禁用</h2>
                <div>展示五种类型按钮的'禁用'状态用法。</div>
            </div>
            {/* <div><demo4 /></div> */}

            <div style={{ display: 'flex',alignItems:'center', gap: 16 }}>
                <h2>加载中</h2>
                <div>展示五种类型按钮的'加载中'状态用法。</div>
            </div>
            {/* <div><demo5 /></div> */}

            <div style={{ display: 'flex',alignItems:'center', gap: 16 }}>
                <h2>交互加载</h2>
                <div>演示点击按钮后进入加载中状态，1.5秒后恢复。</div>
            </div>
            {/* <div><demo6 /></div> */}
        </div>
    );
} 
export default FormDemo;
