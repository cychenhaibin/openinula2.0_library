//计算给定年月有多少天
export function calculateDaysInYearMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

//计算给定年月的当月第一天是星期几
export function calculateFirstWeekDayInYearMonth(year, month) {
  return ((new Date(year, month - 1, 1).getDay() + 6) % 7) + 1;
}

//日期选择器，计算当前渲染年月的calendar渲染数组
export function calculateRenderDateItems(year, month) {
  const curMonthDays = calculateDaysInYearMonth(year, month);
  const curStartWeek = calculateFirstWeekDayInYearMonth(year, month);
  const preMonthDays = calculateDaysInYearMonth(
    month === 1 ? year - 1 : year,
    month === 1 ? 12 : month - 1
  );
  const preMonth = month === 1 ? 12 : month - 1;
  const preYear = month === 1 ? year - 1 : year;
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;
  const items = [];
  for (let i = curStartWeek - 1; i >= 1; i--) {
    items.push({
      year: preYear,
      month: preMonth,
      day: preMonthDays - i + 1,
      isThisTitleRange: false,
    });
  }

  for (let i = 1; i <= curMonthDays; i++) {
    items.push({
      year: year,
      month: month,
      day: i,
      isThisTitleRange: true,
    });
  }

  for (let i = 1; i <= 42 - (curStartWeek + curMonthDays) + 1; i++) {
    items.push({
      year: nextYear,
      month: nextMonth,
      day: i,
      isThisTitleRange: false,
    });
  }

  return items;
}

//周选择器，计算当前的calendar渲染数组
export function calculateRenderWeekItems(year, month) {
  const curMonthDays = calculateDaysInYearMonth(year, month);
  const curStartWeek = calculateFirstWeekDayInYearMonth(year, month);
  const preMonthDays = calculateDaysInYearMonth(
    month === 1 ? year - 1 : year,
    month === 1 ? 12 : month - 1
  );
  const preMonth = month === 1 ? 12 : month - 1;
  const preYear = month === 1 ? year - 1 : year;
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;
  const items = [];
  let weekCount = calculateWeekOfYearForFirstDay(year, month);
  let dayCount = 0;
  for (let i = curStartWeek - 1; i >= 1; i--) {
    if (dayCount % 7 === 0) {
      items.push({
        year: preYear,
        month: preMonth,
        week: weekCount,
        day: null,
        isThisTitleRange: false,
      });
      weekCount++;
    }
    items.push({
      year: preYear,
      month: preMonth,
      week: weekCount - 1,
      day: preMonthDays - i + 1,
      isThisTitleRange: false,
    });
    dayCount++;
  }

  for (let i = 1; i <= curMonthDays; i++) {
    if (dayCount % 7 === 0) {
      items.push({
        year: year,
        month: month,
        week: weekCount,
        day: null,
        isThisTitleRange: false,
      });
      weekCount++;
    }
    items.push({
      year: year,
      month: month,
      week: weekCount - 1,
      day: i,
      isThisTitleRange: true,
    });
    dayCount++;
  }

  for (let i = 1; i <= 42 - (curStartWeek + curMonthDays) + 1; i++) {
    if (dayCount % 7 === 0) {
      items.push({
        year: nextYear,
        month: nextMonth,
        week: weekCount,
        day: null,
        isThisTitleRange: false,
      });
      weekCount++;
    }
    items.push({
      year: nextYear,
      month: nextMonth,
      week: weekCount - 1,
      day: i,
      isThisTitleRange: false,
    });
    dayCount++;
  }

  // return items;

  const ROW = 6,
    COL = 8,
    TOTAL = ROW * COL;
  while (items.length < TOTAL) items.push({});

  const matrix = [];
  for (let r = 0; r < ROW; r++) {
    matrix.push(items.slice(r * COL, (r + 1) * COL));
  }
  return matrix;
}

//年、季度、月选择器，计算当前calendar渲染数组
export function calculateRenderYQMItems(type, year) {
  const items = [];
  switch (type) {
    case "year": {
      const curYearStart = Math.floor(year / 10) * 10;
      items.push({ year: curYearStart - 1, isThisTitleRange: false });
      for (let i = curYearStart; i <= curYearStart + 9; i++) {
        items.push({ year: i, isThisTitleRange: true });
      }
      items.push({ year: curYearStart + 10, isThisTitleRange: false });

      return items;
    }
    case "month": {
      for (let i = 1; i <= 12; i++) {
        items.push({ year: year, month: i, isThisTitleRange: true });
      }
      return items;
    }
    case "quarter": {
      for (let i = 1; i <= 4; i++) {
        items.push({ year: year, quarter: i, isThisTitleRange: true });
      }
      return items;
    }
  }
}

//计算某年某月某日是某年第几周
export function calculateCurWeek(year, month, day) {
  const date = new Date(year, month - 1, day);

  // 设置日期为当前日期的周四（ISO周计算中，周四决定属于哪一周）
  const thursday = new Date(date);
  thursday.setDate(date.getDate() + 4 - (date.getDay() || 7)); // 周日为0，转为7

  const yearStart = new Date(thursday.getFullYear(), 0, 1);

  const week = Math.ceil(((thursday - yearStart) / 86400000 + 1) / 7);

  return week;
}

//根据年、月计算当月第一天是当年第几周
export function calculateWeekOfYearForFirstDay(year, month) {
  // 当月第一天
  const firstDay = new Date(year, month - 1, 1);

  // 复制一份，避免污染原日期
  const target = new Date(firstDay);
  const WEEK_START = 1;

  const day = target.getDay();
  const offset = (day + 7 - WEEK_START) % 7;
  target.setDate(target.getDate() - offset);

  // 当年 1 月 1 日
  const yearStart = new Date(year, 0, 1);
  const yearStartDay = yearStart.getDay();
  const yearStartOffset = (yearStartDay + 7 - WEEK_START) % 7;

  yearStart.setDate(yearStart.getDate() - yearStartOffset);

  const delta = firstDay - yearStart; // 毫秒
  const week = Math.floor(delta / (7 * 24 * 3600 * 1000)) + 1;

  return week;
}

//根据年月日，计算当前的周数
export function calculateDateWeek(date) {
  const target = new Date(date.valueOf());
  const day = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - day + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - target) / 604800000);
}

//计算当前现实时间的年月日
export function getTodayDate() {
  const date = new Date();
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
}
