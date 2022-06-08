import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  daysSpan: document.querySelector('[data-days]'),
  hoursSpan: document.querySelector('[data-hours]'),
  minutesSpan: document.querySelector('[data-minutes]'),
  secondsSpan: document.querySelector('[data-seconds]'),
 };

refs.startBtn.classList.add('startBtn');
refs.startBtn.setAttribute('disabled', true);

let DATE_NOW = Date.now();
let selectedDate = null;
let isTimerOn = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < DATE_NOW) {
      alert('Please choose a date in the future');
    } else {
      refs.startBtn.removeAttribute('disabled');
      selectedDate = selectedDates[0].getTime();
    }
  },
};

flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener('click', startBtnHandler);

function startBtnHandler() { 
  if (isTimerOn === true) {
    return
  } else {
  const intervalId = setInterval(() => {
      DATE_NOW = Date.now();
    const delta = selectedDate - DATE_NOW;
    const timerObj = convertMs(delta);
    if (delta <= 0) {
      return
    } else {
        timerMarkup(timerObj);
    }
  },
    1000
    )
  };
  isTimerOn = true;
  }



function timerMarkup(obj) {
  refs.daysSpan.textContent = pad(obj.days);
  refs.hoursSpan.textContent = pad(obj.hours);
  refs.minutesSpan.textContent = pad(obj.minutes);
  refs.secondsSpan.textContent = pad(obj.seconds);
}

function pad(val) {
    return String(val).padStart(2, '0')
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
