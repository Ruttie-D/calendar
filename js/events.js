import { days, months, eventDay, eventDate, eventDays } from './calendar.js'
import { currentMonthDays } from './calendarSetup.js';
import { previousMonth, nextMonth, currentMonth } from './findDates.js';
// import { prevMonthDays, currentMonthDays, nextMonthDays } from './calendarSetup.js';

class EventDay {
    day;
    month;
    year;
    events = [];

    constructor(day, month, year) {
        this.day = day;
        this.month = month;
        this.year = year;
    }

    isSameDate(day, month, year) {
        return this.day === day && this.month === month && this.year === year;
    }

    addEvent(title, timeStart, timeEnd) {
        const newEvent = { title, timeStart, timeEnd };
        this.events.push(newEvent);
    }
}

function addEventListeners(currentMonth, currentYear, prevMonthDays, currentMonthDays, nextMonthDays) {
    prevMonthDays.forEach(day => {
        day.addEventListener('click', (e) => {
            previousMonth();

            const day = e.target.innerText;
            const month = currentMonth - 1 < 0 ? months[11] : months[currentMonth - 1];
            const year = currentMonth - 1 < 0 ? currentYear - 1 : currentYear;
            const weekday = days[new Date(year, currentMonth - 1, day).getDay()];
            title(weekday, day, month, year);
            activeDisplay(day);
        });
    });

    nextMonthDays.forEach(day => {
        day.addEventListener('click', (e) => {
            nextMonth();

            const month = currentMonth + 1 > 11 ? months[0] : months[currentMonth + 1];
            const year = currentMonth + 1 > 11 ? currentYear + 1 : currentYear;
            e.target.classList.add('active');
            const day = e.target.innerText;

            const weekday = days[new Date(year, currentMonth + 1, day).getDay()];
            title(weekday, day, month, year);
        });
    });

    currentMonthDays.forEach(day => {
        day.addEventListener("click", (e) => {
            currentMonthDays.forEach(d => d.classList.remove('active'));

            e.target.classList.add('active');
            const day = e.target.innerText;
            const month = months[currentMonth];
            const year = currentYear;
            const weekday = days[new Date(year, currentMonth, day).getDay()];
            title(weekday, day, month, year);
        });
    });
}

function title(weekday, day, month, year) {
    eventDay.innerHTML = '';
    eventDate.innerHTML = ``;
    eventDay.innerHTML = weekday;
    eventDate.innerHTML = `${day} &nbsp ${month} &nbsp ${year}`;
}

function activeDisplay(dayToActive) {
    console.log(dayToActive);
    currentMonthDays.forEach(day => {
        if (day?.getAttribute('day-id') === dayToActive) {
            console.log(day?.getAttribute('day-id') === dayToActive);
            day.className += ' active';
            console.log(day, day.classList);
        }
    });
}

function addEventToDay(day, month, year, title, timeStart, timeEnd) {
    let eventDay = eventDays.find(eventDay => eventDay.isSameDate(day, month, year));

    if (!eventDay) {
        eventDay = new EventDay(day, month, year);
        eventDays.push(eventDay);
    }

    eventDay.addEvent(title, timeStart, timeEnd);
    // displayEvents();
}

export {
    EventDay, addEventListeners, title, addEventToDay
};

const eventArr = [
    {
        day: 13,
        month: 11,
        year: 2016,

        events: [
            {
                title: 'birthday party',
                time: "16:00"
            },
            {
                title: 'happy hour',
                time: '20:00'
            }
        ]
    }
]