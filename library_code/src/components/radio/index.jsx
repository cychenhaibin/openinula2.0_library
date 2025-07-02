// openInula 2.0 Radio 组件
import './index.css';
function Radio({ checked = false, disabled = false, value = '', name = '', label = '', onChange }) {
  let isChecked = checked;

  function handleChange(e) {
    if (disabled) return;
    isChecked = true;
    onChange && onChange(value, e);
  }

  return (
    <label className={`inula-radio-wrapper${disabled ? ' inula-radio-wrapper--disabled' : ''}`}>
      <span className={`inula-radio${isChecked ? ' inula-radio-checked' : ''}${disabled ? ' inula-radio-disabled' : ''}`}>
        <input
          type="radio"
          name={name}
          value={value}
          checked={isChecked}
          disabled={disabled}
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