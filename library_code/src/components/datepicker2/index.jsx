import { didMount, watch } from "@openinula/next";
import "./index.css";
import Icon from "../icon";
import Button from "../button";
import {
  calculateDaysInYearMonth,
  calculateFirstWeekDayInYearMonth,
  calculateCurWeek,
  calculateRenderDateItems,
  calculateRenderYQMItems,
  calculateRenderWeekItems,
  getTodayDate,
} from "./utils";

const DatePicker = ({
  allowClear, //自定义清除按钮
  autoFocus = false, //自动获取焦点
  cellRender, //自定义单元格内容
  components, //自定义面板
  defaultOpen, //是否默认展开控制弹层
  disabled = false, //禁用
  disabledDate, //不可选择的日期
  format, //设置日期格式
  order = true, //多选、范围事是否自动排序
  preserveInvalidOnBlur = false, //失去焦点是否要清空输入框内无效内容
  getPopupContainer, //自定义浮层的容器，默认为body上新建div
  inputReadOnly = false, //设置输入框只读
  minDate, //最小日期
  maxDate, //最大日期
  needConfirm, //是否需要确认按钮
  open, //控制弹层是否展开
  // panekRender, //自定义渲染面板
  picker = "date", //设置选择器类型, date | week | month | quarter | year
  placeholder, //输入框提示文字
  placement, //选择器弹出的位置bottomLeft | bottomRight | toLeft | toRight
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
  className, //自定义类名
  style,
}) => {
  let selectValue;
  let confirmValue;
  let isOpen = false;
  let isClearIcon = false;
  let curYear = new Date().getFullYear();
  let curMonth = new Date().getMonth() + 1;
  let curDay = new Date().getDate();

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
    console.log(type, item);
    switch (type) {
      case "date": {
        selectValue = `${item.year}-${item.month}-${item.day}`;
        if (item.year !== curYear) curYear = item.year;
        if (item.month !== curMonth) curMonth = item.month;
        break;
      }
      case "week": {
        selectValue = `${curYear}-${item.week}周`;
        if (item.year !== curYear) curYear = item.year;
        if (item.month !== curMonth) curMonth = item.month;
        break;
      }
      case "month": {
        selectValue = `${curYear}-${item.month}`;
        break;
      }
      case "quarter": {
        selectValue = `${curYear}-Q${item.quarter}`;
        break;
      }
      case "year": {
        selectValue = `${item.year}`;
        if (item.year !== curYear) curYear = item.year;
        break;
      }
      default: {
        isOpen = false;
        break;
      }
    }
    if (!needConfirm) {
      confirmValue = selectValue;
      isOpen = false;
    }
  };

  const handleConfirm = () => {
    confirmValue = selectValue;
    isOpen = false;
  };

  //targer: year | month， action: add minus
  const handleChangeTitle = (target, action) => {
    if (target === "year") {
      curYear = action === "add" ? curYear + 1 : curYear - 1;
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
      isClearIcon = false;
    }
  };

  const inputClassNames = [
    "inula-datepicker-input",
    size === "large" && "inula-datepicker-input-large",
    size === "small" && "inula-datepicker-input-small",
    disabled && "inula-datepicker-input-disabled",
    variant === "filled" && "inula-datepicker-input-filled",
    variant === "outlined" && "inula-datepicker-input-outlined",
    variant === "borderless" && "inula-datepicker-input-borderless",
    variant === "underline" && "inula-datepicker-input-underline",
    status === "error" && "inula-datepicker-input-error",
    status === "warning" && "inula-datepicker-input-warning",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="inula-datepicker">
      <div className="inula-datapikcer-input-container">
        <input
          className={inputClassNames}
          disabled={disabled}
          type="text"
          placeholder={initialPlaceholder()}
          value={confirmValue == undefined ? "" : confirmValue}
          onClick={() => (isOpen = true)}
          onBlur={() => (isOpen = false)}
        ></input>
        <div
          className={[
            "inula-datepicker-input-icon",
            disabled && "icon-disabled",
          ]
            .filter(Boolean)
            .join(" ")}
          onMouseEnter={() => confirmValue && (isClearIcon = true)}
          onMouseLeave={() => (isClearIcon = false)}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handleClear()}
        >
          <if cond={!isClearIcon}>
            <Icon
              value="calendar"
              theme="filled"
              size={14}
              color="rgba(0,0,0,0.25)"
            />
          </if>
          <else>
            <div className="clear">
              <Icon value="xmark" theme="filled" size={8} color="#fff" />
            </div>
          </else>
        </div>
      </div>

      <Calendar
        type={picker}
        handleChangeTitle={handleChangeTitle}
        curYear={curYear}
        curMonth={curMonth}
        curDay={curDay}
        selectValue={selectValue}
        onSelect={handleSelect}
        isOpen={isOpen}
        needConfirm={needConfirm}
        handleConfirm={handleConfirm}
        prevIcon={prevIcon}
        nextIcon={nextIcon}
        superPrevIcon={superPrevIcon}
        superNextIcon={superNextIcon}
      />
    </div>
  );
};

const Calendar = ({
  type = "date", //日历类型，date | week | month | quarter | year
  selectValue, //选择的日期
  onSelect, //选择(type, value) => {}
  handleChangeTitle,
  curYear = new Date().getFullYear(),
  curMonth = new Date().getMonth() + 1,
  curDay = new Date().getDate(),
  isOpen = false,
  minDate,
  maxDate,
  needConfirm,
  handleConfirm,
  prevIcon,
  nextIcon,
  superPrevIcon,
  superNextIcon,
}) => {
  const today = `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;

  const calendarClassNames = ["inula-calendar", !isOpen && "closed"]
    .filter(Boolean)
    .join(" ");

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

  //日历头部
  const CalendarHeader = () => {
    return (
      <div className="inula-calendar-header">
        <div className="inula-calendar-header-left">
          {superPrevIcon ? (
            superPrevIcon
          ) : (
            <Icon
              value="angles-left"
              theme="filled"
              size={14}
              color="rgba(0,0,0,0.45)"
              onClick={() => handleChangeTitle("year", "minus")}
            />
          )}
          {type === "date" ||
            (type === "week" &&
              (prevIcon ? (
                prevIcon
              ) : (
                <Icon
                  value="chevron-left"
                  theme="filled"
                  size={14}
                  color="rgba(0,0,0,0.45)"
                  onClick={() => handleChangeTitle("month", "minus")}
                />
              )))}
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
          {type === "date" ||
            (type === "week" &&
              (nextIcon ? (
                nextIcon
              ) : (
                <Icon
                  value="chevron-right"
                  theme="filled"
                  size={14}
                  color="rgba(0,0,0,0.45)"
                  onClick={() => handleChangeTitle("month", "add")}
                />
              )))}
          {superNextIcon ? (
            superNextIcon
          ) : (
            <Icon
              value="angles-right"
              theme="filled"
              size={14}
              color="rgba(0,0,0,0.45)"
              onClick={() => handleChangeTitle("year", "add")}
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
          {["一", "二", "三", "四", "五", "六", "日"].map((item) => (
            <div key={item} className="inula-calendar-content-weekday">
              {item}
            </div>
          ))}
          {calculateRenderDateItems(curYear, curMonth).map((item, index) => {
            return (
              <div
                key={`${item.day}-${index}`}
                className={[
                  "inula-calendar-content-date-item",
                  !item.isThisPage &&
                    "inula-calendar-content-date-item-notthispage",
                  today === `${item.year}-${item.month}-${item.day}` &&
                    "inula-calendar-content-date-item-today",
                  selectValue === `${item.year}-${item.month}-${item.day}` &&
                    item.isThisPage &&
                    "inula-calendar-content-date-item-selected",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => onSelect && onSelect("date", item)}
              >
                {item.day}
              </div>
            );
          })}
        </if>
        <else-if cond={type === "week"}>
          <div className="inula-calendar-content-week-row-header">
            {[" ", "一", "二", "三", "四", "五", "六", "日"].map((item) => (
              <div key={item} className="inula-calendar-content-weekday">
                {item}
              </div>
            ))}
          </div>
          {calculateRenderWeekItems(curYear, curMonth).map((row, index) => {
            return (
              <div
                className={[
                  "inula-calendar-content-week-row",
                  selectValue === `${curYear}-${row[0].week}周` &&
                    "inula-calendar-content-week-row-selected",
                ]
                  .filter(Boolean)
                  .join(" ")}
                key={index}
                onClick={() => onSelect && onSelect("week", row[0])}
              >
                {row.map((item, index) => {
                  return (
                    <div
                      key={`${item.week}-${index}`}
                      className={[
                        "inula-calendar-content-date-item",
                        !item.isThisPage &&
                          "inula-calendar-content-date-item-notthispage",
                        today === `${item.year}-${item.month}-${item.day}` &&
                          "inula-calendar-content-date-item-today",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() => onSelect && onSelect("week", item)}
                    >
                      {item.day || item.week}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </else-if>
        <else-if cond={type === "month"}>
          {calculateRenderYQMItems("month", curYear).map((item, index) => {
            return (
              <div
                className={[
                  "inula-calendar-content-month-item",
                  selectValue === `${curYear}-${item.month}` &&
                    "inula-calendar-content-month-item-selected",
                ]
                  .filter(Boolean)
                  .join(" ")}
                key={`${curYear}-${item.month}-${index}`}
                onClick={() => onSelect && onSelect("month", item)}
              >{`${item.month}月`}</div>
            );
          })}
        </else-if>
        <else-if cond={type === "quarter"}>
          {calculateRenderYQMItems("quarter", curYear).map((item, index) => {
            return (
              <div
                key={`${curYear}-Q${item.quarter}-${index}`}
                className={[
                  "inula-calendar-content-quarter-item",
                  selectValue === `${curYear}-Q${item.quarter}` &&
                    "inula-calendar-content-quarter-item-selected",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => onSelect && onSelect("quarter", item)}
              >
                {`Q${item.quarter}`}
              </div>
            );
          })}
        </else-if>
        <else>
          {calculateRenderYQMItems("year", curYear).map((item, index) => {
            return (
              <div
                key={`${item.year}-${index}`}
                className={[
                  "inula-calendar-content-year-item",
                  selectValue === `${item.year}` &&
                    "inula-calendar-content-year-item-selected",
                  !item.isThisPage &&
                    "inula-calendar-content-year-item-notthispage",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => onSelect && onSelect("year", item)}
              >
                {`${item.year}`}
              </div>
            );
          })}
        </else>
      </div>
    );
  };

  //日历底部
  const CalendarFooter = () => {
    const justifyContent = () => {
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
        <if cond={type === "date"}>
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
            onClick={handleConfirm}
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
      {(type === "date" || needConfirm) && <CalendarFooter />}
    </div>
  );
};

export default DatePicker;
