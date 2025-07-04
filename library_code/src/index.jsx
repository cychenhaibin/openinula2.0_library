import { render } from '@openinula/next';
import './index.css';
import Button from './components/button/demo.jsx';
import Radio from './components/radio/demo.jsx';
import Tooltip from './components/tooltip/demo.jsx';
import Notification from './components/Notification/demo.jsx';
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
      </div>

    </div>
  );
}

render(<App />, document.getElementById('root'));
