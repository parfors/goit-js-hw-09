import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};
refs.form.addEventListener('submit', submitHeandler);
let position = 1;

function submitHeandler(e) {
  e.preventDefault();
  const { delay, step, amount } = e.target.elements;
  
  setTimeout(() => {
    for (let i = 0; i < amount.value; i += 1) {
      let promiseDelay = +delay.value + +step.value * i;
    createPromise(position, promiseDelay).then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    }
  }
    , delay.value);
}

function createPromise(position, delay) {
  const promise = new Promise ((resolve, rejected) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
            if (shouldResolve) {
              resolve({ position, delay })
              console.log(position);
    } else {
              rejected({ position, delay })
              console.log(position);
    }
  }, delay);
})
  position += 1;
  return promise
}

// let promiseCounter = 0;

// function submitHeandler(e) {
//   e.preventDefault();
//   const { delay, step } = e.target.elements;
//   createPromiseWithDelayAndStep(delay.value, step.value);
// }

// function createPromiseWithDelayAndStep(delay, step) {
//   const timeOutId = setTimeout(interval(step), delay);
// }

// function interval(step) {
//   const intervalId = setInterval(() => {
//     console.log(createPromise());
//     if (promiseCounter === Number(refs.form.amount.value)) {
//       clearInterval(intervalId);
//       promiseCounter = 0;
//     }
//   }, step);
// }

// function createPromise() {
//   promiseCounter += 1;
//   return new Promise((resolve, reject) => {
//     const shouldResolve = Math.random() > 0.3;
//     if (shouldResolve) {
//       resolve(`${shouldResolve}, Promise is resolved`);
//     } else {
//       reject(`${shouldResolve}, Promise is regected`);
//     }
//   });
// }
