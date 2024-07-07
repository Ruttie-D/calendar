import { currentDay, currentMonth, currentYear, dateInput } from "./calendar.js";
import { calendarSetup } from "./calendarSetup.js";

function previousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    calendarSetup(currentDay, currentMonth, currentYear);
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    calendarSetup(currentDay, currentMonth, currentYear);
}

function goToDate() {
    const dateArr = dateInput.value.split("/");

    if (dateArr.length === 3) {
        if (dateArr[0] > 0 && dateArr[0] < 31 &&
            dateArr[1] > 0 && dateArr[1] < 13 &&
            dateArr[2].length === 4) {
            calendarSetup(dateArr[0] - 1, dateArr[1] - 1, dateArr[2]);

            let day = dateArr[0];
            if (day.includes("0")) {
                day = day.split("0").join("");
            }
            const chosenDate = document.querySelector(`[day-id="${day}"]`);

            chosenDate.classList.add("chosen");
            setTimeout(() => {
                chosenDate.classList.remove("chosen");
                dateInput.value = "";
            }, 3000);
            return;
        }
    }
    alert("Invalid Date");
    dateInput.value = "";
}

export { previousMonth, nextMonth, goToDate };