import './styles/index.css';
import getComics from './script/api.js';
const page = document.querySelector(".page");
const comicsTitle = page.querySelector(".comics__title");
const comicsImage = page.querySelector(".comics__image");
const comicsTranscription = page.querySelector(".comics__transcription");
const comicsDate = page.querySelector(".comics__date")
const buttonFirstPosition = page.querySelector(".navigation__button_position_first");
const buttonPrevPosition = page.querySelector(".navigation__button_position_prev");
const buttonRandomPosition = page.querySelector(".navigation__button_position_random");
const buttonNextPosition = page.querySelector(".navigation__button_position_next");
const buttonLastPosition = page.querySelector(".navigation__button_position_last");
let numberOfLastComics;

//--------Функция обработки данных, полученных от api---------------
function handleComics(comicsData) {
  comicsTitle.textContent = comicsData.title;
  comicsImage.src = comicsData.img;
  comicsImage.alt = comicsData.alt;
  comicsTranscription.textContent = comicsData.transcript;
  comicsDate.textContent = `${comicsData.day}.${comicsData.month}.${comicsData.year}`;
  if (Number(window.location.search.slice(1)) !== comicsData.num) window.location.search = `?${comicsData.num}`;
  disabledButtonsFunc();
}

//--------Функция обработки ошибок---------------
function handleError(err) {
  comicsTitle.textContent = err;
  comicsImage.src = '';
  comicsImage.alt = '';
  comicsTranscription.textContent = '';
  comicsDate.textContent = '';
  disabledButtonsFunc();
}

//--------Определение максимального колличества комиксов---------------
getComics(0, (data) => {
  numberOfLastComics = data.num;
}, handleError);
//--------Отключение кнопок меню перед загрузкой---------------
disabledButtonsFunc();
//--------Загрузка комикса по параметру url---------------
if (Number(window.location.search.slice(1))) {
  getComics(Number(window.location.search.slice(1)), handleComics, handleError);
} else if (!window.location.search) {
  getComics(0, handleComics, handleError);
} else {
  handleError('Неправильно указан номер комикса!');
}

//--------Функция включения/выключения кнопок---------------
function disabledButtonsFunc() {
  buttonFirstPosition.toggleAttribute('disabled');
  buttonPrevPosition.toggleAttribute('disabled');
  buttonRandomPosition.toggleAttribute('disabled');
  buttonNextPosition.toggleAttribute('disabled');
  buttonLastPosition.toggleAttribute('disabled');
}

//--------Функция обработки нажатия на кнопку "Первый"---------------
function goToFirstComics() {
  disabledButtonsFunc();
  getComics(1, handleComics, handleError);
}

//--------Функция обработки нажатия на кнопку "Предыдущий"---------------
function goToPrevComics() {
  if (Number(window.location.search.slice(1)) > 1) {
    getComics(Number(window.location.search.slice(1)) - 1, handleComics, handleError);
  } else {
    handleError('Вы просматриваете первый комикс!');
  }
  disabledButtonsFunc();
}

//--------Функция обработки нажатия на кнопку "Случайный"---------------
function goToRandomComics() {
  getComics(Math.floor((Math.random() * numberOfLastComics) + 1), handleComics, handleError);
  disabledButtonsFunc();
}

//--------Функция обработки нажатия на кнопку "Следующий"---------------
function goToNextComics() {
  if (Number(window.location.search.slice(1)) < numberOfLastComics) {
    getComics(Number(window.location.search.slice(1)) + 1, handleComics, handleError);
  } else {
    handleError('Вы просматриваете последний комикс!');
  }
  disabledButtonsFunc();
}
//--------Функция обработки нажатия на кнопку "Последний"---------------
function goToLastComics() {
  disabledButtonsFunc();
  getComics(0, handleComics, handleError);
}

//--------Включение слушателей---------------
buttonFirstPosition.addEventListener('click', goToFirstComics);
buttonPrevPosition.addEventListener('click', goToPrevComics);
buttonRandomPosition.addEventListener('click', goToRandomComics);
buttonNextPosition.addEventListener('click', goToNextComics);
buttonLastPosition.addEventListener('click', goToLastComics);