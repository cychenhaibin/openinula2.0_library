# Form 表单

高性能表单控件，自带数据域管理。包含数据录入、校验以及对应样式。

## 何时使用

用于创建一个实体或收集信息。

需要对输入的数据类型进行校验时。

## 代码演示

<!-- markdownlint-disable MD033 -->
<div style="border: 1px solid #eaecef; border-radius: 4px; padding: 0 20px 20px; margin: 20px 0">
<iframe
  src="http://localhost:5173/#/form/demo1"
  style="width: 100%; height: 55px; border: 0;"
></iframe>
<h3>基本</h3>
<p>基本的表单数据域控制展示，包含布局、初始化、验证、提交。</p>

<details class="demo-source">
  <summary style="padding-inline-start: 0;">查看示例代码</summary>

```jsx | pure
import {Button,Input,Form, FormItem, setValueByPath,Checkbox} from 'inula-ui';

const Demo1 = () => {
  let layout = 'horizontal';
  let user = {
    username: '',
    password: '',
    remember: false,
  };

  const rules = {
    username: [
      { required: true, message: '请输入用户名' },
      { min: 3, message: '至少 3 个字符' }
    ],
    password: [
      { required: true, message: '请输入密码' },
      { min: 6, message: '至少 6 位' }
    ],
  };

  const handleFinish = (values) => {
    console.log('提交成功：', values);
    alert('提交成功: ' + JSON.stringify(values));
  };

  const handleFailed = ({ errors }) => {
    console.log('提交失败：', errors);
    // alert('提交失败: ' + JSON.stringify(errors));
  };

  return (
    <div style={{ padding: 24, width: 600 }}>
      <Form
        model={user}
        rules={rules}
        layout={layout}
        onFinish={handleFinish}
        onFinishFailed={handleFailed}
      >
        <FormItem name="username" label="Username" required model={user}>
          <Input
            placeholder="请输入用户名"
            onInput={(e) => setValueByPath(user, 'username', e.target.value)}
          />
        </FormItem>

        <FormItem name="password" label="Password" required model={user}>
          <Input
            type="password"
            placeholder="请输入密码"
            onInput={(e) => setValueByPath(user, 'password', e.target.value)}
          />
        </FormItem>

        <FormItem name="remember" label={null} model={user}>
          <Checkbox 
            defaultChecked={user.remember}
            onChange={(e) => {
              user.remember = e.target.checked;
            }}
          >
            Remember me
          </Checkbox>
        </FormItem>

        <FormItem name="remember" label={null} model={user}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
    </div>
  );
};

export default Demo1;

```

</details>
</div>
<!-- markdownlint-enable MD033 -->

<!-- markdownlint-disable MD033 -->
<div style="border: 1px solid #eaecef; border-radius: 4px; padding: 0 20px 20px; margin: 20px 0">
<iframe
  src="http://localhost:5173/#/form/demo2"
  style="width: 100%; height: 55px; border: 0;"
></iframe>
<h3>表单方法调用</h3>
<p>展示表单的各种方法调用，包括校验、重置、设置值等。</p>

<details class="demo-source">
  <summary style="padding-inline-start: 0;">查看示例代码</summary>

```jsx | pure
import {Button,Input,Form, FormItem, setValueByPath} from 'inula-ui';

const Demo = () => {
  let layout = 'horizontal';
  let user = {
    username: '',
    email: '',
    phone: ''
  };

  const rules = {
    username: [
      { required: true, message: '请输入用户名' },
      { min: 3, message: '至少 3 个字符' }
    ],
    email: [
      { required: true, message: '请输入邮箱' },
      { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '邮箱格式不正确' }
    ],
    phone: [
      { required: true, message: '请输入手机号' },
      { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
    ]
  };

  let formRef = null;

  const handleFinish = (values) => {
    console.log('提交成功：', values);
  };

  const handleFailed = ({ errors }) => {
    console.log('提交失败：', errors);
  };

  const handleSetValues = () => {
    
    // 尝试通过重新赋值整个对象来触发响应式更新
    user.username = 'testuser';
    user.email = 'test@example.com';
    user.phone = '13800138000';
    
    // 强制触发响应式更新
    // user = { ...user };
    
    console.log('SetValues - user:', user);
    alert('表单值已设置');
  };

  return (
    <div style={{ padding: 24, width: 600 }}>
      <Form
        ref={formRef}
        model={user}
        rules={rules}
        layout={layout}
        onFinish={handleFinish}
        onFinishFailed={handleFailed}
      >
        <FormItem name="username" label="Username" required model={user}>
          <Input
            placeholder="请输入用户名"
            onInput={(e) => setValueByPath(user, 'username', e.target.value)}
          />
        </FormItem>

        <FormItem name="email" label="Email" required model={user}>
          <Input
            placeholder="请输入邮箱"
            onInput={(e) => setValueByPath(user, 'email', e.target.value)}
          />
        </FormItem>

        <FormItem name="phone" label="Phone" required model={user}>
          <Input
            placeholder="请输入手机号"
            onInput={(e) => setValueByPath(user, 'phone', e.target.value)}
          />
        </FormItem>

        <div style={{ marginLeft: 120, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button type="primary" htmlType="submit">Submit</Button>
          <Button htmlType="reset">Reset</Button>
          <Button type="link" onClick={handleSetValues}>Fill form</Button>
        </div>
      </Form>
    </div>
  );
};

export default Demo;

```

</details>
</div>
<!-- markdownlint-enable MD033 -->

<!-- markdownlint-disable MD033 -->
<div style="border: 1px solid #eaecef; border-radius: 4px; padding: 0 20px 20px; margin: 20px 0">
<iframe
  src="http://localhost:5173/#/form/demo3"
  style="width: 100%; height: 85px; border: 0;"
></iframe>
<h3>表单布局</h3>
<p>表单有三种布局。</p>

<details class="demo-source">
  <summary style="padding-inline-start: 0;">查看示例代码</summary>

```jsx | pure
import {Button,Input,Form, FormItem, setValueByPath,Select} from 'inula-ui';

const Demo3 = () => {
    let layout = 'inline';
    let searchForm = {
        keyword: '',
        category: ''
    };

    const categoryOptions = [
        { label: '全部', value: 'all' },
        { label: '技术', value: 'tech' },
        { label: '设计', value: 'design' },
        { label: '产品', value: 'product' }
    ];

    const handleSearch = (values) => {
        console.log('搜索条件：', values);
    };

    const handleReset = () => {
        searchForm.keyword = '';
        searchForm.category = '';
    };

    return (
        <div style={{ paddingTop: 24, textAlign: 'left' }}>
            <Form
                model={searchForm}
                layout={layout}
                labelAlign="left"
                onFinish={handleSearch}
                style={{ marginBottom: 16, maxWidth: layout === 'inline' ? 'none' : 600 }}
            >
                <FormItem label="Form Layout" name="layout" style={{display: 'flex'}}>
                    <div style={{ display: 'flex', gap: 12 }}>
                        <Button type={layout === 'horizontal' ? 'primary' : 'default'} onClick={() => { layout = 'horizontal'; }}>horizontal</Button>
                        <Button type={layout === 'vertical' ? 'primary' : 'default'} onClick={() => { layout = 'vertical'; }}>vertical</Button>
                        <Button type={layout === 'inline' ? 'primary' : 'default'} onClick={() => { layout = 'inline'; }}>inline</Button>
                    </div>
                </FormItem>
                <FormItem name="keyword" label="Field A" model={searchForm}>
                    <Input
                        placeholder="input placeholder"
                        onInput={(e) => setValueByPath(searchForm, 'keyword', e.target.value)}
                    />
                </FormItem>

                <FormItem name="category" label="Field B" model={searchForm}>
                    <Select
                        placeholder="input placeholder"
                        options={categoryOptions}
                        onChange={(value) => setValueByPath(searchForm, 'category', value)}
                    />
                </FormItem>

                <FormItem name="actions" label={null} model={searchForm}>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <Button type="primary" htmlType="submit">Search</Button>
                        <Button onClick={handleReset}>Reset</Button>
                    </div>
                </FormItem>
            </Form>
        </div>
    );
};

export default Demo3;

```

</details>
</div>
<!-- markdownlint-enable MD033 -->

<!-- markdownlint-disable MD033 -->
<div style="border: 1px solid #eaecef; border-radius: 4px; padding: 0 20px 20px; margin: 20px 0">
<iframe
  src="http://localhost:5173/#/form/demo4"
  style="width: 100%; height: 55px; border: 0;"
></iframe>
<h3>表单禁用</h3>
<p>展示表单的禁用功能，包括禁用状态切换、表单重置等。</p>

<details class="demo-source">
  <summary style="padding-inline-start: 0;">查看示例代码</summary>

```jsx | pure
import {Button,Input,Form, FormItem, setValueByPath,Select,Radio,Switch} from 'inula-ui';

const Demo4 = () => {
  let isDisabled = false;
  let formData = {
    radio: '',
    input: '',
    select: '',
    textarea: '',
    switch: false
  };

  const selectOptions = [
    { label: '选项1', value: 'option1' },
    { label: '选项2', value: 'option2' },
    { label: '选项3', value: 'option3' }
  ];

  const radioOptions = [
    { label: 'Apple', value: 'apple' },
    { label: 'Pear', value: 'pear' }
  ];

  const handleFinish = (values) => {
    console.log('提交成功：', values);
    alert('提交成功: ' + JSON.stringify(values));
  };

  const handleFailed = ({ errors }) => {
    console.log('提交失败：', errors);
  };

  const toggleDisabled = () => {
    isDisabled = !isDisabled;
  };

  return (
    <div style={{ padding: 24, width: 800 }}>
      
      <div style={{ marginBottom: 16, display: 'flex' }}>
        <Button onClick={toggleDisabled} type="primary">
          {isDisabled ? '启用表单' : '禁用表单'}
        </Button>
        
      </div>

      <Form
          model={formData}
          disabled={isDisabled}
          onFinish={handleFinish}
          onFinishFailed={handleFailed}
        >
          <FormItem name="radio" label="Radio" model={formData}>
            <Radio
              name='group'
              options={radioOptions.map(option => ({
                ...option,
                checked: formData.radio === option.value
              }))}
              onChange={(value) => setValueByPath(formData, 'radio', value)}
              disabled={isDisabled}
            />
          </FormItem>

          <FormItem name="input" label="Input" model={formData}>
            <Input
              placeholder="请输入内容"
              value={formData.input}
              onInput={(e) => setValueByPath(formData, 'input', e.target.value)}
              disabled={isDisabled}
            />
          </FormItem>

          <FormItem name="select" label="Select" model={formData}>
            <Select
              placeholder="请选择"
              options={selectOptions}
              value={formData.select}
              onChange={(value) => setValueByPath(formData, 'select', value)}
              disabled={isDisabled}
            />
          </FormItem>

          <FormItem name="textarea" label="TextArea" model={formData}>
            <Input
              type="textarea"
              placeholder="请输入多行文本"
              rows={3}
              value={formData.textarea}
              onInput={(e) => setValueByPath(formData, 'textarea', e.target.value)}
              disabled={isDisabled}
            />
          </FormItem>

          <FormItem name="switch" label="Switch" model={formData}>
            <Switch
              checked={formData.switch}
              onClick={() => {
                formData.switch = !formData.switch;
              }}
              onChange={(e) => setValueByPath(formData, 'switch', e.target.checked)}
              disabled={isDisabled}
            />
          </FormItem>

          <FormItem name="button" label="Button" model={formData}>
            <Button disabled={isDisabled}>Button</Button>
          </FormItem>

          <FormItem name="actions" label={null} model={formData}>
            <Button type="primary" htmlType="submit" disabled={isDisabled}>
              Submit
            </Button>
          </FormItem>
        </Form>
    </div>
  );
};

export default Demo4;

```

</details>
</div>
<!-- markdownlint-enable MD033 -->

<!-- markdownlint-disable MD033 -->
<div style="border: 1px solid #eaecef; border-radius: 4px; padding: 0 20px 20px; margin: 20px 0">
<iframe
  src="http://localhost:5173/#/form/demo5"
  style="width: 100%; height: 55px; border: 0;"
></iframe>
<h3>表单变体</h3>
<p>展示四种不同的表单变体：outlined（默认）、filled、borderless、underlined。</p>

<details class="demo-source">
  <summary style="padding-inline-start: 0;">查看示例代码</summary>

```jsx | pure
import {Button,Form, FormItem, getValueByPath, setValueByPath,,Input,Select,Checkbox,Radio,Switch} from 'inula-ui';

function Demo5() {
  let variant = 'outlined';
  // 创建表单数据模型
  let formData = {
    username: '',
    email: '',
    country: '',
    description: '',
    agree: false,
    gender: '',
    notifications: false
  };

  const selectOptions = [
    // { label: '中国', value: 'china' },
    // { label: '美国', value: 'usa' },
    // { label: '日本', value: 'japan' },
    // { label: '韩国', value: 'korea' },
  ];

  const handleFinish = (values) => {
    console.log('表单提交成功:', values);
    alert('表单提交成功！请查看控制台输出。');
  };

  const handleFailed = (errors) => {
    console.log('表单校验失败:', errors);
    alert('表单校验失败，请检查输入！');
  };

  return (
    <div style={{ padding: 24, maxWidth: 800 }}>
        <Form
          model={formData}
          variant={variant}
          onFinish={handleFinish}
          onFinishFailed={handleFailed}
        >
          <FormItem label="Form Layout" name="layout" style={{ display: 'flex' }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <Button type={variant === 'outlined' ? 'primary' : 'default'} onClick={() => { variant = 'outlined'; }}>outlined</Button>
              <Button type={variant === 'filled' ? 'primary' : 'default'} onClick={() => { variant = 'filled'; }}>filled</Button>
              <Button type={variant === 'borderless' ? 'primary' : 'default'} onClick={() => { variant = 'borderless'; }}>borderless</Button>
              <Button type={variant === 'underlined' ? 'primary' : 'default'} onClick={() => { variant = 'underlined'; }}>underlined</Button>
            </div>
          </FormItem>

          <FormItem name="username" label="Username" model={formData} required>
            <Input
              value={formData.username}
              onInput={(e) => setValueByPath(formData, 'username', e.target.value)}
            />
          </FormItem>

          <FormItem name="email" label="Email" model={formData} required>
            <Input
              type="email"
              value={formData.email}
              onInput={(e) => setValueByPath(formData, 'email', e.target.value)}
            />
          </FormItem>

          <FormItem name="country" label="Country" model={formData}>
            <Select
              options={selectOptions}
              value={formData.country}
              onChange={(value) => setValueByPath(formData, 'country', value)}
            />
          </FormItem>

          <FormItem name="description" label="Description" model={formData}>
            <Input
              type="textarea"
              rows={3}
              value={formData.description}
              onInput={(e) => setValueByPath(formData, 'description', e.target.value)}
            />
          </FormItem>

          <FormItem name="remember" label={null} model={formData}>
            <Button type="primary" htmlType="submit">submit</Button>
          </FormItem>
        </Form>
    </div>
  );
}

export default Demo5;

```

</details>
</div>
<!-- markdownlint-enable MD033 -->

<!-- markdownlint-disable MD033 -->
<div style="border: 1px solid #eaecef; border-radius: 4px; padding: 0 20px 20px; margin: 20px 0">
<iframe
  src="http://localhost:5173/#/form/demo7"
  style="width: 100%; height: 55px; border: 0;"
></iframe>
<h3>自定义必填标记</h3>
<p>展示自定义必填标记的功能，包括默认、可选、隐藏、自定义。</p>

<details class="demo-source">
  <summary style="padding-inline-start: 0;">查看示例代码</summary>

```jsx | pure
import {Button,Input,Tag,Form, FormItem, setValueByPath} from 'inula-ui';

const Demo7 = () => {
  let layout = 'vertical';
  let requiredMark = 'default'; // default | optional | hidden | customize

  let formModel = {
    fieldA: '',
    fieldB: ''
  };

  const rules = {
    fieldA: [{ required: true, message: 'Field A 为必填项' }],
    fieldB: []
  };
  

  const customizeRequiredMark = (label, { required }) => (
    <>
      {required ? <Tag color='red' style={{marginRight: '5px'}}>Required</Tag> : <Tag color='geekblue' style={{marginRight: '5px'}}>optional</Tag>}
      {label}
    </>
  );

  const onFinish = (values) => {
    console.log('提交成功: ', values);
  };

  const onFailed = ({ errors }) => {
    console.log('提交失败: ', errors);
  };

  return (
    <div style={{ padding: 24, width: 640 }}>
      <Form
        model={formModel}
        rules={rules}
        requiredMark={requiredMark}
        layout={layout}
        labelAlign="left"
        requiredMarkRender={requiredMark === 'customize' ? customizeRequiredMark : null}
        onFinish={onFinish}
        onFinishFailed={onFailed}
      >
        <FormItem label="Required Mark" name="requiredMark">
          <div style={{ display: 'flex', gap: 12 }}>
            <Button type={requiredMark === 'default' ? 'primary' : 'default'} onClick={() => { requiredMark = 'default'; }}>Default</Button>
            <Button type={requiredMark === 'optional' ? 'primary' : 'default'} onClick={() => { requiredMark = 'optional'; }}>Optional</Button>
            <Button type={requiredMark === 'hidden' ? 'primary' : 'default'} onClick={() => { requiredMark = 'hidden'; }}>Hidden</Button>
            <Button type={requiredMark === 'customize' ? 'primary' : 'default'} onClick={() => { requiredMark = 'customize'; }}>Customize</Button>
          </div>
        </FormItem>
        <FormItem name="fieldA" label="Field A" required model={formModel}>
          <Input
            placeholder="input placeholder"
            onInput={(e) => setValueByPath(formModel, 'fieldA', e.target.value)}
          />
        </FormItem>

        <FormItem name="fieldB" label="Field B" model={formModel}>
          <Input
            placeholder="input placeholder"
            onInput={(e) => setValueByPath(formModel, 'fieldB', e.target.value)}
          />
        </FormItem>

        <FormItem name="submit" label={null} model={formModel}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
    </div>
  );
};

export default Demo7;
```

</details>
</div>
<!-- markdownlint-enable MD033 -->

## API

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|---|---|---|---|---|
| type | 按钮类型 | `string` | `primary` / `default` / `dashed` / `text` / `link` | `default` |
| variant | 视觉变体 | `string` | `outlined` / `filled` / `borderless` / `underlined` | `outlined` |
| danger | 危险状态样式 | `boolean` | - | `false` |
| ghost | 幽灵样式（深色背景常用） | `boolean` | - | `false` |
| disabled | 禁用状态 | `boolean` | - | `false` |
| loading | 加载中状态（禁用且展示旋转图标） | `boolean` | - | `false` |
| htmlType | 原生按钮类型 | `string` | `button` / `submit` / `reset` | `button` |
| onClick | 点击回调 | `(e) => void` | - | - |
| children | 按钮内容 | `ReactNode` | - | - |

说明：其余属性会透传给原生 `button` 元素（如 `title`、`id`、`aria-*` 等）。
