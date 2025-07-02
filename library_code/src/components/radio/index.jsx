// openInula 2.0 Radio 组件
import './index.css';


const sizeMap = {
  large: 'inula-radio-large',
  small: 'inula-radio-small',
  default: '',
};

function Radio({
  checked = false,
  disabled = false,
  readOnly = false,
  value = '',
  name = '',
  label = '',
  onChange,
  size = 'default',
  options,
  style = {},
  className = '',
}) {
  // 如果有 options，渲染为 RadioGroup
  if (Array.isArray(options)) {
    return (
      <div className={`inula-radio-group ${className}`} style={style} horizontal>
        {options.map(opt => (
          <Radio
            key={opt.value}
            value={opt.value}
            label={opt.label}
            checked={opt.checked}
            disabled={opt.disabled}
            readOnly={opt.readOnly}
            name={name}
            size={size}
            onChange={onChange}
          />
        ))}
      </div>
    );
  }

  function handleChange(e) {
    if (disabled || readOnly) return;
    onChange && onChange(value, e);
  }

  return (
    <label
      className={`inula-radio-wrapper ${sizeMap[size] || ''}${disabled ? ' inula-radio-wrapper--disabled' : ''}${readOnly ? ' inula-radio-wrapper--readonly' : ''} ${className}`.trim()}
      style={style}
    >
      <span className={`inula-radio${checked ? ' inula-radio-checked' : ''}${disabled ? ' inula-radio-disabled' : ''}${readOnly ? ' inula-radio-readonly' : ''}`.trim()}>
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          readOnly={readOnly}
          onChange={handleChange}
          className="inula-radio-input"
        />
        <span className="inula-radio-inner" />
      </span>
      <span className="inula-radio-label">{label}</span>
    </label>
  );
}

export default Radio;