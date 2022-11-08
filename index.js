generateCalendar = function () {
  generateWeekDays();
  let today = new Date();
  let usedDate = new Date(today.setMonth(today.getMonth() + 1));
  generateMonthDays(usedDate);
};

const PERIODS = [
  { time: "8:00", dose: 1 },
  { time: "16:00", dose: 2 },
  { time: "22:00", dose: 2 },
];
const MONTH_NAMES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
const WEEK_DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
let calendarElement = document.getElementById("calendar");
let monthNameElement = document.getElementById("month-name");

window.onload = function () {
  generateCalendar();
  let body = document.body;
  domtoimage
    .toPng(body)
    .then(function (dataUrl) {
      var img = new Image();
      img.src = dataUrl;
      document.body.appendChild(img);
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
};

getFirstDayOfMonth = function (date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

generatePlaceHolders = function (usedDate) {
  let firstDayOfMonth = getFirstDayOfMonth(usedDate);
  let firstDayOfMonthWeekDay = firstDayOfMonth.getDay();
  for (let i = 0; i < firstDayOfMonthWeekDay; i++) {
    let placeholderElement = document.createElement("div");
    calendarElement.appendChild(placeholderElement);
  }
};

generateMonthDays = function (usedDate) {
  generatePlaceHolders(usedDate);

  let currentMonth = usedDate.getMonth();
  monthNameElement.innerHTML = MONTH_NAMES[currentMonth];
  let currentYear = usedDate.getFullYear();
  let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  for (let i = 0; i < daysInMonth; i++) {
    generateDay(i + 1);
  }
};

generateWeekDays = function () {
  for (let i = 0; i < WEEK_DAYS.length; i++) {
    const day = WEEK_DAYS[i];
    let dayElement = document.createElement("div");
    dayElement.classList.add("week-day");
    dayElement.innerHTML = day;
    calendarElement.appendChild(dayElement);
  }
};

generateDay = function (dayNumber) {
  let dayDiv = document.createElement("div");
  dayDiv.classList.add("calendar-day");
  dayDiv.appendChild(generateDayNumber(dayNumber));

  for (let i = 0; i < PERIODS.length; i++) {
    dayDiv.appendChild(generatePeriod(PERIODS[i]));
  }

  let observationDiv = document.createElement("div");
  observationDiv.classList.add("observation");
  observationDiv.innerHTML = "Obs";
  dayDiv.appendChild(observationDiv);

  calendarElement.appendChild(dayDiv);
};

generateDayNumber = function (dayNumber) {
  let dayNumberDiv = document.createElement("div");
  dayNumberDiv.classList.add("day-number");
  dayNumberDiv.innerHTML = dayNumber;
  return dayNumberDiv;
};

generatePeriod = function (periodData) {
  let periodDiv = document.createElement("div");
  periodDiv.classList.add("period");
  let periodTimeDiv = document.createElement("div");
  periodTimeDiv.classList.add("period-time");
  periodTimeDiv.innerHTML = periodData.time;
  periodDiv.appendChild(periodTimeDiv);
  let periodDoseDiv = document.createElement("div");
  periodDoseDiv.classList.add("period-dose");
  periodDoseDiv.innerHTML = periodData.dose + " gotas";
  periodDiv.appendChild(periodDoseDiv);
  return periodDiv;
};
