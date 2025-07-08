import "./index.css";

const Switch = ({
  defaultChecked = false,
  defaultValue = defaultChecked,
  disabled = false,
  loading = false,
  size = "default", // small, default, large
  checked,
  unCheckedChildren,
  checkedChildren,
  onChange,
  onClick,
  className,
  style,
  ...rest
}) => {
    let isChecked = checked !== undefined ? checked : defaultChecked;

  const classNames = (isChecked 
    ? [
        "inula-switch",
        "inula-switch-checked",
        size && `inula-switch-${size}`,
        disabled && "inula-switch-checked-disabled",
        loading && "inula-switch-loading",
        className,
      ]
    : [
        "inula-switch",
        size && `inula-switch-${size}`,
        disabled && "inula-switch-disabled",
        loading && "inula-switch-loading",
        className,
      ])
    .filter(Boolean)
    .join(" ");
    
    console.log("classNames", classNames)

  const handleOnClick = (e) => {
    if (disabled || loading || checked !== undefined) {
      return;
    }
    isChecked = !isChecked;
    onChange && onChange(isChecked);
    onClick && onClick(e);
  };

  const btnClassNames = [
    "inula-switch-btn",
    isChecked ? "inula-switch-btn-checked" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const styles = {
    ...style,
  };

  return (
    <div
      className={classNames}
      style={styles}
      onClick={handleOnClick}
      {...rest}
    >
      <div className={btnClassNames}>
        {isChecked ? checkedChildren : unCheckedChildren}
      </div>
    </div>
  );
};

export default Switch;
