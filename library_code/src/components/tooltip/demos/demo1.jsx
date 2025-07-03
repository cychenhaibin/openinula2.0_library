import Tooltip from '../index.jsx';
import Button from '../../button/index.jsx';
import '../index.css';

function Demo1() {
    return (
        <div style={{ display: 'flex' }}>
            <Tooltip title="提示文字">
                <Button>鼠标移入显示提示</Button>
            </Tooltip>
        </div>
    );
}

export default Demo1;