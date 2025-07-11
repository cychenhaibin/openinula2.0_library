import demo1 from "./demos/demo1.jsx";
import demo2 from "./demos/demo2.jsx";
import demo3 from "./demos/demo3.jsx"; 
import demo4 from "./demos/demo4.jsx";
import demo5 from "./demos/demo5.jsx";

const SpinDemo = () => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', gap: 16 }}>
            <div><demo1 /></div>
            <div><demo2 /></div>
            <div><demo3 /></div>
            <div><demo4 /></div>
            <div><demo5 /></div>
         </div>
    )
}

export default SpinDemo;