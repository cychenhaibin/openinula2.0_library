import Input from '../index.jsx';

const Demo7 = () => {
  return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      {/*<h3>Textarea 自动调整高度演示</h3>*/}
          <span>基础 textarea</span>
          <Input
              type="textarea"
              placeholder="这是一个普通的 textarea"
              style={{ marginBottom: '10px' }}
          />

          <span>自动调整高度（布尔值）</span>
          <Input
              type="textarea"
              placeholder="输入文字，高度会自动调整（最小2行，最大6行）"
              autoSize={true}
              style={{ marginBottom: '10px' }}
          />

          <span>自定义最小最大行数</span>
          <Input
              type="textarea"
              placeholder="最小3行，最大8行"
              autoSize={{ minRows: 3, maxRows: 8 }}
              style={{ marginBottom: '10px' }}
          />
    </div>
  );
};

export default Demo7;
