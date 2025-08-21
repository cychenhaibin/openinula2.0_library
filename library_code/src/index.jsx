import { render } from '@openinula/next';
import './index.css';
import './colors.css';
import Button from './components/button/demo.jsx';
import Icon from './components/icon/demo.jsx';
import Checkbox from './components/checkbox/demo.jsx';
import Switch from './components/switch/demo.jsx';
import Radio from './components/radio/demo.jsx';
import Tooltip from './components/tooltip/demo.jsx';
import Notification from './components/notification/demo.jsx';
import Spin from './components/spin/demo.jsx';
import Card from './components/card/demo.jsx';
import Tabs from './components/tabs/demo.jsx';
import Tree from './components/tree/demo.jsx';
window.render = render; 
import Select from './components/select/demo.jsx';
import Input from './components/input/demo.jsx';
import Modal from './components/modal/demo.jsx';
import DatePicker from './components/datepicker/demo.jsx';
import Form from './components/form/demo.jsx';

window.render = render;

function App() {
  return (
    <div className="container">
      <div className="hero">
        <h1 className="hero-title animate__animated animate__fadeInDown">欢迎使用 inula-next 组件库!</h1>
        <p className="hero-subtitle animate__animated animate__fadeInUp">Button 组件</p>
        <div className="hero-content">
          <Button />
        </div>
        <p className="hero-subtitle animate__animated animate__fadeInUp">Icon 组件</p>
        <div className="hero-content">
          <Icon />
        </div>
        <p className="hero-subtitle animate__animated animate__fadeInUp">Checkbox 组件</p>
        <div className="hero-content">
          <Checkbox />
        </div>
        <p className="hero-subtitle animate__animated animate__fadeInUp">Switch 组件</p>
        <div className="hero-content">
          <Switch />
        </div>
        <p className="hero-subtitle animate__animated animate__fadeInUp">Radio 组件</p>
        <div className="hero-content">
          <Radio />
        </div>
        <p className="hero-subtitle animate__animated animate__fadeInUp">Tooltip 组件</p>
        <div className="hero-content">
          <Tooltip />
        </div>
        <p className="hero-subtitle animate__animated animate__fadeInUp">Notification 通知组件</p>
        <div className="hero-content">
          <Notification />
        </div>
        <p className="hero-subtitle animate__animated animate__fadeInUp">Spin 加载组件</p>
        <div className="hero-content">
          <Spin />
        </div>
        <p className="hero-subtitle animate__animated animate__fadeInUp">Card 组件</p>
        <div className="hero-content">
          <Card />
        </div>
        <p className="hero-subtitle animate__animated animate__fadeInUp">Tabs 组件</p>
        <div className="hero-content">
          <Tabs />
        </div>
        <p className="hero-subtitle animate__animated animate__fadeInUp">Tree 组件</p>
        <div className="hero-content">
          <Tree />
        <p className="hero-subtitle animate__animated animate__fadeInUp">Select 选择器组件</p>
        <div className="hero-content">
          <Select />
        </div>
        <p className="hero-subtitle animate__animated animate__fadeInUp">Input 输入框组件</p>
        <div className="hero-content">
          <Input />
        </div>
        <p className="hero-subtitle animate__animated animate__fadeInUp">Modal 模态框组件</p>
        <div className="hero-content">
          <Modal />
        </div>
        <p className="hero-subtitle animate__animated animate__fadeInUp">DatePicker 日期选择器组件</p>
        <div className="hero-content">
          <DatePicker />
        </div>
        <p className="hero-subtitle animate__animated animate__fadeInUp">Form 表单组件</p>
        <div className="hero-content">
          <Form />
        </div>
      </div>
      </div>
    </div>
  );
}

render(<App />, document.getElementById('root'));
