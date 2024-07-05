import { calendarSetup } from "./calendarSetup.js";

const calendar = document.querySelector('.calendar');
const thisMonth = document.querySelector('.current-month');
const dayContainer = document.querySelector('.days');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');


calendarSetup();



export { calendar, thisMonth, dayContainer, prev, next }