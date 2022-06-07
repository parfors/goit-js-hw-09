const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};
let intervalId = null;
// let intervalIndicator = null;
refs.stopBtn.setAttribute('disabled', true);

refs.startBtn.addEventListener('click', startBtnHandler);
refs.stopBtn.addEventListener('click', stopBtnHandler);

function startBtnHandler() {
  intervalId = setInterval(changeBodycolor, 1000);
  refs.startBtn.setAttribute('disabled', true);
  refs.stopBtn.removeAttribute('disabled');

  // intervalIndicator = true;
}

function stopBtnHandler() {
  clearInterval(intervalId);
  refs.startBtn.removeAttribute('disabled');
  refs.stopBtn.setAttribute('disabled', true);

  // intervalIndicator = false;
}

function changeBodycolor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
