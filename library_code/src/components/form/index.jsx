import "./index.css";
import { createContext, useContext, createElement } from "@openinula/next";

/* 表单上下文 */

/* 表单组件 */
const Form = ({
    colon = true, // 是否显示冒号
    disabled = false, // 是否禁用表单
    form, // 表单实例
    initialValues, // 表单初始值
    labelAlign, // 标签对齐方式
    labelWrap, // 标签换行方式
    labelCol,  // 标签列布局
    layout, // 表单布局方式
    name, // 表单名称
    onFinish, // 表单提交回调函数
    onFinishFailed, // 表单提交失败回调函数
    onValuesChange, // 表单值变化回调函数
    clearOnDestroy, // 表单销毁时是否清空表单值
}) => {
    return (
        <div>
            <h1>Form</h1>
            <p>这是一个表单组件</p>
        </div>
    )
}

/* 表单Item组件 */
const FormItem = ({
    colon = true, // 是否显示冒号
    initialValue, // 表单项初始值, 优先级小于Form
    label, // 表单项标签
    labelAlign, // 表单项标签对齐方式, 优先级小于Form
    labelCol, // 表单项标签列布局, 优先级大于Form
    name, // 表单项名称
    required, // 是否必填
    rules, // 表单项校验规则
}) => {
    return (
        <div>
            <h1>FormItem</h1>
            <p>这是一个表单组件</p>
        </div>
    )
}

export { Form, FormItem };