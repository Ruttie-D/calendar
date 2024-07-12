import { thisMonth, dayContainer, days, months, eventDay, eventDate } from "./calendar.js";
import { addEventListeners } from "./events.js";

let prevMonthDays = [];
let currentMonthDays = [];
let nextMonthDays = [];

function calendarSetup(currentDay, currentMonth, currentYear) {
    //reset
    dayContainer.innerHTML = '';
    prevMonthDays.length = 0;
    currentMonthDays.length = 0;
    nextMonthDays.length = 0;

    // days of the previous month
    const prevLastDay = new Date(currentYear, currentMonth, 0);
    const lastDateOfTheMonth = prevLastDay.getDate();
    const lastWeekDayOfTheMonth = prevLastDay.getDay();

    //first day of the current month
    const firstDay = new Date(currentYear, currentMonth, 1);
    // const day = firstDay.getDate();

    //last day of the current month
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const lastDate = lastDay.getDate();
    const lastWeekDay = lastDay.getDay();

    //number of days of next month
    const numberOfNextDays = 6 - lastWeekDay;
    /*     console.log(`
            current day: ${currentDay}; current month ${currentMonth}; current year ${currentYear};
            days of the current month: ${lastDate};
            the last date of the month ${lastDay}; the day of the week ${lastWeekDay + 1}
            `); */

    thisMonth.innerHTML = `${months[currentMonth]} &nbsp&nbsp ${currentYear}`;

    //setting the days of the previous month
    if (lastWeekDayOfTheMonth !== 6) {
        for (let i = lastWeekDayOfTheMonth; i >= 0; i--) {
            const setDay = document.createElement("div");
            setDay.classList.add('day', 'prev-date');
            setDay.textContent = lastDateOfTheMonth - i;
            dayContainer.appendChild(setDay);
            prevMonthDays.push(setDay);
        }
    }

    //setting the days of the current month
    for (let i = 1; i <= lastDate; i++) {

        //check for events on current day

        const setDay = document.createElement("div");
        setDay.classList.add('day');
        setDay.setAttribute('day-id', i)
        setDay.textContent = i;

        // today
        const todayDate = new Date();
        if (i === todayDate.getDate() && currentMonth === todayDate.getMonth() && currentYear === todayDate.getFullYear()) {
            setDay.classList.add('day', 'today');
        }

        dayContainer.appendChild(setDay);
        currentMonthDays.push(setDay);
    }

    //setting the days of the next month
    for (let i = 1; i <= numberOfNextDays; i++) {
        const setDay = document.createElement("div");
        setDay.classList.add('day', 'next-date');
        setDay.textContent = i;
        dayContainer.appendChild(setDay);
        nextMonthDays.push(setDay);
    }
    addEventListeners(currentMonth, currentYear, prevMonthDays, currentMonthDays, nextMonthDays);
}

export { calendarSetup, prevMonthDays, currentMonthDays, nextMonthDays };