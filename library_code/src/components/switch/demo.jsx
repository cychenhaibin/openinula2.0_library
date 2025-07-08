import demo1 from "./demos/demo1.jsx";
import demo2 from "./demos/demo2.jsx";

const SwitchDemo = () => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', gap: 16 }}>
            <div><demo1 /></div>
            <div><demo2 /></div>
         </div>
    )
}

export default SwitchDemo;