const overlay = root.querySelector(`.${cs.overlay}`);
const btnCloseModal = root.querySelector(`.${cs.btnCloseModal}`);
const btnGtDay = root.querySelector(`.${cs.btnGtDay}`);
const btnLtDay = root.querySelector(`.${cs.btnLtDay}`);
const btnCollapseMorning = root.querySelector(`.${cs.morningTime} .${cs.btnCollapse}`);
const btnCollapseAfternoon = root.querySelector(`.${cs.afternoonTime} .${cs.btnCollapse}`);
const btnCollapseEvening = root.querySelector(`.${cs.eveningTime} .${cs.btnCollapse}`);

const collapseHandler = (btn, container) => {
  container.classList.toggle(cs.hidden);

  const arrow = btn.querySelector(`.${cs.arrow}`);
  arrow.classList.toggle('up');
  arrow.classList.toggle('down');
}

btnCollapseMorning.onclick = () => {
  const morningTimeContainer = root.querySelector(`.${cs.morningTimeContainer}`);
  collapseHandler(btnCollapseMorning, morningTimeContainer);
};

btnCollapseAfternoon.onclick = () => {
  const afternoonTimeContainer = root.querySelector(`.${cs.afternoonTimeContainer}`);
  collapseHandler(btnCollapseAfternoon, afternoonTimeContainer);
};

btnCollapseEvening.onclick = () => {
  const eveningTimeContainer = root.querySelector(`.${cs.eveningTimeContainer}`);
  collapseHandler(btnCollapseEvening, eveningTimeContainer);
};

const openModalWindow = () => {
  body.classList.add(cs.modalOpen);
  overlay.classList.remove(cs.hidden);
  modalUpdate();
};

const closeModalWindow = () => {
  body.classList.remove(cs.modalOpen);
  overlay.classList.add(cs.hidden);

  if (state.selectedTime === undefined) {
    state.setSelectedDay(undefined);
  }
};

overlay.onclick = (event) => {
  if (event.target === event.currentTarget) {
    closeModalWindow();
  }
}

btnCloseModal.onclick = () => {
  closeModalWindow();
};

btnGtDay.onclick = () => {
  const date = new Date(state.selectedDay);
  date.setDate(date.getDate() + 1);

  if (date.getMonth() === state.dateOnPage.getMonth()) {
    state.setSelectedDay(date.toLocaleDateString(LOCALE_DATE));
  } else {
    state.dateOnPage.setMonth(state.dateOnPage.getMonth() + 1);
    state.setSelectedDay(date.toLocaleDateString(LOCALE_DATE));
    calendarUpdate();
  }

  modalUpdate();
};

btnLtDay.onclick = () => {
  const date = new Date(state.selectedDay);
  date.setDate(date.getDate() - 1);

  if (date >= CURRENT_DATE) {
    state.setSelectedDay(date.toLocaleDateString(LOCALE_DATE));
    if (date.getMonth() !== state.dateOnPage.getMonth()) {
      state.dateOnPage.setMonth(state.dateOnPage.getMonth() - 1);
      calendarUpdate();
    }
  }

  modalUpdate();
};

function updateDaySwitcher() {
  if (CURRENT_DATE >= new Date(state.selectedDay)) {
    btnLtDay.disabled = true;
  } else {
    btnLtDay.disabled = false;
  }
}

function updateModalDate() {
  const dayOfWeek = root.querySelector(`.${cs.modalDayOfWeek}`);
  const numberDay = root.querySelector(`.${cs.modalNumberDay}`);
  const monthName = root.querySelector(`.${cs.modalMonthName}`);

  const selectedDate = new Date(state.selectedDay);

  dayOfWeek.innerHTML = DAYS[selectedDate.getDay()];
  numberDay.innerHTML = selectedDate.getDate();
  monthName.innerHTML = MONTHS[selectedDate.getMonth()];
}

function updateModalTimes() {
  const times = root.querySelectorAll(`.${cs.time}`);
  for (const time of times) {
    time.onclick = () => {
      state.setSelectedTime(time.dataset.time);
      closeModalWindow();
    };
  }
}

function modalUpdate() {
  updateModalDate();
  updateDaySwitcher();
  updateModalTimes();
}
