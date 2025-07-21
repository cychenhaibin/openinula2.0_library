

function getDays(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function pad(n) {
  return n < 10 ? "0" + n : n;
}
function formatDate(y, m, d) {
  return `${y}-${pad(m + 1)}-${pad(d)}`;
}
function parseDate(str) {
  if (!str) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(str);
  if (!m) return null;
  return { y: +m[1], m: +m[2] - 1, d: +m[3] };
}
function isToday(y, m, d) {
  const now = new Date();
  return now.getFullYear() === y && now.getMonth() === m && now.getDate() === d;
}

function DatePicker({ disabled = false, placeholder = "请选择日期" }) {
  let show = false;
  let date = "";
  let inputHover = false;
  let inputFocus = false;

  // 日历面板当前年月
  let panelYear = new Date().getFullYear();
  let panelMonth = new Date().getMonth();

  function openPanel() {
    if (disabled) return;
    show = true;
    inputFocus = true;
    if (date) {
      const parsed = parseDate(date);
      if (parsed) {
        panelYear = parsed.y;
        panelMonth = parsed.m;
      }
    }
  }
  function closePanel() {
    show = false;
    inputFocus = false;
  }
  function selectDate(y, m, d) {
    date = formatDate(y, m, d);
    closePanel();
  }
  function onInput(e) {
    date = e.target.value;
  }
  function clearDate(e) {
    e.stopPropagation();
    date = "";
  }
  function prevMonth() {
    if (panelMonth === 0) {
      panelYear--;
      panelMonth = 11;
    } else {
      panelMonth--;
    }
  }
  function nextMonth() {
    if (panelMonth === 11) {
      panelYear++;
      panelMonth = 0;
    } else {
      panelMonth++;
    }
  }
  function prevYear() {
    panelYear--;
  }
  function nextYear() {
    panelYear++;
  }
  function selectToday() {
    const now = new Date();
    selectDate(now.getFullYear(), now.getMonth(), now.getDate());
  }
  function onDocClick(e) {
    if (
      !e.target.closest(".inula-datepicker-root") &&
      !e.target.closest(".inula-datepicker-panel")
    ) {
      show = false;
      inputFocus = false;
    }
  }
  if (show) {
    document.addEventListener("mousedown", onDocClick);
  } else {
    document.removeEventListener("mousedown", onDocClick);
  }

  // 渲染日历面板
  function renderCalendar() {
    // 计算日历面板的日期分布（含上月、下月溢出天数）
    const firstDay = new Date(panelYear, panelMonth, 1).getDay();
    const daysInMonth = getDays(panelYear, panelMonth);
    const daysInPrevMonth = getDays(panelYear, panelMonth - 1 < 0 ? 11 : panelMonth - 1);
    const prevMonth = panelMonth - 1 < 0 ? 11 : panelMonth - 1;
    const prevYear = panelMonth - 1 < 0 ? panelYear - 1 : panelYear;
    const nextMonth = panelMonth + 1 > 11 ? 0 : panelMonth + 1;
    const nextYear = panelMonth + 1 > 11 ? panelYear + 1 : panelYear;

    let cells = [];
    // 上月溢出
    for (let i = 0; i < firstDay; i++) {
      cells.push({
        y: prevYear,
        m: prevMonth,
        d: daysInPrevMonth - firstDay + i + 1,
        type: "prev"
      });
    }
    // 本月
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({
        y: panelYear,
        m: panelMonth,
        d,
        type: "current"
      });
    }
    // 下月溢出
    while (cells.length % 7 !== 0) {
      cells.push({
        y: nextYear,
        m: nextMonth,
        d: cells.length - (firstDay + daysInMonth) + 1,
        type: "next"
      });
    }
    // 6行
    while (cells.length < 42) {
      cells.push({
        y: nextYear,
        m: nextMonth,
        d: cells.length - (firstDay + daysInMonth) + 1,
        type: "next"
      });
    }
    const weeks = [];
    for (let i = 0; i < 6; i++) {
      weeks.push(cells.slice(i * 7, (i + 1) * 7));
    }
    const selected = parseDate(date);

    return (
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center", background: "none" }}>
        <thead>
          <tr style={{ color: "#999", fontWeight: 400, fontSize: "13px" }}>
            <th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th>
          </tr>
        </thead>
        <tbody>
          <for each={weeks}>
            {(week, i) => (
              <tr key={i}>
                <for each={week}>
                  {(cell, j) => {
                    const isSelected =
                      selected &&
                      selected.y === cell.y &&
                      selected.m === cell.m &&
                      selected.d === cell.d;
                    const isTodayCell = isToday(cell.y, cell.m, cell.d);
                    return (
                      <td
                        key={j}
                        style={{
                          padding: "0",
                          height: "36px",
                          cursor: cell.type === "current" ? "pointer" : "default",
                          borderRadius: "6px",
                          background: isSelected
                            ? "#fff"
                            : isTodayCell && cell.type === "current"
                            ? "#fff"
                            : "none",
                          border: isSelected
                            ? "2px solid #1677ff"
                            : isTodayCell && cell.type === "current"
                            ? "1.5px solid #1677ff"
                            : "1.5px solid transparent",
                          color:
                            cell.type === "prev" || cell.type === "next"
                              ? "#d9d9d9"
                              : "#222",
                          fontWeight: isSelected ? 600 : 400,
                          transition: "background 0.2s, border 0.2s",
                          position: "relative",
                        }}
                        onClick={() => cell.type === "current" && selectDate(cell.y, cell.m, cell.d)}
                        onMouseEnter={e => {
                          if (cell.type === "current" && !isSelected)
                            e.target.style.background = "#e6f4ff";
                        }}
                        onMouseLeave={e => {
                          if (cell.type === "current" && !isSelected)
                            e.target.style.background = "none";
                        }}
                      >
                        {cell.d}
                      </td>
                    );
                  }}
                </for>
              </tr>
            )}
          </for>
        </tbody>
      </table>
    );
  }

  return (
    <div
      className="inula-datepicker-root"
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => (inputHover = true)}
      onMouseLeave={() => (inputHover = false)}
    >
      {/* 日历icon */}
      <span
        style={{
          position: "absolute",
          left: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          color: disabled ? "#bfbfbf" : "#bfbfbf",
          pointerEvents: "none",
          fontSize: "18px",
        }}
      >
        <svg width="18" height="18" fill="none" viewBox="0 0 1024 1024">
          <rect x="160" y="192" width="704" height="672" rx="48" fill="#fff" stroke="#d9d9d9" strokeWidth="40"/>
          <rect x="160" y="288" width="704" height="576" rx="0" fill="#fafafa"/>
        </svg>
      </span>
      <input
        type="text"
        value={date}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={openPanel}
        onInput={onInput}
        style={{
          width: "220px",
          padding: "8px 12px 8px 38px",
          border: "1px solid " + (show ? "#1677ff" : inputHover ? "#4096ff" : "#d9d9d9"),
          borderRadius: "6px",
          fontSize: "16px",
          outline: show ? "2px solid #1677ff" : "none",
          boxShadow: show ? "0 0 0 2px rgba(22,119,255,0.2)" : "none",
          transition: "all 0.2s",
          background: disabled ? "#f5f5f5" : "#fff",
          color: disabled ? "#bfbfbf" : "#222",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      />
      {/* 清除按钮 */}
      <if cond={date && !disabled}>
        <span
          onClick={clearDate}
          style={{
            position: "absolute",
            right: "36px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#bfbfbf",
            fontSize: "16px",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          ×
        </span>
      </if>
      {/* 浮层日历面板 */}
      <if cond={show && !disabled}>
        <div
          className="inula-datepicker-panel"
          style={{
            position: "absolute",
            top: "48px",
            left: 0,
            background: "#fff",
            border: "1px solid #f0f0f0",
            borderRadius: "12px",
            boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
            padding: "0 0 12px 0",
            zIndex: 100,
            minWidth: "320px",
            width: "320px",
            userSelect: "none",
          }}
        >
          {/* 头部：切换年/月 */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 24px 8px 24px",
            borderBottom: "1px solid #f0f0f0"
          }}>
            <div>
              <button onClick={prevYear} style={{
                border: "none", background: "none", fontSize: "18px", cursor: "pointer", color: "#bfbfbf", marginRight: "2px"
              }} tabIndex={-1} type="button">{"<<"}</button>
              <button onClick={prevMonth} style={{
                border: "none", background: "none", fontSize: "18px", cursor: "pointer", color: "#bfbfbf"
              }} tabIndex={-1} type="button">{"<"}</button>
            </div>
            <span style={{ fontWeight: 600, fontSize: "18px" }}>
              {panelYear}年 {pad(panelMonth + 1)}月
            </span>
            <div>
              <button onClick={nextMonth} style={{
                border: "none", background: "none", fontSize: "18px", cursor: "pointer", color: "#bfbfbf"
              }} tabIndex={-1} type="button">{">"}</button>
              <button onClick={nextYear} style={{
                border: "none", background: "none", fontSize: "18px", cursor: "pointer", color: "#bfbfbf", marginLeft: "2px"
              }} tabIndex={-1} type="button">{">>"}</button>
            </div>
          </div>
          {/* 日历表格 */}
          <div style={{ padding: "0 24px" }}>
            {renderCalendar()}
          </div>
          {/* 今天按钮 */}
          <div style={{
            textAlign: "center",
            padding: "8px 0 0 0",
            fontSize: "15px"
          }}>
            <button
              onClick={selectToday}
              style={{
                border: "none",
                background: "none",
                color: "#1677ff",
                cursor: "pointer",
                fontWeight: 500,
                borderRadius: "6px",
                padding: "4px 16px",
                transition: "background 0.2s"
              }}
              type="button"
            >今天</button>
          </div>
        </div>
      </if>
    </div>
  );
}

export default DatePicker;
