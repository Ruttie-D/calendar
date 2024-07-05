import { calendar, thisMonth, dayContainer, prev, next } from "./calendar.js";


const months =
    ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let today = new Date();
let activeDate;
let currentDay = today.getDate();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

function calendarSetup() {
    // days of the previous month
    const prevLastDay = new Date(currentYear, currentMonth, 0);
    const prevDays = prevLastDay.getDate();

    //first day of the current month
    const firstDay = new Date(currentYear, currentMonth, 1);
    const day = firstDay.getDate();

    //days of the next month
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const lastDate = lastDay.getDate();

    //number of days remaining after the last day of the current month
    const numberOfNextDays = 6 - lastDay.getDay();

    thisMonth.innerHTML = `${months[currentMonth]} ${currentYear}`;

    //setting the days of the previous month
    const setDay = document.createElement("div");
    for (let i = day; i > 0; i--) {
        setDay.classList.add('day', 'prev-date');
        setDay.textContent = prevDays - i + 1;
        dayContainer.appendChild(setDay);
    }

    //setting the days of the current month
    for (let i = 1; i <= lastDate; i++) {
        const setDay = document.createElement("div");
        setDay.classList.add('day');
        setDay.textContent = i;

        // today
        if (i === currentDay) {
            setDay.classList.add('day', 'today');
        }

        dayContainer.appendChild(setDay);
    }

    //setting the days of the next month
    for (let i = 1; i <= numberOfNextDays; i++) {
        const setDay = document.createElement("div");
        setDay.classList.add('day', 'next-date');
        setDay.textContent = i;
        dayContainer.appendChild(setDay);
    }
}

export { calendarSetup }