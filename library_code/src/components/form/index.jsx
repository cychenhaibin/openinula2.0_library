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

// 每个表单模型对应的字段校验注册表（model -> Map<name, triggerValidate>）
const fieldValidatorsRegistry = new WeakMap();

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
  ref,
  ...rest
}) => {
  let submitting = false;
  let formRef = ref;

  // 表单方法
  const validate = (fieldNames) => {
    const errors = {};
    const values = model;
    
    const fieldsToValidate = fieldNames || Object.keys(rules || {});
    for (let i = 0; i < fieldsToValidate.length; i++) {
      const name = fieldsToValidate[i];
      const fieldRules = rules[name];
      if (fieldRules) {
        const value = getValueByPath(model, name);
        const msg = runRules(value, model, fieldRules);
        if (msg) errors[name] = msg;
      }
    }
    
    return {
      valid: Object.keys(errors).length === 0,
      errors,
      values
    };
  };

  const validateField = (fieldName) => {
    const fieldRules = rules[fieldName];
    if (!fieldRules) return { valid: true, error: '', value: getValueByPath(model, fieldName) };
    
    const value = getValueByPath(model, fieldName);
    const error = runRules(value, model, fieldRules);
    
    return {
      valid: !error,
      error,
      value
    };
  };

  const resetFields = (fieldNames) => {
    const fieldsToReset = fieldNames || Object.keys(model);
    for (let i = 0; i < fieldsToReset.length; i++) {
      const name = fieldsToReset[i];
      setValueByPath(model, name, '');
    }
  };

  const setFieldsValue = (values) => {
    Object.keys(values).forEach(name => {
      setValueByPath(model, name, values[name]);
    });
  };

  const getFieldsValue = (fieldNames) => {
    if (!fieldNames) return model;
    
    const result = {};
    fieldNames.forEach(name => {
      result[name] = getValueByPath(model, name);
    });
    return result;
  };

  const clearValidate = (fieldNames) => {
    // 清除校验状态，这里可以通过触发重新渲染来实现
    // 在 openinula2.0 中，直接修改响应式变量即可
    if (fieldNames) {
      fieldNames.forEach(name => {
        // 可以在这里添加清除校验状态的逻辑
      });
    }
  };

  const handleSubmit = (e) => {
    e && e.preventDefault && e.preventDefault();
    if (submitting) return;
    submitting = true;

    const result = validate();
    if (result.valid) {
      onFinish && onFinish(result.values);
    } else {
      onFinishFailed && onFinishFailed({ errors: result.errors, values: result.values });
    }
    // 提交后触发当前表单内各字段的校验以更新错误提示
    try {
      const registry = fieldValidatorsRegistry.get(model);
      if (registry) {
        registry.forEach((fn, fieldName) => {
          const currentVal = getValueByPath(model, fieldName);
          if (typeof fn === 'function') fn(currentVal);
        });
      }
    } catch (err) {}
    submitting = false;
  };

  const formClassNames = [
    'inula-form',
    `inula-form-${layout}`,
    `inula-form-label-${labelAlign}`,
    disabled ? 'inula-form-disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  // 暴露表单方法给 ref
  if (formRef) {
    formRef.current = {
      validate,
      validateField,
      resetFields,
      setFieldsValue,
      getFieldsValue,
      clearValidate,
      submit: handleSubmit
    };
  }

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

  // 注册字段的提交时触发校验函数（按当前表单 model 作用域）
  if (name && model) {
    let registry = fieldValidatorsRegistry.get(model);
    if (!registry) {
      registry = new Map();
      fieldValidatorsRegistry.set(model, registry);
    }
    registry.set(name, (val) => triggerValidate(val));
  }

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