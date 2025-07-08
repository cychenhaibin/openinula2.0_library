import { render } from '@openinula/next';
import './index.css';
import './colors.css';
import Button from './components/button/demo.jsx';
import Icon from './components/icon/demo.jsx';
import Checkbox from './components/checkbox/demo.jsx';
import Switch from './components/switch/demo.jsx';

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
      </div>
    </div>
  );
}

render(<App />, document.getElementById('root'));
