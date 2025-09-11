import { calculateDateWeek } from "./calculateFunc";

const padZero = (n) => (n < 10 ? "0" + n : String(n));

export function formatDate(date, defaultValue, format, type) {
  if (!date) return "";

  let year, month, day, week, quarter;
  if (type === "date") {
    [year, month, day] = date.split("-").map(Number);
  } else if (type === "week") {
    const m1 = date.match(/^(\d+)-(\d+)周$/);
    if (m1) {
      year = +m1[1];
      week = +m1[2];
    }
  } else if (type === "month") {
    [year, month] = date.split("-").map(Number);
  } else if (type === "quarter") {
    const m2 = date.match(/^(\d+)-Q(\d)$/i);
    if (m2) {
      year = +m2[1];
      quarter = +m2[2];
    }
  } else if (type === "year") {
    year = +date;
  }

  let parseTemplate, outSeparator;
  if (!format) {
    const map = {
      date: "YYYY-MM-DD",
      week: "YYYY-WW周",
      month: "YYYY-MM",
      quarter: "YYYY-QX",
      year: "YYYY",
    };
    parseTemplate = map[type];
    outSeparator = "-";
  } else {
    parseTemplate = format;
    outSeparator = format.match(/[YMDW]([^YMDW\d])/)?.[1] ?? "-";
  }

  let dyear, dmonth, dday, dweek, dquarter;
  if (defaultValue) {
    const regex = new RegExp(
      parseTemplate
        .replace("YYYY", "(\\d{4})")
        .replace("MM", "(\\d{1,2})")
        .replace("DD", "(\\d{1,2})")
        .replace("WW", "(\\d{1,2})")
        .replace("QX", "Q(\\d)")
    );
    const match = defaultValue.match(regex);
    if (match) {
      let i = 1;
      if (parseTemplate.includes("YYYY")) dyear = +match[i++];
      if (parseTemplate.includes("MM")) dmonth = +match[i++];
      if (parseTemplate.includes("DD")) dday = +match[i++];
      if (parseTemplate.includes("WW")) dweek = +match[i++];
      if (parseTemplate.includes("QX")) dquarter = +match[i++];
    }
  }

  const now = new Date();
  const cyear = now.getFullYear();
  const cmonth = now.getMonth() + 1;
  const cday = now.getDate();
  const cweek = calculateDateWeek(now);
  const cquarter = Math.floor((cmonth - 1) / 3) + 1;

  year = year ?? dyear ?? cyear;
  month = month ?? dmonth ?? cmonth;
  day = day ?? dday ?? cday;
  week = week ?? dweek ?? cweek;
  quarter = quarter ?? dquarter ?? cquarter;

  let template = parseTemplate;
  let result = template
    .replace("YYYY", String(year))
    .replace("MM", padZero(month))
    .replace("DD", padZero(day))
    .replace("WW", padZero(week))
    .replace("QX", "Q" + quarter);

  result = result.replace(/(\d)\D/, `$1${outSeparator}`);

  return result;
}

/**
 * @param {string} defaultValue  外部默认值
 * @param {string} [format]      外部格式（解析用）
 * @param {string} toFormat      内部目标格式（输出用）
 * @param {string} [type]        五件套钥匙
 * @returns {string}             符合 toFormat 的字符串
 */
export function parseDefaultToFormat(
  defaultValue = "",
  format = "",
  toFormat,
  type = "date"
) {
  if (!defaultValue || !toFormat) return "";

  const parseTemplate =
    format ||
    {
      date: "YYYY-MM-DD",
      week: "YYYY-WW周",
      month: "YYYY-MM",
      quarter: "YYYY-QX",
      year: "YYYY",
    }[type];

  const regex = new RegExp(
    parseTemplate
      .replace("YYYY", "(\\d{4})")
      .replace("MM", "(\\d{1,2})")
      .replace("DD", "(\\d{1,2})")
      .replace("WW", "(\\d{1,2})")
      .replace("QX", "Q(\\d)")
  );
  const match = defaultValue.match(regex);
  if (!match) return ""; // 解析失败

  let i = 1;
  let year, month, day, week, quarter;
  if (parseTemplate.includes("YYYY")) year = +match[i++];
  if (parseTemplate.includes("MM")) month = +match[i++];
  if (parseTemplate.includes("DD")) day = +match[i++];
  if (parseTemplate.includes("WW")) week = +match[i++];
  if (parseTemplate.includes("QX")) quarter = +match[i++];

  const now = new Date();
  year = year ?? now.getFullYear();
  month = month ?? now.getMonth() + 1;
  day = day ?? now.getDate();
  week = week ?? calculateDateWeek(now);
  quarter = quarter ?? Math.floor((month - 1) / 3) + 1;

  let result = toFormat
    .replace("YYYY", String(year))
    .replace("MM", padZero(month))
    .replace("DD", padZero(day))
    .replace("WW", padZero(week))
    .replace("QX", "Q" + quarter);

  const outSep = toFormat.match(/[YMDW]([^YMDW\d])/)?.[1] ?? "-";
  result = result.replace(/(\d)\D/, `$1${outSep}`);

  return result;
}

export function formatDateToObject(date = "", format = "", type = "date") {
  if (!date) return null;

  const parseTemplate =
    format ||
    {
      date: "YYYY-MM-DD",
      week: "YYYY-WW周",
      month: "YYYY-MM",
      quarter: "YYYY-QX",
      year: "YYYY",
    }[type];

  const regex = new RegExp(
    parseTemplate
      .replace("YYYY", "(\\d{4})")
      .replace("MM", "(\\d{1,2})")
      .replace("DD", "(\\d{1,2})")
      .replace("WW", "(\\d{1,2})")
      .replace("QX", "Q(\\d)")
  );
  const match = date.match(regex);
  if (!match)
    return { year: null, quarter: null, month: null, week: null, day: null };

  let i = 1;
  const res = { year: null, quarter: null, month: null, week: null, day: null };
  if (parseTemplate.includes("YYYY")) res.year = +match[i++];
  if (parseTemplate.includes("QX")) res.quarter = +match[i++];
  if (parseTemplate.includes("MM")) res.month = +match[i++];
  if (parseTemplate.includes("WW")) res.week = +match[i++];
  if (parseTemplate.includes("DD")) res.day = +match[i++];

  return res;
}

export function formatDateToYearMonth(date = "", format = "", type = "date") {
  if (!date) return { year: null, month: null };

  const parseTemplate =
    format ||
    {
      date: "YYYY-MM-DD",
      week: "YYYY-WW周",
      month: "YYYY-MM",
      quarter: "YYYY-QX",
      year: "YYYY",
    }[type];

  const regex = new RegExp(
    parseTemplate
      .replace("YYYY", "(\\d{4})")
      .replace("MM", "(\\d{1,2})")
      .replace("DD", "(\\d{1,2})")
      .replace("WW", "(\\d{1,2})")
      .replace("QX", "Q(\\d)")
  );
  const match = date.match(regex);
  if (!match) return { year: null, month: null };

  let i = 1;
  let year, month, week, quarter;
  if (parseTemplate.includes("YYYY")) year = +match[i++];
  if (parseTemplate.includes("MM")) month = +match[i++];
  if (parseTemplate.includes("WW")) week = +match[i++];
  if (parseTemplate.includes("QX")) quarter = +match[i++];

  // 如果是周，计算周所在的月
  if (type === "week" && week) {
    const firstDayOfWeek = new Date(year, 0, 1 + (week - 1) * 7);
    month = firstDayOfWeek.getMonth() + 1;
  }

  // 如果是季度，月为 null
  if (type === "quarter") {
    month = null;
  }

  // 如果是年，月为 null
  if (type === "year") {
    month = null;
  }

  return { year, month };
}

export function formatDateToYYYYMM(date, type) {
  const yyyymm = formatDate(date, "", "YYYY-MM", type);
  return yyyymm;
}
