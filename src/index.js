const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];
const EMPTY = '';
const DIV = 'div';
const COUNT_DAYS_OF_WEEK = 7;
const COUNT_CALENDAR_ROWS = 6;
const CURRENT_DATE = new Date();

const root = document.getElementById('root');
const cs = {
  btnGt: 'btn-gt',
  btnLt: 'btn-lt',
  btnSubmit: 'btn-submit',
  day: 'day',
  freeDay: 'free-day',
  pastDay: 'past-day',
  numberDay: 'number-day',
  selectedDay: 'selected-day',
  dayAnotherMonth: 'day-another-month',
  monthName: 'month-name',
  monthYear: 'month-year',
  daysOfMonth: 'days-of-month',
  daysRow: index => `days-row-${index}`,
  dataDate: date => `[data-date='${date}']`
};
const state = {
  dateOnPage: new Date(CURRENT_DATE),
  selectedDay: undefined,
};

const btnGt = root.querySelector(`.${cs.btnGt}`);
const btnLt = root.querySelector(`.${cs.btnLt}`);
const btnSubmit = root.querySelector(`.${cs.btnSubmit}`);

btnGt.onclick = () => {
  state.dateOnPage.setMonth(state.dateOnPage.getMonth() + 1);
  fullUpdate();
};

btnLt.onclick = () => {
  state.dateOnPage.setMonth(state.dateOnPage.getMonth() - 1);
  fullUpdate();
};

btnSubmit.onclick = () => {
  // fetch(...);
  alert(`Дата назначена на ${state.selectedDay?.dataset.date}`);
};

function updateMonthSwitcher() {
  if (CURRENT_DATE >= state.dateOnPage) {
    btnLt.disabled = true;
  } else {
    btnLt.disabled = false;
  }
}

function updateSelectedDay() {
  if (state.selectedDay) {
    const day = root.querySelector(cs.dataDate(state.selectedDay.dataset.date));
    if (day) {
      day.classList.add(cs.selectedDay);
      state.selectedDay = day;
    }
  }
}

function updateMonthTitle() {
  const monthName = root.querySelector(`.${cs.monthName}`);
  monthName.innerHTML = MONTHS[state.dateOnPage.getMonth()];

  const monthYear = root.querySelector(`.${cs.monthYear}`);
  monthYear.innerHTML = state.dateOnPage.getFullYear();
}

function updateDaysOfMonth() {
  const container = root.querySelector(`.${cs.daysOfMonth}`);
  container.innerHTML = EMPTY;
  const days = generateArrayDays(new Date(state.dateOnPage));

  for (let i = 0; i < COUNT_CALENDAR_ROWS; i++) {
    const elementRow = createElementWithClass(DIV, cs.daysRow(i + 1));
    for (let j = 0; j < COUNT_DAYS_OF_WEEK; j++) {
      const day = days[i * COUNT_DAYS_OF_WEEK + j];
      const elementNumberDay = createElementWithClass(DIV, cs.numberDay);
      const elementDay = createElementDay(day);

      elementNumberDay.append(day.getDate());
      elementDay.append(elementNumberDay);
      elementRow.append(elementDay);
    }
    container.append(elementRow);
  }
  addDaysClickHandler();
}

function addDaysClickHandler() {
  const freeDays = root.querySelectorAll(`.${cs.freeDay}`);
  for (const freeDay of freeDays) {
    freeDay.onclick = () => {
      if (state.selectedDay) {
        const day = root.querySelector(cs.dataDate(state.selectedDay.dataset.date));
        if (day) {
          day.classList.remove(cs.selectedDay);
        }
      }
      state.selectedDay = freeDay;
      state.selectedDay.classList.add(cs.selectedDay);
    };
  }
}

function createElementWithClass(tagName, cl) {
  const element = document.createElement(tagName);
  element.classList.add(cl);
  return element;
}

function createElementDay(day) {
  const elementDay = createElementWithClass(DIV, cs.day);

  if (day.getMonth() !== state.dateOnPage.getMonth()) {
    elementDay.classList.add(cs.dayAnotherMonth);
  } else if (day.getMonth() === CURRENT_DATE.getMonth() && day < CURRENT_DATE) {
    elementDay.classList.add(cs.pastDay);
  } else {
    elementDay.classList.add(cs.freeDay);
  }

  elementDay.dataset.date = day.toLocaleDateString();
  return elementDay;
}

function generateArrayDays(date) {
  const days = [];

  date.setDate(1);
  if (date.getDay() !== 1) {
    date.setDate(2 - (date.getDay() !== 0 ? date.getDay() : 7));
  }

  while (days.length !== (COUNT_CALENDAR_ROWS * COUNT_DAYS_OF_WEEK)) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return days;
}

function fullUpdate() {
  updateMonthTitle();
  updateMonthSwitcher();
  updateDaysOfMonth();
  updateSelectedDay();
}

fullUpdate();
