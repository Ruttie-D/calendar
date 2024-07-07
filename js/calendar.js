import { calendarSetup } from "./calendarSetup.js";
import { previousMonth, nextMonth, goToDate } from "./findDates.js"

const calendar = document.querySelector('.calendar');
const thisMonth = document.querySelector('.current-month');
const dayContainer = document.querySelector('.days');
const prev = document.querySelector('.prev-date');
const next = document.querySelector('.next-date');
const dateInput = document.querySelector('.date-input');
const goToBtn = document.querySelector('.goto-btn');
const todayBtn = document.querySelector('.today-btn');

const months =
    ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let today = new Date();
let activeDate;
let currentDay = today.getDate();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

calendarSetup(currentDay, currentMonth, currentYear);

prev.addEventListener('click', previousMonth);
next.addEventListener('click', nextMonth);

dateInput.addEventListener('input', (e) => {
    //allow only numbers
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");

    if (dateInput.value.length === 2 || dateInput.value.length === 5) {
        dateInput.value = dateInput.value.concat('/');
    }

    if (dateInput.value.length > 10) {
        dateInput.value = dateInput.value.slice(0, 10);
    }

    //delete after the slash too, when back space is pressed
    if (e.inputType === "deleteContentBackward") {
        if (dateInput.value.length === 6) {
            dateInput.value = dateInput.value.slice(0, 5);
        }

        if (dateInput.value.length === 3) {
            dateInput.value = dateInput.value.slice(0, 2);
        }
    }
});

dateInput.addEventListener("keydown", function (e) {
    if (e.key === 'Enter') {
        goToDate();
    }
});

goToBtn.addEventListener('click', goToDate);

todayBtn.addEventListener('click', () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
    calendarSetup(day, month, year);
});

export { thisMonth, dayContainer, months, currentDay, currentMonth, currentYear, dateInput };