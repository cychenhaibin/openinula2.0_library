import { didMount, watch } from "@openinula/next";
import "./index.css";
import Icon from "../icon";
import Button from "../button";
import {
  calculateRenderDateItems,
  calculateRenderYQMItems,
  calculateRenderWeekItems,
  getTodayDate,
  formatDate,
  formatDateToObject,
  formatDateToYearMonth,
} from "./utils";

const DatePicker = ({
  allowClear, //自定义清除按钮
  showNow = true, //是否展示“今天”按钮
  autoFocus = false, //自动获取焦点
  inputReadOnly = false, //设置输入框只读
  defaultOpen = false, //是否默认展开控制弹层
  disabled = false, //禁用
  disabledDate, //不可选择的日期
  format, //设置日期格式
  onChange, //时间变化回调
  onOk, //点击确定回调
  open, //控制弹层是否展开
  initialOpen = open !== undefined ? open : defaultOpen || false,
  defaultPickerValue, //默认面板日期，每次打开面板会被重置到该日期，格式为YYYY-MM-DD
  defaultValue, //默认值，与format对应，如果开始或结束时间为null或undefined，日期范围将是一个开区间
  order = true, //多选、范围事是否自动排序
  getPopupContainer, //自定义浮层的容器，默认为body上新建div
  minDate, //最小日期
  maxDate, //最大日期
  needConfirm, //是否需要确认按钮
  // panekRender, //自定义渲染面板
  picker = "date", //设置选择器类型, date | week | month | quarter | year
  placeholder, //输入框提示文字
  placement = "bottomLeft", //选择器弹出的位置bottomLeft | bottomRight | toLeft | toRight
  prefix, //自定义前缀
  prevIcon, //自定义上一个图标-月
  nextIcon, //自定义下一个图标-月
  suffixIcon, //自定义后缀
  superNextIcon, //自定义下一个图标-年
  superPrevIcon, //自定义上一个图标-年
  size = "middle", //input大小，large高40px,small24px,default32px
  variant = "outlined", // outlined | borderless | filled | underlined
  status, //设置校验状态
  onOpenChange,
  onPanleChange,
  onBlur,
  onFocus,
  className, //自定义类名
  style,
}) => {
  let selectValue;
  let confirmValue;
  let isOpen = initialOpen;
  let isClearIcon = false;
  let curYear;
  let curMonth;
  let hoverValue;
  let inputRef;

  watch(() => {
    if (defaultPickerValue || defaultValue) {
      const parsedYearMonth = formatDateToYearMonth(
        defaultPickerValue || defaultValue,
        "",
        picker
      );
      curYear = parsedYearMonth?.year || new Date().getFullYear();
      curMonth = parsedYearMonth?.month || new Date().getMonth() + 1;
      if (defaultValue) confirmValue = defaultValue;
    } else {
      curYear = new Date().getFullYear();
      curMonth = new Date().getMonth() + 1;
    }
  });

  watch(() => {
    if (open !== undefined) {
      isOpen = open;
    }
  });

  watch(() => {
    console.log(open, isOpen);
  });

  const initialPlaceholder = () => {
    if (placeholder) return placeholder;
    switch (picker) {
      case "date":
        return "请选择日期";
      case "week":
        return "请选择周";
      case "month":
        return "请选择月份";
      case "quarter":
        return "请选择季度";
      case "year":
        return "请选择年份";
      default:
        return "请选择日期";
    }
  };

  //选择某个日期
  const handleSelect = (type, item) => {
    switch (type) {
      case "date": {
        selectValue = `${item.year}-${item.month}-${item.day}`;
        break;
      }
      case "week": {
        selectValue = `${item.year}-${item.week}周`;
        break;
      }
      case "month": {
        selectValue = `${item.year}-${item.month}`;
        break;
      }
      case "quarter": {
        selectValue = `${item.year}-Q${item.quarter}`;
        break;
      }
      case "year": {
        selectValue = `${item.year}`;
        break;
      }
      default: {
        handleChangeOpen("close");
        break;
      }
    }
    if (!needConfirm) {
      hoverValue = "";
      confirmValue = formatDate(selectValue, defaultValue, format, picker);
      if (onChange) onChange(selectValue);
      if (!defaultPickerValue) {
        if (item.year !== curYear || (item.month && item.month !== curMonth)) {
          if (onPanleChange) onPanleChange({ curYear, curMonth }, picker);
        }
        if (item.year && item.year !== curYear) curYear = item.year;
        if (item.month && type !== "month" && item.month !== curMonth)
          curMonth = item.month;
      } else {
        if (onPanleChange) onPanleChange(selectValue, picker);
        curYear = formatDateToYearMonth(defaultPickerValue, "", picker)?.year;
        curMonth = formatDateToYearMonth(defaultPickerValue, "", picker)?.month;
      }
      handleChangeOpen("close");
    }
    // else {
    //   console.log(selectValue);
    //   if (item.year && item.year !== curYear) curYear = item.year;
    //   if (item.month && type !== "month" && item.month !== curMonth)
    //     curMonth = item.month;
    // }
  };

  const mouseEnterItem = (type, item) => {
    let tempValue;
    switch (type) {
      case "date": {
        tempValue = `${item.year}-${item.month}-${item.day}`;
        break;
      }
      case "week": {
        tempValue = `${item.year}-${item.week}周`;
        break;
      }
      case "month": {
        tempValue = `${item.year}-${item.month}`;
        break;
      }
      case "quarter": {
        tempValue = `${item.year}-Q${item.quarter}`;
        break;
      }
      case "year": {
        tempValue = `${item.year}`;
        break;
      }
      default: {
        handleChangeOpen("close");
        break;
      }
    }
    hoverValue = formatDate(tempValue, defaultValue, format, picker);
  };

  const mouseLeaveItem = () => {
    hoverValue = "";
  };

  const handleConfirm = () => {
    hoverValue = "";
    confirmValue = formatDate(selectValue, defaultValue, format, picker);
    if (onChange) onChange(selectValue);
    handleChangeOpen("close");
  };

  //targer: year | month， action: add minus
  const handleChangeTitle = (target, action, type = "date") => {
    if (onPanleChange) onPanleChange({ curYear, curMonth }, picker);
    if (target === "year") {
      if (type === "year")
        curYear = action === "add" ? curYear + 10 : curYear - 10;
      else curYear = action === "add" ? curYear + 1 : curYear - 1;
    } else {
      if (action === "add") {
        if (curMonth === 12) {
          curMonth = 1;
          curYear += 1;
        } else curMonth += 1;
      } else {
        if (curMonth === 1) {
          curMonth = 12;
          curYear -= 1;
        } else curMonth -= 1;
      }
    }
  };

  const handleClear = () => {
    if (isClearIcon) {
      selectValue = undefined;
      confirmValue = "";
      isClearIcon = false;
    }
  };

  const handleOnBlur = () => {
    if (onBlur) {
      onBlur();
    }
    if (defaultPickerValue) {
      curYear = formatDateToYearMonth(defaultPickerValue, "", picker)?.year;
      curMonth = formatDateToYearMonth(defaultPickerValue, "", picker)?.month;
    }
    if (needConfirm && !confirmValue) {
      selectValue = undefined;
    }
    handleChangeOpen("close");
  };

  const handleOnFocus = () => {
    if (onFocus) onFocus();
    handleChangeOpen("open");
  };

  const handleChangeOpen = (action) => {
    if (action === "open") {
      if (onOpenChange && isOpen === false) onOpenChange(isOpen);
      else isOpen = true;
    } else if (action === "close") {
      if (onOpenChange && isOpen === true) onOpenChange(isOpen);
      else isOpen = false;
    }
  };

  const inputContainerClassNames = [
    "inula-datepicker-input-container",
    size === "large" && "inula-datepicker-input-container-large",
    size === "small" && "inula-datepicker-input-container-small",
    disabled && "inula-datepicker-input-container-disabled",
    variant === "filled" && "inula-datepicker-input-container-filled",
    variant === "outlined" && "inula-datepicker-input-container-outlined",
    variant === "borderless" && "inula-datepicker-input-container-borderless",
    variant === "underline" && "inula-datepicker-input-container-underline",
    status === "error" && "inula-datepicker-input-container-error",
    status === "warning" && "inula-datepicker-input-container-warning",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inputClassNames = [
    "inula-datepicker-input",
    size === "large" && "inula-datepicker-input-large",
    size === "small" && "inula-datepicker-input-small",
    hoverValue && "inula-datepicker-input-hover-value",
  ]
    .filter(Boolean)
    .join(" ");

  const inputIconClassNames = [
    "inula-datepicker-input-icon",
    disabled && "icon-disabled",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="inula-datepicker">
      <div
        className={inputContainerClassNames}
        style={style}
        onClick={() => {
          handleChangeOpen("open");
          if (inputRef) inputRef.focus();
        }}
      >
        <if cond={prefix}>
          <div className={inputIconClassNames}>{prefix}</div>
        </if>
        <input
          className={inputClassNames}
          ref={inputRef}
          disabled={disabled}
          {...(inputReadOnly && { readOnly: true })}
          autoFocus={autoFocus}
          type="text"
          prefix={prefix}
          placeholder={initialPlaceholder()}
          value={
            hoverValue ||
            (confirmValue == undefined ? defaultValue || "" : confirmValue)
          }
          onBlur={() => handleOnBlur()}
          onFocus={() => handleOnFocus()}
        ></input>
        <div
          className={inputIconClassNames}
          onMouseEnter={() => {
            if (confirmValue) isClearIcon = true;
          }}
          onMouseLeave={() => (isClearIcon = false)}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handleClear()}
        >
          <if cond={!isClearIcon}>
            {suffixIcon ? (
              suffixIcon
            ) : (
              <Icon
                value="calendar"
                theme="filled"
                size={14}
                color="rgba(0,0,0,0.25)"
              />
            )}
          </if>
          <else>
            {allowClear ? (
              allowClear
            ) : (
              <div className="clear">
                <Icon value="xmark" theme="filled" size={8} color="#fff" />
              </div>
            )}
          </else>
        </div>
      </div>

      <Calendar
        type={picker}
        size={size}
        curYear={curYear}
        curMonth={curMonth}
        isOpen={open !== undefined ? open : isOpen}
        placement={placement}
        selectValue={selectValue}
        defaultValue={defaultValue}
        disabledDate={disabledDate}
        minDate={minDate}
        maxDate={maxDate}
        needConfirm={needConfirm}
        showNow={showNow}
        prevIcon={prevIcon}
        nextIcon={nextIcon}
        superPrevIcon={superPrevIcon}
        superNextIcon={superNextIcon}
        onSelect={handleSelect}
        handleChangeTitle={handleChangeTitle}
        handleConfirm={handleConfirm}
        mouseEnterItem={mouseEnterItem}
        mouseLeaveItem={mouseLeaveItem}
        onOk={onOk}
      />
    </div>
  );
};

const Calendar = ({
  type = "date",
  size = "default",
  curYear = new Date().getFullYear(),
  curMonth = new Date().getMonth() + 1,
  isOpen = false,
  placement,
  selectValue,
  defaultValue,
  disabledDate,
  minDate,
  maxDate,
  needConfirm,
  showNow = true,
  prevIcon,
  nextIcon,
  superPrevIcon,
  superNextIcon,
  onSelect,
  handleChangeTitle,
  handleConfirm,
  mouseEnterItem,
  mouseLeaveItem,
  onOk,
}) => {
  const today = `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;

  const calendarClassNames = [
    "inula-calendar",
    !isOpen && "closed",
    placement === "bottomLeft" && "position-bottom-left",
    placement === "bottomRight" && "position-bottom-right",
    placement === "topLeft" && "position-top-left",
    placement === "topRight" && "position-top-right",
    size === "small" && "position-small",
    size === "large" && "position-large",
    type === "date" && showNow && !needConfirm && "no-footer",
  ]
    .filter(Boolean)
    .join(" ");

  //通过minDate、maxDate、disabledDate判断元素是否为禁用
  const isDisabled = (item) => {
    if (!minDate && !maxDate && !disabledDate) return false;
    const miniDate = formatDateToObject(minDate, "", type);
    const maxiDate = formatDateToObject(maxDate, "", type);
    const disabledDates = disabledDate
      ? disabledDate.map((date) => formatDateToObject(date, "", type))
      : null;
    switch (type) {
      case "date": {
        if (miniDate) {
          if (item.year < miniDate.year) return true;
          else if (item.year === miniDate.year && item.month < miniDate.month)
            return true;
          else if (
            item.year === miniDate.year &&
            item.month === miniDate.month &&
            item.day <= miniDate.day
          )
            return true;
        }

        if (maxiDate) {
          if (item.year > maxiDate.year) return true;
          else if (item.year === maxiDate.year && item.month > maxiDate.month)
            return true;
          else if (
            item.year === maxiDate.year &&
            item.month === maxiDate.month &&
            item.day >= maxiDate.day
          )
            return true;
        }

        if (disabledDates)
          for (const date of disabledDates)
            if (
              date.year === item.year &&
              date.month === item.month &&
              date.day === item.day
            )
              return true;
        break;
      }

      case "week": {
        if (miniDate) {
          if (item.year < miniDate.year) return true;
          else if (item.year === miniDate.year && item.week <= miniDate.week)
            return true;
        }

        if (maxiDate) {
          if (item.year > maxiDate.year) return true;
          else if (item.year === maxiDate.year && item.week >= maxiDate.week)
            return true;
        }

        if (disabledDates)
          for (const date of disabledDates)
            if (date.year === item.year && date.week === item.week) return true;
        break;
      }

      case "month": {
        if (miniDate) {
          if (item.year < miniDate.year) return true;
          else if (item.year === miniDate.year && item.month <= miniDate.month)
            return true;
        }

        if (maxiDate) {
          if (item.year > maxiDate.year) return true;
          else if (item.year === maxiDate.year && item.month >= maxiDate.month)
            return true;
        }

        if (disabledDates)
          for (const date of disabledDates)
            if (date.year === item.year && date.month === item.month)
              return true;
        break;
      }

      case "quarter": {
        if (miniDate) {
          if (item.year < miniDate.year) return true;
          else if (
            item.year === miniDate.year &&
            item.quarter <= miniDate.quarter
          )
            return true;
        }

        if (maxiDate) {
          if (item.year > maxiDate.year) return true;
          else if (
            item.year === maxiDate.year &&
            item.quarter >= maxiDate.quarter
          )
            return true;
        }

        if (disabledDates)
          for (const date of disabledDates)
            if (date.year === item.year && date.quarter === item.quarter)
              return true;
        break;
      }

      case "year": {
        if (miniDate && item.year <= miniDate.year) return true;
        if (maxiDate && item.year >= maxiDate.year) return true;

        if (disabledDates)
          for (const date of disabledDates)
            if (date.year === item.year) return true;
        break;
      }
    }

    return false;
  };

  //通过minDate、maxDate判断是否翻页
  // const isDisabledChangeTitle = (target, action) => {
  //   const miniDate = formatDateToObject(minDate, "", type);
  //   const maxiDate = formatDateToObject(maxDate, "", type);
  //   if (action === "minus") {
  //     if (!miniDate) return false;
  //     if (target === "year") {
  //       if (type !== "year")
  //         if (miniDate.year >= curYear) return true;
  //         else return miniDate.year >= Math.floor(curYear / 10) * 10 - 1;
  //     } else {
  //       //日期和周选择器是一样的，年月季度不会有翻月的情况
  //       if (miniDate.year > curYear) return true;
  //       if (miniDate.year === curYear && miniDate.month >= curMonth)
  //         return true;
  //     }
  //   } else {
  //     if (!maxiDate) return false;
  //     if (target === "year") {
  //       if (type === "year")
  //         if (maxiDate.year <= curYear) return true;
  //         else return maxiDate.year <= Math.floor(curYear / 10) * 10 + 10;
  //     } else {
  //       if (maxiDate.year < curYear) return true;
  //       if (maxiDate.year === curYear && maxiDate.month <= curMonth)
  //         return true;
  //     }
  //   }
  // };

  const getGridColumns = () => {
    switch (type) {
      case "date":
        return 7;
      case "week":
        return 1;
      case "month":
        return 3;
      case "quarter":
        return 4;
      case "year":
        return 3;
      default:
        return 7;
    }
  };

  const handleClick = (e, type, item) => {
    e.stopPropagation();
    if (!isDisabled(item) && onSelect) {
      onSelect(type, item);
    }
  };

  const handleMounseEnter = (type, item) => {
    if (!isDisabled(item)) {
      mouseEnterItem(type, item);
    }
  };

  const handleMounseLeave = (item) => {
    if (!isDisabled(item)) {
      mouseLeaveItem();
    }
  };

  //日历头部
  const CalendarHeader = () => {
    return (
      <div className="inula-calendar-header">
        <div className="inula-calendar-header-left">
          {superPrevIcon ? (
            <div
              className="flex-middle-box"
              onClick={() => handleChangeTitle("year", "minus", type)}
            >
              {superPrevIcon}
            </div>
          ) : (
            <Icon
              value="angles-left"
              theme="filled"
              size={14}
              color="rgba(0,0,0,0.45)"
              onClick={() => handleChangeTitle("year", "minus", type)}
            />
          )}
          {(type === "date" || type === "week") &&
            (prevIcon ? (
              <div
                className="flex-middle-box"
                onClick={() => handleChangeTitle("month", "minus")}
              >
                {prevIcon}
              </div>
            ) : (
              <Icon
                value="chevron-left"
                theme="filled"
                size={14}
                color="rgba(0,0,0,0.45)"
                onClick={() => handleChangeTitle("month", "minus")}
              />
            ))}
        </div>

        <div className="inula-calendar-header-title">
          <if cond={type === "date" || type === "week"}>
            {`${curYear}年   ${curMonth}月`}
          </if>
          <else-if cond={type === "month" || type === "quarter"}>
            {`${curYear}年`}
          </else-if>
          <else>{`${Math.floor(curYear / 10) * 10}年-${
            Math.floor(curYear / 10) * 10 + 9
          }年`}</else>
        </div>

        <div className="inula-calendar-header-right">
          {(type === "date" || type === "week") &&
            (nextIcon ? (
              <div
                className="flex-middle-box"
                onClick={() => handleChangeTitle("month", "add")}
              >
                {nextIcon}
              </div>
            ) : (
              <Icon
                value="chevron-right"
                theme="filled"
                size={14}
                color="rgba(0,0,0,0.45)"
                onClick={() => handleChangeTitle("month", "add")}
              />
            ))}
          {superNextIcon ? (
            <div
              className="flex-middle-box"
              onClick={() => handleChangeTitle("year", "add", type)}
            >
              {superNextIcon}
            </div>
          ) : (
            <Icon
              value="angles-right"
              theme="filled"
              size={14}
              color="rgba(0,0,0,0.45)"
              onClick={() => handleChangeTitle("year", "add", type)}
            />
          )}
        </div>
      </div>
    );
  };

  //日历内容
  const CalendarContent = () => {
    return (
      <div
        className="inula-calendar-content"
        style={{ "--grid-columns": getGridColumns() }}
      >
        <if cond={type === "date"}>
          <for each={["一", "二", "三", "四", "五", "六", "日"]}>
            {(item) => (
              <div key={item} className="inula-calendar-content-weekday">
                {item}
              </div>
            )}
          </for>
          <for each={calculateRenderDateItems(curYear, curMonth)}>
            {(item, index) => (
              <CalendarContentItem
                key={`${item}-${index}`}
                type={type}
                item={item}
                selectValue={selectValue}
                defaultValue={defaultValue}
                disabled={isDisabled(item)}
                onClick={handleClick}
                onMouseEnter={handleMounseEnter}
                onMouseLeave={handleMounseLeave}
              />
            )}
          </for>
        </if>
        <else-if cond={type === "week"}>
          <div className="inula-calendar-content-week-row-header">
            <for each={[" ", "一", "二", "三", "四", "五", "六", "日"]}>
              {(item) => (
                <div key={item} className="inula-calendar-content-weekday">
                  {item}
                </div>
              )}
            </for>
          </div>
          <for each={calculateRenderWeekItems(curYear, curMonth)}>
            {(row, index) => (
              <div
                className={[
                  "inula-calendar-content-week-row",
                  selectValue === `${row[0].year}-${row[0].week}周` &&
                    "inula-calendar-content-week-row-selected",
                  !selectValue &&
                    defaultValue ===
                      formatDate(
                        `${row[0].year}-${row[0].week}周`,
                        defaultValue,
                        "",
                        "week"
                      ) &&
                    "inula-calendar-content-week-row-selected",
                  isDisabled(row[0]) &&
                    "inula-calendar-content-week-row-disabled",
                ]
                  .filter(Boolean)
                  .join(" ")}
                key={index}
                onClick={() =>
                  !isDisabled(row[0]) && onSelect && onSelect("week", row[0])
                }
                onMouseEnter={() =>
                  !isDisabled(row[0]) && mouseEnterItem("week", row[0])
                }
                onMouseLeave={() => !isDisabled(row[0]) && mouseLeaveItem()}
              >
                <for each={row}>
                  {(item, index) => (
                    <CalendarContentItem
                      key={`${item}-${index}`}
                      type={type}
                      item={item}
                      disabled={isDisabled(item)}
                      onClick={handleClick}
                      className="week-container"
                    />
                  )}
                </for>
              </div>
            )}
          </for>
        </else-if>
        <else-if cond={type === "month"}>
          <for each={calculateRenderYQMItems("month", curYear)}>
            {(item, index) => (
              <CalendarContentItem
                key={`${item}-${index}`}
                type={type}
                item={item}
                selectValue={selectValue}
                defaultValue={defaultValue}
                disabled={isDisabled(item)}
                onClick={handleClick}
                onMouseEnter={handleMounseEnter}
                onMouseLeave={handleMounseLeave}
                className="month-container"
              />
            )}
          </for>
        </else-if>
        <else-if cond={type === "quarter"}>
          <for each={calculateRenderYQMItems("quarter", curYear)}>
            {(item, index) => (
              <CalendarContentItem
                key={`${item}-${index}`}
                type={type}
                item={item}
                selectValue={selectValue}
                defaultValue={defaultValue}
                disabled={isDisabled(item)}
                onClick={handleClick}
                onMouseEnter={handleMounseEnter}
                onMouseLeave={handleMounseLeave}
                className="quarter-container"
              />
            )}
          </for>
        </else-if>
        <else>
          <for each={calculateRenderYQMItems("year", curYear)}>
            {(item, index) => (
              <CalendarContentItem
                key={`${item}-${index}`}
                type={type}
                item={item}
                selectValue={selectValue}
                defaultValue={defaultValue}
                disabled={isDisabled(item)}
                onClick={handleClick}
                onMouseEnter={handleMounseEnter}
                onMouseLeave={handleMounseLeave}
                className="year-container"
              />
            )}
          </for>
        </else>
      </div>
    );
  };

  //日历底部
  const CalendarFooter = () => {
    const justifyContent = () => {
      if (type === "date" && !showNow && needConfirm) return "flex-end";
      if (type === "date" && needConfirm) return "space-between";
      if (type === "date" && !needConfirm) return "center";
      if (type !== "date" && needConfirm) return "flex-end";
      return "center";
    };

    return (
      <div
        className="inula-calendar-footer"
        style={{ justifyContent: justifyContent() }}
      >
        <if cond={type === "date" && showNow}>
          <div
            className="inula-calendar-footer-today"
            onClick={() => onSelect && onSelect("date", getTodayDate())}
          >
            今天
          </div>
        </if>
        <if cond={needConfirm}>
          <Button
            disabled={selectValue == undefined}
            className="inula-calendar-footer-confirm"
            onClick={() => {
              if (onOk) onOk(selectValue);
              handleConfirm();
            }}
          >
            确定
          </Button>
        </if>
      </div>
    );
  };

  return (
    <div className={calendarClassNames} onMouseDown={(e) => e.preventDefault()}>
      <CalendarHeader />
      <CalendarContent />
      {((type === "date" && showNow) || needConfirm) && <CalendarFooter />}
    </div>
  );
};

const CalendarContentItem = ({
  type = "date", //日历类型
  item, //item日期信息{year, quarter, month, week, day, isThisTitleRange}
  selectValue, //选择的日期
  defaultValue, //默认日期
  disabled, //是否禁用
  onClick,
  onMouseEnter,
  onMouseLeave,
  className,
}) => {
  const today = `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;

  const isTody =
    (type === "date" || "week") &&
    today === `${item.year}-${item.month}-${item.day}`;

  const isSelected = (item) => {
    if (selectValue) {
      return selectValue === defaultString(item) && item.isThisTitleRange;
    }
    return false;
  };

  const defaultString = (item) => {
    switch (type) {
      case "date":
        return `${item.year}-${item.month}-${item.day}`;

      case "week":
        return `${item.year}-${item.week}周`;

      case "month":
        return `${item.year}-${item.month}`;

      case "quarter":
        return `${item.year}-Q${item.quarter}`;

      case "year":
        return `${item.year}`;
    }
  };

  const itemContainerClassNames = [
    "item-container",
    disabled && "item-container-disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const itemClassNames = [
    "inula-calendar-content-date-item",
    !item.isThisTitleRange &&
      "inula-calendar-content-date-item-notThisTitleRange",
    isTody && "inula-calendar-content-date-item-today",
    type !== "week" &&
      isSelected(item) &&
      "inula-calendar-content-date-item-selected",
    type !== "week" &&
      !selectValue &&
      defaultValue ===
        formatDate(defaultString(item), defaultValue, "", type) &&
      item.isThisTitleRange &&
      "inula-calendar-content-date-item-selected",
    disabled && "inula-calendar-content-date-item-disabled",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={itemContainerClassNames}
      onMouseEnter={() => onMouseEnter && onMouseEnter("date", item)}
      onMouseLeave={() => onMouseLeave && onMouseLeave(item)}
    >
      <div className={itemClassNames} onClick={(e) => onClick(e, type, item)}>
        <if cond={type === "date"}>{item.day}</if>
        <else-if cond={type === "week"}>{item.day || item.week}</else-if>
        <else-if cond={type === "month"}>{`${item.month}月`}</else-if>
        <else-if cond={type === "quarter"}>{`Q${item.quarter}`}</else-if>
        <else>{item.year}</else>
      </div>
    </div>
  );
};

export default DatePicker;
