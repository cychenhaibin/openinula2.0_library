import './index.css';

/**
 * Form 组件（openinula2.0）
 * - 使用响应式变量作为表单状态（例如：let form = { username: '' }）
 * - 简易校验：required、min、max、pattern、validator（同步）
 * - 布局：horizontal/vertical
 */

const getValueByPath = (obj, path) => {
  if (!obj || !path) return undefined;
  const segments = Array.isArray(path) ? path : String(path).split('.');
  let cur = obj;
  for (let i = 0; i < segments.length; i++) {
    if (cur == null) return undefined;
    cur = cur[segments[i]];
  }
  return cur;
};

const setValueByPath = (obj, path, value) => {
  const segments = Array.isArray(path) ? path : String(path).split('.');
  let cur = obj;
  for (let i = 0; i < segments.length - 1; i++) {
    const key = segments[i];
    if (cur[key] == null || typeof cur[key] !== 'object') cur[key] = {};
    cur = cur[key];
  }
  cur[segments[segments.length - 1]] = value;
};

const runRules = (value, model, rules = []) => {
  if (!Array.isArray(rules)) rules = [rules].filter(Boolean);
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i] || {};
    if (rule.required) {
      const empty = value === undefined || value === null || String(value).trim() === '';
      if (empty) return rule.message || '该字段为必填项';
    }
    if (rule.min != null) {
      if (typeof value === 'number') {
        if (value < rule.min) return rule.message || `不能小于 ${rule.min}`;
      } else if (String(value).length < rule.min) {
        return rule.message || `最少 ${rule.min} 个字符`;
      }
    }
    if (rule.max != null) {
      if (typeof value === 'number') {
        if (value > rule.max) return rule.message || `不能大于 ${rule.max}`;
      } else if (String(value).length > rule.max) {
        return rule.message || `最多 ${rule.max} 个字符`;
      }
    }
    if (rule.pattern && rule.pattern instanceof RegExp) {
      if (!rule.pattern.test(String(value || ''))) return rule.message || '格式不正确';
    }
    if (typeof rule.validator === 'function') {
      const res = rule.validator(value, model);
      if (res === false) return rule.message || '校验未通过';
      if (typeof res === 'string') return res;
      if (res && res.valid === false) return res.message || '校验未通过';
    }
  }
  return '';
};

const Form = ({
  model = {},
  rules = {},
  layout = 'horizontal', // horizontal | vertical
  labelAlign = 'right', // left | right
  colon = true,
  disabled = false,
  onFinish,
  onFinishFailed,
  className = '',
  style = {},
  children,
  ...rest
}) => {
  let submitting = false;

  const handleSubmit = (e) => {
    e && e.preventDefault && e.preventDefault();
    if (submitting) return;
    submitting = true;

    const errors = {};
    const values = model;

    const fieldNames = Object.keys(rules || {});
    for (let i = 0; i < fieldNames.length; i++) {
      const name = fieldNames[i];
      const fieldRules = rules[name];
      const value = getValueByPath(model, name);
      const msg = runRules(value, model, fieldRules);
      if (msg) errors[name] = msg;
    }

    const hasError = Object.keys(errors).length > 0;
    if (hasError) {
      onFinishFailed && onFinishFailed({ errors, values });
    } else {
      onFinish && onFinish(values);
    }
    submitting = false;
  };

  const formClassNames = [
    'inula-form',
    `inula-form-${layout}`,
    `inula-form-label-${labelAlign}`,
    disabled ? 'inula-form-disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <form className={formClassNames} style={style} onSubmit={handleSubmit} {...rest}>
      {children}
    </form>
  );
};

const FormItem = ({
  name,
  label,
  required = false,
  rules = [],
  model,
  validateOn = 'change', // change | blur | submit
  help,
  extra,
  className = '',
  style = {},
  children,
  colon = true,
  ...rest
}) => {
  let error = '';

  const fieldValue = getValueByPath(model, name);

  const triggerValidate = (val) => {
    const mergedRules = [
      required ? { required: true, message: '该字段为必填项' } : null,
      ...(Array.isArray(rules) ? rules : [rules])
    ].filter(Boolean);
    error = runRules(val, model, mergedRules);
  };

  const onInputCapture = (e) => {
    if (validateOn === 'change') {
      const val = e && e.target ? e.target.value : getValueByPath(model, name);
      triggerValidate(val);
    }
  };

  const onBlurCapture = (e) => {
    if (validateOn === 'blur') {
      const val = e && e.target ? e.target.value : getValueByPath(model, name);
      triggerValidate(val);
    }
  };

  // 初始 required 态（不显示红字，但显示 * 标识）
  const hasError = !!error;

  const itemClassNames = [
    'inula-form-item',
    hasError ? 'inula-form-item-has-error' : '',
    required ? 'inula-form-item-required' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={itemClassNames} style={style} onInput={onInputCapture} onBlur={onBlurCapture} {...rest}>
      {label !== null ? (
        <div className="inula-form-item-label">
          <label>
            {label}
            {colon ? '：' : ''}
          </label>
        </div>
      ) : (<div className="inula-form-item-label" style={{ height: 0 }}></div>)}
      <div className="inula-form-item-control">
        <div className="inula-form-item-control-input">
          {children}
        </div>
        {help ? (
          <div className="inula-form-item-extra">{help}</div>
        ) : null}
        {error ? (
          <div className="inula-form-item-explain">{error}</div>
        ) : null}
        {extra ? (
          <div className="inula-form-item-extra">{extra}</div>
        ) : null}
      </div>
    </div>
  );
};

export { Form, FormItem, getValueByPath, setValueByPath };
export default Form;


