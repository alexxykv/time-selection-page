const DAYS = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
];
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
const CHAR_DASH = '&ndash;';
const COUNT_TIME_ROWS = 10;
const COUNT_TIMES_IN_ROW = 4;
const COUNT_DAYS_OF_WEEK = 7;
const COUNT_CALENDAR_ROWS = 6;
const LOCALE_DATE = 'en-US';
const CURRENT_DATE = new Date(new Date().toLocaleDateString(LOCALE_DATE));

const body = document.querySelector('body');
const root = document.getElementById('root');
const cs = {
  btnGtMonth: 'btn-gt-month',
  btnLtMonth: 'btn-lt-month',
  btnSubmit: 'btn-submit',
  btnCloseModal: 'btn-close-modal',
  btnGtDay: 'btn-gt-day',
  btnLtDay: 'btn-lt-day',
  btnCollapse: 'btn-collapse',
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
  dataDate: date => `[data-date='${date}']`,
  overlay: 'overlay',
  modalOpen: 'modal-open',
  modalDayOfWeek: 'modal-day-of-week',
  modalNumberDay: 'modal-number-day',
  modalMonthName: 'modal-month-name',
  time: 'time',
  selectedTime: 'selected-time',
  cancelSelect: 'cancel-select',
  morningTime: 'morning-time',
  afternoonTime: 'afternoon-time',
  eveningTime: 'evening-time',
  morningTimeContainer: 'morning-time-container',
  afternoonTimeContainer: 'afternoon-time-container',
  eveningTimeContainer: 'evening-time-container',
  arrow: 'arrow',
  hidden: 'hidden',
};

const state = {
  dateOnPage: new Date(CURRENT_DATE),
  selectedDay: undefined,
  setSelectedDay: (value) => {
    state.setSelectedTime(undefined);

    if (state.selectedDay) {
      const day = root.querySelector(cs.dataDate(state.selectedDay));
      if (day) {
        day.classList.remove(cs.selectedDay);

        const time = day.querySelector(`.${cs.selectedTime}`);
        time.innerHTML = '';

        const cancelSelect = day.querySelector(`.${cs.cancelSelect}`);
        cancelSelect.classList.add(cs.hidden);
      }
    }

    const target = root.querySelector(cs.dataDate(value));
    target?.classList.add(cs.selectedDay);

    state.selectedDay = value;
  },
  selectedTime: undefined,
  setSelectedTime: (value) => {
    state.selectedTime = value;

    if (value !== undefined) {
      const selectedDay = root.querySelector(cs.dataDate(state.selectedDay));
      const selectedTime = selectedDay.querySelector(`.${cs.selectedTime}`);
      selectedTime.append(value);

      const cancelSelect = selectedDay.querySelector(`.${cs.cancelSelect}`);
      cancelSelect.classList.remove(cs.hidden);
    }

    updateSubmitButton();
  }
};

const btnSubmit = root.querySelector(`.${cs.btnSubmit}`);

btnSubmit.onclick = () => {
  // fetch(...);
  alert(`Дата: ${new Date(state.selectedDay).toLocaleDateString()} \nВремя: ${state.selectedTime}`);
};

function updateSubmitButton() {
  btnSubmit.disabled = state.selectedDay && state.selectedTime
    ? false
    : true;
}

function createElementWithClass(tagName, cl) {
  const element = document.createElement(tagName);
  element.classList.add(cl);
  return element;
}
