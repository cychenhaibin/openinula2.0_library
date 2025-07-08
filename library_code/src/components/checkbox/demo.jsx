import demo1 from "./demos/demo1.jsx";
import demo2 from "./demos/demo2.jsx";
import demo3 from "./demos/demo3.jsx";

const CheckboxDemo = () => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', gap: 16 }}>
            <div><demo1 /></div>
            <div><demo2 /></div>
            <div><demo3 /></div>
        </div>
    )
}

export default CheckboxDemo;