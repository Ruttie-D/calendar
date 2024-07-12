import { calendarSetup, prevMonthDays, currentMonthDays, nextMonthDays } from "./calendarSetup.js";
import { previousMonth, nextMonth, goToDate, currentMonth, currentYear } from "./findDates.js"
import { EventDay, title, addEventToDay } from "./events.js";

const calendar = document.querySelector('.calendar');
const thisMonth = document.querySelector('.current-month');
const dayContainer = document.querySelector('.days');
const prev = document.querySelector('.prev-date');
const next = document.querySelector('.next-date');
const dateInput = document.querySelector('.date-input');
const goToBtn = document.querySelector('.goto-btn');
const todayBtn = document.querySelector('.today-btn');
const eventDay = document.querySelector('.event-day');
const eventDate = document.querySelector('.event-date');
const calendarPlus = document.querySelector('button.add-event');
const eventContainer = document.querySelector('.add-event-wrapper');
const addEventCloseBtn = document.querySelector('.close');
const eventName = document.querySelector('.event-name');
const eventStart = document.querySelector('.event-start');
const eventEnd = document.querySelector('.event-end');
const addEventBtn = document.querySelector('.add-event-btn');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months =
    ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const eventDays = [];

const today = new Date();

calendarSetup(today.getDate(), today.getMonth(), today.getFullYear());
title(days[today.getDay()], today.getDate(), months[today.getMonth()], today.getFullYear());

prev.addEventListener('click', previousMonth);
next.addEventListener('click', nextMonth);

dateInput.addEventListener('input', (e) => {
    //allow only numbers
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");

    if (dateInput.value.length === 2 || dateInput.value.length === 5) {
        if (dateInput.value.slice(0, 2) < 32 && dateInput.value.slice(3, 5) < 13) {
            dateInput.value = dateInput.value.concat('/');
        }
        else {
            dateInput.value = "";
        }
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

calendarPlus.addEventListener('mouseover', () => {
    calendarPlus.firstElementChild.classList.add('fa-bounce');
});

calendarPlus.addEventListener('mouseout', () => {
    calendarPlus.firstElementChild.classList.remove('fa-bounce');
});

calendarPlus.addEventListener('click', () => {
    eventContainer.classList.add('active');
});

addEventCloseBtn.addEventListener('click', () => {
    eventContainer.classList.remove('active');
});


eventName.addEventListener('keydown', (e) => {
    eventName.value = eventName.value.slice(0, 50);

    if (e.key === 'Enter') {
        e.preventDefault();
        eventStart.focus();
    }
});

eventStart.addEventListener('input', (e) => {

    eventStart.value = eventStart.value.replace(/[^0-9:]/g, "");

    if (eventStart.value.length === 1 && eventStart.value > 2) {
        eventStart.value = '';
    } else if (eventStart.value.length === 2) {
        if (eventStart.value < 24) {
            eventStart.value = eventStart.value.concat(':');
        } else {
            eventStart.value = eventStart.value.slice(0, 1);
        }
    }

    if (eventStart.value.slice(3, 4) > 5) {
        eventStart.value = eventStart.value.slice(0, 3);
    }

    eventStart.value = eventStart.value.slice(0, 5);

    if (e.inputType === "deleteContentBackward") {
        if (eventStart.value.length === 3) {
            eventStart.value = eventStart.value.slice(0, 2);
        }
    }

});

eventStart.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        eventEnd.focus();
    }
});

eventEnd.addEventListener('input', (e) => {

    eventEnd.value = eventEnd.value.replace(/[^0-9:]/g, "");

    if (eventEnd.value.length === 1 && eventEnd.value > 2) {
        eventEnd.value = '';
    } else if (eventEnd.value.length === 2) {
        if (eventEnd.value < 24) {
            eventEnd.value = eventEnd.value.concat(':');
        } else {
            eventEnd.value = eventEnd.value.slice(0, 1);
        }
    }

    if (eventEnd.value.slice(3, 4) > 5) {
        eventEnd.value = eventEnd.value.slice(0, 3);
    }

    eventEnd.value = eventEnd.value.slice(0, 5);

    if (e.inputType === "deleteContentBackward") {
        if (eventEnd.value.length === 3) {
            eventEnd.value = eventEnd.value.slice(0, 2);
        }
    }
});

addEventBtn.addEventListener("click", (e) => {
    // let todaysEvents = new EventDay(day, month + 1, year).addEvent(eventName.value, eventStart.value, eventEnd.value);
});

document.addEventListener('click', (e) => {
    if (e.target !== calendarPlus && !eventContainer.contains(e.target)) {
        eventContainer.classList.remove('active');
    }

    if (!dayContainer.contains(e.target)) {
        currentMonthDays.forEach(day => {
            day.classList.remove('active');
        })
    }
});
export { thisMonth, dayContainer, days, months, dateInput, eventDay, eventDate, calendarPlus, eventContainer, addEventCloseBtn, eventDays };