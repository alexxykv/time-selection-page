const btnGtMonth = root.querySelector(`.${cs.btnGtMonth}`);
const btnLtMonth = root.querySelector(`.${cs.btnLtMonth}`);

btnGtMonth.onclick = () => {
  state.dateOnPage.setMonth(state.dateOnPage.getMonth() + 1);
  calendarUpdate();
};

btnLtMonth.onclick = () => {
  state.dateOnPage.setMonth(state.dateOnPage.getMonth() - 1);
  calendarUpdate();
};

function updateMonthSwitcher() {
  btnLtMonth.disabled = CURRENT_DATE >= state.dateOnPage
    ? true
    : false;
}

function updateSelectedDay() {
  const day = root.querySelector(cs.dataDate(state.selectedDay));
  day?.classList.add(cs.selectedDay);

  if (state.selectedTime) {
    const time = day?.querySelector(`.${cs.selectedTime}`);
    time?.append(state.selectedTime);

    const cancelSelect = day?.querySelector(`.${cs.cancelSelect}`);
    cancelSelect?.classList.remove(cs.hidden);
  }
}

function updateMonthTitle() {
  const monthName = root.querySelector(`.${cs.monthName}`);
  monthName.innerHTML = MONTHS[state.dateOnPage.getMonth()];

  const monthYear = root.querySelector(`.${cs.monthYear}`);
  monthYear.innerHTML = state.dateOnPage.getFullYear();
}

function updateDaysOfMonth() {
  const days = generateArrayDays(new Date(state.dateOnPage));

  const container = root.querySelector(`.${cs.daysOfMonth}`);
  container.innerHTML = EMPTY;

  for (let i = 0; i < COUNT_CALENDAR_ROWS; i++) {
    const elementRow = createElementWithClass(DIV, cs.daysRow(i + 1));
    for (let j = 0; j < COUNT_DAYS_OF_WEEK; j++) {
      const day = days[i * COUNT_DAYS_OF_WEEK + j];
      const elementDay = createElementDay(day);
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
      if (!freeDay.classList.contains(cs.selectedDay)) {
        state.setSelectedDay(freeDay.dataset.date);
        openModalWindow();
      }
    };
  }
}

function createElementDay(day) {
  const elementDay = createElementWithClass(DIV, cs.day);
  elementDay.dataset.date = day.toLocaleDateString(LOCALE_DATE);

  if (day.getMonth() !== state.dateOnPage.getMonth()) {
    elementDay.classList.add(cs.dayAnotherMonth);
  } else if (day.getMonth() === CURRENT_DATE.getMonth() && day < CURRENT_DATE) {
    elementDay.classList.add(cs.pastDay);
  } else {
    elementDay.classList.add(cs.freeDay);
  }

  const elementNumberDay = createElementWithClass(DIV, cs.numberDay);
  elementNumberDay.append(day.getDate());
  elementDay.append(elementNumberDay);

  const elementSelectedTime = createElementWithClass(DIV, cs.selectedTime);
  elementDay.append(elementSelectedTime);

  const elementCancelSelect = createElementCancelSelect();
  elementDay.append(elementCancelSelect);

  return elementDay;
}

function createElementCancelSelect() {
  const elementCancelSelect = createElementWithClass(DIV, cs.cancelSelect);
  elementCancelSelect.classList.add(cs.hidden);
  elementCancelSelect.innerHTML = CHAR_DASH;

  elementCancelSelect.onclick = (event) => {
    event.stopPropagation();
    state.setSelectedDay(undefined);
  }

  return elementCancelSelect;
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

function calendarUpdate() {
  updateMonthTitle();
  updateMonthSwitcher();
  updateDaysOfMonth();
  updateSelectedDay();
}

calendarUpdate();