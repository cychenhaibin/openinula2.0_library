import Tooltip from '../index.jsx';
import Button from '../../button/index.jsx';
import '../index.css';

function Demo() {
  return (
    <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex' }}>
        <Tooltip title="上方提示" placement="top" trigger="hover">
          <Button>上方 hover</Button>
        </Tooltip>
      </div>
      <div style={{ display: 'flex' }}>
        <Tooltip title="下方提示" placement="bottom">
          <Button>下方 hover</Button>
        </Tooltip>
      </div>
      <div style={{ display: 'flex' }}>
        <Tooltip title="左侧提示" placement="left">
          <Button>左侧 hover</Button>
        </Tooltip>
      </div>
      <div style={{ display: 'flex' }}>
        <Tooltip title="右侧提示" placement="right">
          <Button>右侧 hover</Button>
        </Tooltip>
      </div>
    </div>
  );
}
export default Demo;