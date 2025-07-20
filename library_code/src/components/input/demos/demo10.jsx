import Input from '../index.jsx';

const Demo10 = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h3>Textarea 自动调整高度 - 简单示例</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <p>基础用法：</p>
        <Input 
          type="textarea"
          placeholder="请输入文字，高度会自动调整"
          autoSize={true}
          style={{ marginBottom: '10px' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <p>自定义最小最大行数：</p>
        <Input 
          type="textarea"
          placeholder="最小3行，最大10行"
          autoSize={{ minRows: 3, maxRows: 10 }}
          style={{ marginBottom: '10px' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <p>带字数统计：</p>
        <Input 
          type="textarea"
          placeholder="带字数统计的自动调整"
          autoSize={true}
          showCount={true}
          maxLength={200}
          style={{ marginBottom: '10px' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <p>不同尺寸：</p>
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
        <p>不同形态：</p>
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
    </div>
  );
};

export default Demo10; 