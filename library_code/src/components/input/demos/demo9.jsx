import Input from '../index.jsx';

const Demo9 = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h3>Textarea 自动调整高度演示</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <h4>基础 textarea</h4>
        <Input 
          type="textarea"
          placeholder="这是一个普通的 textarea"
          style={{ marginBottom: '10px' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4>自动调整高度（布尔值）</h4>
        <Input 
          type="textarea"
          placeholder="输入文字，高度会自动调整（最小2行，最大6行）"
          autoSize={true}
          style={{ marginBottom: '10px' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4>自定义最小最大行数</h4>
        <Input 
          type="textarea"
          placeholder="最小3行，最大8行"
          autoSize={{ minRows: 3, maxRows: 8 }}
          style={{ marginBottom: '10px' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4>不同尺寸的自动调整</h4>
        <Input 
          type="textarea"
          placeholder="小尺寸"
          size="small"
          autoSize={true}
          style={{ marginBottom: '10px' }}
        />
        <Input 
          type="textarea"
          placeholder="默认尺寸"
          size="default"
          autoSize={true}
          style={{ marginBottom: '10px' }}
        />
        <Input 
          type="textarea"
          placeholder="大尺寸"
          size="large"
          autoSize={true}
          style={{ marginBottom: '10px' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4>不同形态的自动调整</h4>
        <Input 
          type="textarea"
          placeholder="outlined形态"
          variant="outlined"
          autoSize={true}
          style={{ marginBottom: '10px' }}
        />
        <Input 
          type="textarea"
          placeholder="filled形态"
          variant="filled"
          autoSize={true}
          style={{ marginBottom: '10px' }}
        />
        <Input 
          type="textarea"
          placeholder="borderless形态"
          variant="borderless"
          autoSize={true}
          style={{ marginBottom: '10px' }}
        />
        <Input 
          type="textarea"
          placeholder="underlined形态"
          variant="underlined"
          autoSize={true}
          style={{ marginBottom: '10px' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4>带字数统计的自动调整</h4>
        <Input 
          type="textarea"
          placeholder="带字数统计的自动调整"
          autoSize={true}
          showCount={true}
          maxLength={100}
          style={{ marginBottom: '10px' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4>带清除按钮的自动调整</h4>
        <Input 
          type="textarea"
          placeholder="带清除按钮的自动调整"
          autoSize={true}
          allowClear={true}
          style={{ marginBottom: '10px' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4>禁用状态的自动调整</h4>
        <Input 
          type="textarea"
          placeholder="禁用状态的自动调整"
          autoSize={true}
          disabled={true}
          style={{ marginBottom: '10px' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4>带前后缀的自动调整</h4>
        <Input 
          type="textarea"
          placeholder="带前后缀的自动调整"
          autoSize={true}
          addonBefore="前缀"
          addonAfter="后缀"
          style={{ marginBottom: '10px' }}
        />
      </div>
    </div>
  );
};

export default Demo9; 