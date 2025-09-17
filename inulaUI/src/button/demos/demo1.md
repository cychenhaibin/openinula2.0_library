<!-- markdownlint-disable MD033 -->

<div style="border: 1px solid #eaecef; border-radius: 4px; padding: 0 20px 20px;">
<iframe
  src="http://localhost:5174/#/button/demo1"
  style="width: 100%; height: 55px; border: 0;"
></iframe>
<h3>基本</h3>
<p>展示按钮的五种类型：主按钮、默认按钮、虚线按钮、文本按钮、链接按钮、变体样式。</p>

<details class="demo-source">
  <summary style="padding-inline-start: 0;">查看源码</summary>

```jsx | pure
import {Button} from 'inula-ui';

export default function ButtonDemo() {
    let loading = false;
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <Button type="primary">主按钮</Button>
            <Button>默认按钮</Button>
            <Button type="dashed">虚线按钮</Button>
            <Button type="text">文本按钮</Button>
            <Button type="link">链接按钮</Button>
            <Button variant="outlined">outlined</Button>
            <Button variant="filled">filled</Button>
            <Button variant="borderless">borderless</Button>
            <Button variant="underlined">underlined</Button>
        </div>
    );
}

```

</details>
</div>
<!-- markdownlint-enable MD033 -->