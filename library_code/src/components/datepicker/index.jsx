import './index.css';
import Icon from '../icon';

const DatePicker = ({
  value,
  defaultValue,
  placeholder = '请选择日期',
  onChange,
  disabled = false,
  size = 'default', // small, default, large
  clearable = true,
  showToday = true,
  needConfirm = false,
  style = {},
  hoverIcon = false,
  className = '',
  mode = 'date', // date, week, month, quarter, year
  ...rest
}) => {
  // State variables
  let isOpen = false;
  let selectedDate = value !== undefined ? value : defaultValue || '';
  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  let currentView = mode; // date, week, month, quarter, year
  
  // If selectedDate is provided, set currentMonth and currentYear to match it
  if (selectedDate) {
    const date = parseDate(selectedDate);
    if (date) {
      currentMonth = date.getMonth();
      currentYear = date.getFullYear();
    }
  }

  // Format date as YYYY-MM-DD
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Format week as YYYY-WW
  function formatWeek(date) {
    const year = date.getFullYear();
    const week = getWeekNumber(date);
    return `${year}-${String(week).padStart(2, '0')}周`;
  }

  // Format month as YYYY-MM
  function formatMonth(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  }

  // Format quarter as YYYY-QN
  function formatQuarter(date) {
    const year = date.getFullYear();
    const quarter = Math.floor(date.getMonth() / 3) + 1;
    return `${year}-Q${quarter}`;
  }

  // Format year as YYYY
  function formatYear(date) {
    return `${date.getFullYear()}`;
  }

  // Get week number of the year
  function getWeekNumber(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  // Get week start and end dates (修正版本)
  function getWeekDates(date) {
    const day = date.getDay();
    // 计算本周的周一
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(date.getFullYear(), date.getMonth(), diff);
    // 计算本周的周日
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    return { start: monday, end: sunday };
  }

  const onIconHover = () => {
    hoverIcon = true;
  }

  const onIconLeave = () => {
    hoverIcon = false;
  }

  // Parse date string to Date object
  function parseDate(dateString) {
    if (!dateString) return null;
    
    if (mode === 'week' && dateString.includes('周')) {
      const match = dateString.match(/(\d{4})-(\d{2})周/);
      if (match) {
        const year = parseInt(match[1]);
        const week = parseInt(match[2]);
        // 计算该周的第一天
        const firstDayOfYear = new Date(year, 0, 1);
        const daysToAdd = (week - 1) * 7;
        const weekStart = new Date(firstDayOfYear);
        weekStart.setDate(firstDayOfYear.getDate() + daysToAdd);
        return weekStart;
      }
    } else if (mode === 'month' && dateString.includes('-')) {
      const [year, month] = dateString.split('-').map(Number);
      return new Date(year, month - 1, 1);
    } else if (mode === 'quarter' && dateString.includes('Q')) {
      const match = dateString.match(/(\d{4})-Q(\d)/);
      if (match) {
        const year = parseInt(match[1]);
        const quarter = parseInt(match[2]);
        const month = (quarter - 1) * 3;
        return new Date(year, month, 1);
      }
    } else if (mode === 'year') {
      const year = parseInt(dateString);
      return new Date(year, 0, 1);
    } else {
      const [year, month, day] = dateString.split('-').map(Number);
      return new Date(year, month - 1, day);
    }
    return null;
  }

  // Get days in month
  function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  // Get day of week for first day of month (0 = Sunday, 6 = Saturday)
  function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
  }

  // Handle date selection
  function handleDateSelect(day) {
    const newDate = new Date(currentYear, currentMonth, day);
    let formattedValue;
    
    switch (mode) {
      case 'date':
        formattedValue = formatDate(newDate);
        break;
      case 'week':
        // 在周模式下，选择日期时应该选择该日期所在的整周
        formattedValue = formatWeek(newDate);
        break;
      case 'month':
        formattedValue = formatMonth(newDate);
        break;
      case 'quarter':
        formattedValue = formatQuarter(newDate);
        break;
      case 'year':
        formattedValue = formatYear(newDate);
        break;
      default:
        formattedValue = formatDate(newDate);
    }
    
    if (!needConfirm) {
      if (value === undefined) {
        selectedDate = formattedValue;
      }
      if (onChange) {
        onChange(formattedValue);
      }
      setTimeout(() => {
        isOpen = false;
      }, 100);
    } else {
      if (value === undefined) {
        selectedDate = formattedValue;
      }
    }
  }

  // Handle week selection
  function handleWeekSelect(weekStart) {
    const formattedValue = formatWeek(weekStart);
    
    if (!needConfirm) {
      if (value === undefined) {
        selectedDate = formattedValue;
      }
      if (onChange) {
        onChange(formattedValue);
      }
      setTimeout(() => {
        isOpen = false;
      }, 100);
    } else {
      if (value === undefined) {
        selectedDate = formattedValue;
      }
    }
  }

  // Handle month selection
  function handleMonthSelect(month) {
    const newDate = new Date(currentYear, month, 1);
    const formattedValue = formatMonth(newDate);
    
    if (!needConfirm) {
      if (value === undefined) {
        selectedDate = formattedValue;
      }
      if (onChange) {
        onChange(formattedValue);
      }
      setTimeout(() => {
        isOpen = false;
      }, 100);
    } else {
      if (value === undefined) {
        selectedDate = formattedValue;
      }
    }
  }

  // Handle quarter selection
  function handleQuarterSelect(quarter) {
    const month = (quarter - 1) * 3;
    const newDate = new Date(currentYear, month, 1);
    const formattedValue = formatQuarter(newDate);
    
    if (!needConfirm) {
      if (value === undefined) {
        selectedDate = formattedValue;
      }
      if (onChange) {
        onChange(formattedValue);
      }
      setTimeout(() => {
        isOpen = false;
      }, 100);
    } else {
      if (value === undefined) {
        selectedDate = formattedValue;
      }
    }
  }

  // Handle year selection
  function handleYearSelect(year) {
    const newDate = new Date(year, 0, 1);
    const formattedValue = formatYear(newDate);
    
    if (!needConfirm) {
      if (value === undefined) {
        selectedDate = formattedValue;
      }
      if (onChange) {
        onChange(formattedValue);
      }
      setTimeout(() => {
        isOpen = false;
      }, 100);
    } else {
      if (value === undefined) {
        selectedDate = formattedValue;
      }
    }
  }

  // Handle month navigation
  function handlePrevMonth() {
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear = currentYear - 1;
    } else {
      currentMonth = currentMonth - 1;
    }
    
    // 强制重新渲染日历
    forceUpdate();
    
    // 确保周视图正确更新
    if (mode === 'week') {
      setTimeout(() => {
        const dropdown = document.querySelector('.inula-datepicker-dropdown');
        if (dropdown) {
          updateWeekView(dropdown);
        }
      }, 0);
    }
  }

  function handleNextMonth() {
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear = currentYear + 1;
    } else {
      currentMonth = currentMonth + 1;
    }
    
    // 强制重新渲染日历
    forceUpdate();
    
    // 确保周视图正确更新
    if (mode === 'week') {
      setTimeout(() => {
        const dropdown = document.querySelector('.inula-datepicker-dropdown');
        if (dropdown) {
          updateWeekView(dropdown);
        }
      }, 0);
    }
  }

  // Handle year navigation
  function handlePrevYear() {
    currentYear = currentYear - 1;
    
    // 强制重新渲染日历
    forceUpdate();
    
    // 确保周视图正确更新
    if (mode === 'week') {
      setTimeout(() => {
        const dropdown = document.querySelector('.inula-datepicker-dropdown');
        if (dropdown) {
          updateWeekView(dropdown);
        }
      }, 0);
    }
  }

  function handleNextYear() {
    currentYear = currentYear + 1;
    
    // 强制重新渲染日历
    forceUpdate();
    
    // 确保周视图正确更新
    if (mode === 'week') {
      setTimeout(() => {
        const dropdown = document.querySelector('.inula-datepicker-dropdown');
        if (dropdown) {
          updateWeekView(dropdown);
        }
      }, 0);
    }
  }
  
  // 强制更新组件
  function forceUpdate() {
    // 直接更新日历内容，而不是关闭再打开
    const dropdown = document.querySelector('.inula-datepicker-dropdown');
    if (dropdown) {
      // 更新标题显示
      const headerView = dropdown.querySelector('.inula-datepicker-header-view');
      if (headerView) {
        if (mode === 'date' || mode === 'week') {
          headerView.textContent = `${currentYear}年 ${monthNames[currentMonth]}`;
        } else if (mode === 'year') {
          headerView.textContent = `${currentYear - 5}年-${currentYear + 4}年`;
        } else {
          headerView.textContent = `${currentYear}年`;
        }
      }
      
      // 根据当前模式更新内容
      updateCalendarContent(dropdown);
    }
  }
  
  // 根据当前模式更新日历内容
  function updateCalendarContent(dropdown) {
    switch (mode) {
      case 'date':
        updateDateView(dropdown);
        break;
      case 'week':
        updateWeekView(dropdown);
        break;
      case 'month':
        updateMonthView(dropdown);
        break;
      case 'quarter':
        updateQuarterView(dropdown);
        break;
      case 'year':
        updateYearView(dropdown);
        break;
    }
  }
  
  // 更新日期视图
  function updateDateView(dropdown) {
    const daysContainer = dropdown.querySelector('.inula-datepicker-days:last-child');
    if (daysContainer) {
      // 清空现有内容
      daysContainer.innerHTML = '';
      
      // 重新生成日期
      const daysInMonth = getDaysInMonth(currentYear, currentMonth);
      const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
      
      // 添加空白单元格
      for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'inula-datepicker-day empty';
        daysContainer.appendChild(emptyDay);
      }
      
      // 添加日期单元格
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, currentMonth, day);
        const isToday = formatDate(date) === formatDate(new Date());
        let isSelected = false;
        let isInSelectedWeek = false;
        
        if (mode === 'date') {
          isSelected = selectedDate === formatDate(date);
        } else if (mode === 'week' && selectedDate) {
          const selectedWeek = parseDate(selectedDate);
          if (selectedWeek) {
            const selectedWeekDates = getWeekDates(selectedWeek);
            const currentDate = new Date(currentYear, currentMonth, day);
            isInSelectedWeek = currentDate >= selectedWeekDates.start && currentDate <= selectedWeekDates.end;
          }
        }
        
        const isDisabled = disabled;
        
        const dayElement = document.createElement('div');
        dayElement.className = `inula-datepicker-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${isInSelectedWeek ? 'week-selected' : ''} ${isDisabled ? 'disabled' : ''}`;
        dayElement.textContent = day;
        
        if (!isDisabled) {
          dayElement.addEventListener('click', () => handleDateSelect(day));
        }
        
        daysContainer.appendChild(dayElement);
      }
    }
  }
  
  // 更新周视图
  function updateWeekView(dropdown) {
    const weekNumbersContainer = dropdown.querySelector('.inula-datepicker-week-numbers');
    const weeksContainer = dropdown.querySelector('.inula-datepicker-weeks');
    
    if (weekNumbersContainer && weeksContainer) {
      // 清空现有内容
      weekNumbersContainer.innerHTML = '';
      weeksContainer.innerHTML = '';
      
      const daysInMonth = getDaysInMonth(currentYear, currentMonth);
      const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
      const totalWeeks = Math.ceil((daysInMonth + firstDayOfMonth) / 7);
      
      for (let week = 0; week < totalWeeks; week++) {
        const weekStartDate = new Date(currentYear, currentMonth, 1 - firstDayOfMonth + week * 7);
        const weekNumber = getWeekNumber(weekStartDate);
        
        // 创建周号
        const weekNumberElement = document.createElement('div');
        weekNumberElement.className = 'inula-datepicker-week-number';
        weekNumberElement.textContent = weekNumber;
        weekNumbersContainer.appendChild(weekNumberElement);
        
        // 创建周行
        const weekRowElement = document.createElement('div');
        weekRowElement.className = 'inula-datepicker-week-row';
        
        // 为这一周添加7天
        for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
          const currentDate = new Date(weekStartDate);
          currentDate.setDate(weekStartDate.getDate() + dayOfWeek);
          
          const day = currentDate.getDate();
          const isCurrentMonth = currentDate.getMonth() === currentMonth;
          const isToday = formatDate(currentDate) === formatDate(new Date());
          let isInSelectedWeek = false;
          let isWeekStart = false;
          let isWeekEnd = false;
          
          if (selectedDate) {
            const selectedWeek = parseDate(selectedDate);
            if (selectedWeek) {
              const selectedWeekDates = getWeekDates(selectedWeek);
              isInSelectedWeek = currentDate >= selectedWeekDates.start && currentDate <= selectedWeekDates.end;
              
              if (isInSelectedWeek) {
                const dayOfWeekNum = currentDate.getDay();
                isWeekStart = dayOfWeekNum === 1;
                isWeekEnd = dayOfWeekNum === 0;
              }
            }
          }
          
          const isDisabled = disabled;
          
          const dayElement = document.createElement('div');
          dayElement.className = `inula-datepicker-week ${!isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''} ${isInSelectedWeek ? 'week-selected' : ''} ${isWeekStart ? 'week-start' : ''} ${isWeekEnd ? 'week-end' : ''} ${isDisabled ? 'disabled' : ''}`;
          dayElement.textContent = day;
          
          if (!isDisabled) {
            dayElement.addEventListener('click', () => handleDateSelect(day));
          }
          
          weekRowElement.appendChild(dayElement);
        }
        
        weeksContainer.appendChild(weekRowElement);
      }
    }
  }
  
  // 更新月份视图
  function updateMonthView(dropdown) {
    const monthsContainer = dropdown.querySelector('.inula-datepicker-months');
    
    if (monthsContainer) {
      // 清空现有内容
      monthsContainer.innerHTML = '';
      
      for (let month = 0; month < 12; month++) {
        const date = new Date(currentYear, month, 1);
        const isSelected = selectedDate === formatMonth(date);
        
        const monthElement = document.createElement('div');
        monthElement.className = `inula-datepicker-month ${isSelected ? 'selected' : ''}`;
        monthElement.textContent = monthNames[month];
        monthElement.addEventListener('click', () => handleMonthSelect(month));
        
        monthsContainer.appendChild(monthElement);
      }
    }
  }
  
  // 更新季度视图
  function updateQuarterView(dropdown) {
    const quartersContainer = dropdown.querySelector('.inula-datepicker-quarters');
    
    if (quartersContainer) {
      // 清空现有内容
      quartersContainer.innerHTML = '';
      
      for (let quarter = 1; quarter <= 4; quarter++) {
        const date = new Date(currentYear, (quarter - 1) * 3, 1);
        const isSelected = selectedDate === formatQuarter(date);
        
        const quarterElement = document.createElement('div');
        quarterElement.className = `inula-datepicker-quarter ${isSelected ? 'selected' : ''}`;
        quarterElement.textContent = `Q${quarter}`;
        quarterElement.addEventListener('click', () => handleQuarterSelect(quarter));
        
        quartersContainer.appendChild(quarterElement);
      }
    }
  }
  
  // 更新年份视图
  function updateYearView(dropdown) {
    const yearsContainer = dropdown.querySelector('.inula-datepicker-years');
    
    if (yearsContainer) {
      // 清空现有内容
      yearsContainer.innerHTML = '';
      
      const startYear = currentYear - 5;
      
      for (let year = startYear; year <= startYear + 9; year++) {
        const date = new Date(year, 0, 1);
        const isSelected = selectedDate === formatYear(date);
        
        const yearElement = document.createElement('div');
        yearElement.className = `inula-datepicker-year ${isSelected ? 'selected' : ''}`;
        yearElement.textContent = year;
        yearElement.addEventListener('click', () => handleYearSelect(year));
        
        yearsContainer.appendChild(yearElement);
      }
    }
  }

  // Handle today button click
  function handleTodayClick() {
    const today = new Date();
    let formattedToday;
    
    switch (mode) {
      case 'date':
        formattedToday = formatDate(today);
        break;
      case 'week':
        formattedToday = formatWeek(today);
        break;
      case 'month':
        formattedToday = formatMonth(today);
        break;
      case 'quarter':
        formattedToday = formatQuarter(today);
        break;
      case 'year':
        formattedToday = formatYear(today);
        break;
      default:
        formattedToday = formatDate(today);
    }
    
    if (value === undefined) {
      selectedDate = formattedToday;
    }
    
    currentMonth = today.getMonth();
    currentYear = today.getFullYear();
    
    if (!needConfirm) {
      if (onChange) {
        onChange(formattedToday);
      }
      setTimeout(() => {
        isOpen = false;
      }, 100);
    }
  }

  // Handle confirm button click
  function handleConfirm() {
    isOpen = false;
    if (onChange) {
      onChange(selectedDate);
    }
  }

  // Handle clear button click
  function handleClear(e) {
    e.stopPropagation();
    if (value === undefined) {
      selectedDate = '';
    }
    if (onChange) {
      onChange('');
    }
  }

  // Toggle calendar visibility
  function handleToggle(e) {
    e.stopPropagation();
    if (!disabled) {
      isOpen = !isOpen;
      
      // 如果打开日历，确保使用最新的年月数据渲染
      if (isOpen) {
        // 如果有选中日期，使用选中日期的年月
        if (selectedDate) {
          const date = parseDate(selectedDate);
          if (date) {
            currentMonth = date.getMonth();
            currentYear = date.getFullYear();
          }
        }
      }
    }
  }

  // Handle click outside
  function handleBlur() {
    isOpen = false;
  }

  // Render calendar days
  function renderCalendarDays() {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="inula-datepicker-day empty"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday = formatDate(date) === formatDate(new Date());
      let isSelected = false;
      let isInSelectedWeek = false;
      
      if (mode === 'date') {
        isSelected = selectedDate === formatDate(date);
      } else if (mode === 'week' && selectedDate) {
        const selectedWeek = parseDate(selectedDate);
        if (selectedWeek) {
          const selectedWeekDates = getWeekDates(selectedWeek);
          // 比较日期是否在选中周内
          const currentDate = new Date(currentYear, currentMonth, day);
          isInSelectedWeek = currentDate >= selectedWeekDates.start && currentDate <= selectedWeekDates.end;
        }
      }
      
      const isDisabled = disabled;

      days.push(
        <div
          key={day}
          className={`inula-datepicker-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${isInSelectedWeek ? 'week-selected' : ''} ${isDisabled ? 'disabled' : ''}`}
          onClick={isDisabled ? undefined : () => handleDateSelect(day)}
        >
          {day}
        </div>
      );
    }

    return days;
  }

  // Render week view
  function renderWeekView() {
    // 当mode为week时，按周来渲染
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    const weeks = [];
    const weekNumbers = [];

    // 计算总周数
    const totalWeeks = Math.ceil((daysInMonth + firstDayOfMonth) / 7);
    
    for (let week = 0; week < totalWeeks; week++) {
      const weekDays = [];
      const weekStartDate = new Date(currentYear, currentMonth, 1 - firstDayOfMonth + week * 7);
      const weekNumber = getWeekNumber(weekStartDate);
      
      // 为这一周添加7天
      for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
        const currentDate = new Date(weekStartDate);
        currentDate.setDate(weekStartDate.getDate() + dayOfWeek);
        
        const day = currentDate.getDate();
        const isCurrentMonth = currentDate.getMonth() === currentMonth;
        const isToday = formatDate(currentDate) === formatDate(new Date());
        let isSelected = false;
        let isInSelectedWeek = false;
        let isWeekStart = false;
        let isWeekEnd = false;
        
        if (mode === 'week' && selectedDate) {
          const selectedWeek = parseDate(selectedDate);
          if (selectedWeek) {
            const selectedWeekDates = getWeekDates(selectedWeek);
            isInSelectedWeek = currentDate >= selectedWeekDates.start && currentDate <= selectedWeekDates.end;
            
            // 判断是否是周的开始和结束
            if (isInSelectedWeek) {
              const dayOfWeekNum = currentDate.getDay();
              isWeekStart = dayOfWeekNum === 1; // 周一
              isWeekEnd = dayOfWeekNum === 0; // 周日
            }
          }
        }
        
        const isDisabled = disabled;

        weekDays.push(
          <div
            key={`week-${week}-day-${dayOfWeek}`}
            className={`inula-datepicker-week ${!isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${isInSelectedWeek ? 'week-selected' : ''} ${isWeekStart ? 'week-start' : ''} ${isWeekEnd ? 'week-end' : ''} ${isDisabled ? 'disabled' : ''}`}
            onClick={isDisabled ? undefined : () => handleDateSelect(day)}
          >
            {day}
          </div>
        );
      }
      
      weeks.push(
        <div key={`week-${week}`} className="inula-datepicker-week-row">
          {weekDays}
        </div>
      );
      
      weekNumbers.push(
        <div key={`week-number-${week}`} className="inula-datepicker-week-number">
          {weekNumber}
        </div>
      );
    }

    return { weeks, weekNumbers };
  }

  // Render month view
  function renderMonthView() {
    const months = [];
    
    for (let month = 0; month < 12; month++) {
      const date = new Date(currentYear, month, 1);
      const isSelected = selectedDate === formatMonth(date);
      
      months.push(
        <div
          key={month}
          className={`inula-datepicker-month ${isSelected ? 'selected' : ''}`}
          onClick={() => handleMonthSelect(month)}
        >
          {monthNames[month]}
        </div>
      );
    }

    return months;
  }

  // Render quarter view
  function renderQuarterView() {
    const quarters = [];
    
    for (let quarter = 1; quarter <= 4; quarter++) {
      const date = new Date(currentYear, (quarter - 1) * 3, 1);
      const isSelected = selectedDate === formatQuarter(date);
      
      quarters.push(
        <div
          key={quarter}
          className={`inula-datepicker-quarter ${isSelected ? 'selected' : ''}`}
          onClick={() => handleQuarterSelect(quarter)}
        >
          Q{quarter}
        </div>
      );
    }

    return quarters;
  }

  // Render year view
  function renderYearView() {
    const years = [];
    const startYear = currentYear - 5;
    
    for (let year = startYear; year <= startYear + 9; year++) {
      const date = new Date(year, 0, 1);
      const isSelected = selectedDate === formatYear(date);
      
      years.push(
        <div
          key={year}
          className={`inula-datepicker-year ${isSelected ? 'selected' : ''}`}
          onClick={() => handleYearSelect(year)}
        >
          {year}
        </div>
      );
    }

    return years;
  }

  // Month names for display
  const monthNames = [
    '1月', '2月', '3月', '4月', '5月', '6月',
    '7月', '8月', '9月', '10月', '11月', '12月'
  ];

  // Day names for display
  const dayNames = ['日', '一', '二', '三', '四', '五', '六'];

  // Week names for display
  const weekNames = ['一', '二', '三', '四', '五', '六', '日'];

  // Determine size class
  const sizeClass = size === 'small' ? 'inula-datepicker-small' : 
                   size === 'large' ? 'inula-datepicker-large' : '';

  // Get placeholder based on mode
  const getPlaceholder = () => {
    switch (mode) {
      case 'week':
        return '请选择周';
      case 'month':
        return '请选择月份';
      case 'quarter':
        return '请选择季度';
      case 'year':
        return '请选择年份';
      default:
        return placeholder;
    }
  };

  return (
    <div 
      className={`inula-datepicker ${disabled ? 'inula-datepicker-disabled' : ''} ${sizeClass} ${className}`}
      tabIndex={0}
      onBlur={handleBlur}
      style={style}
      {...rest}
    >
      <div 
        className="inula-datepicker-input"
        onClick={(e) => handleToggle(e)}
      >
        <input
          type="text"
          placeholder={getPlaceholder()}
          value={selectedDate}
          readOnly
          disabled={disabled}
          onMouseEnter={onIconHover} 
          onMouseLeave={onIconLeave}
        />
        <if cond={selectedDate && clearable && !disabled && hoverIcon}>
          <span onMouseEnter={onIconHover} 
          onMouseLeave={onIconLeave} className="inula-datepicker-icon" onClick={handleClear}><Icon value="xmark" size={14} color="#999" /></span>
        </if>
        <else>
          <span onMouseEnter={onIconHover} 
          onMouseLeave={onIconLeave} className="inula-datepicker-icon" ><Icon value="calendar" size={16} color="#999" /></span>
        </else>
        
      </div>
      
      {isOpen && (
        <div className="inula-datepicker-dropdown" onClick={(e) => e.stopPropagation()}>
          <div className="inula-datepicker-header">
            <button className="inula-datepicker-prev-year" onClick={handlePrevYear}>
              <span>«</span>
            </button>
            {(mode === 'date' || mode === 'week') && (
              <button className="inula-datepicker-prev-month" onClick={handlePrevMonth}>
                <span>‹</span>
              </button>
            )}
            <span className="inula-datepicker-header-view">
              {mode === 'date' && `${currentYear}年 ${monthNames[currentMonth]}`}
              {mode === 'week' && `${currentYear}年 ${monthNames[currentMonth]}`}
              {mode === 'month' && `${currentYear}年`}
              {mode === 'quarter' && `${currentYear}年`}
              {mode === 'year' && `${currentYear - 5}年-${currentYear + 4}年`}
            </span>
            {(mode === 'date' || mode === 'week') && (
              <button className="inula-datepicker-next-month" onClick={handleNextMonth}>
                <span>›</span>
              </button>
            )}
            <button className="inula-datepicker-next-year" onClick={handleNextYear}>
              <span>»</span>
            </button>
          </div>
          
          <div className="inula-datepicker-body">
            {mode === 'date' && (
              <>
                <div className="inula-datepicker-days">
                  {dayNames.map((day, index) => (
                    <div key={index} className="inula-datepicker-day">{day}</div>
                  ))}
                </div>
                <div className="inula-datepicker-days">
                  {renderCalendarDays()}
                </div>
              </>
            )}
            {mode === 'week' && (
              <>
                <div className="inula-datepicker-weekdays">
                  {weekNames.map((day, index) => (
                    <div key={index} className="inula-datepicker-weekday">{day}</div>
                  ))}
                </div>
                <div className="inula-datepicker-week-numbers">
                  {renderWeekView().weekNumbers}
                </div>
                <div className="inula-datepicker-weeks">
                  {renderWeekView().weeks}
                </div>
              </>
            )}
            {mode === 'month' && (
              <div className="inula-datepicker-months">
                {renderMonthView()}
              </div>
            )}
            {mode === 'quarter' && (
              <div className="inula-datepicker-quarters">
                {renderQuarterView()}
              </div>
            )}
            {mode === 'year' && (
              <div className="inula-datepicker-years">
                {renderYearView()}
              </div>
            )}
          </div>
          
          <div className="inula-datepicker-footer">
            <div>
              {showToday && (
                <button className="inula-datepicker-today" onClick={handleTodayClick}>
                  今天
                </button>
              )}
            </div>
            <div>
              {needConfirm && (
                <button className="inula-datepicker-confirm" onClick={handleConfirm}>
                  确定
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;