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
function handleComics(comicsData){
  comicsTitle.textContent = comicsData.title;
  comicsImage.src = comicsData.img;
  comicsImage.alt = comicsData.alt;
  comicsTranscription.textContent = comicsData.transcript;
  comicsDate.textContent = `${comicsData.day}.${comicsData.month}.${comicsData.year}`;
  if(Number(window.location.search.slice(1)) !== comicsData.num) window.location.search = `?${comicsData.num}`;
   disabledButtonsFunc();
 }
 function handleError(err){
   console.log(err);
   disabledButtonsFunc();
 }
getComics(0,(data) =>{
  numberOfLastComics = data.num;
}, handleError);
disabledButtonsFunc();
if(Number(window.location.search.slice(1))) {
  getComics(Number(window.location.search.slice(1)),handleComics, handleError);
}else{
  handleError('Неправильно указан номер комикса!');
}

function disabledButtonsFunc(){
  buttonFirstPosition.toggleAttribute('disabled');
  buttonPrevPosition.toggleAttribute('disabled');
  buttonRandomPosition.toggleAttribute('disabled');
  buttonNextPosition.toggleAttribute('disabled');
  buttonLastPosition.toggleAttribute('disabled');
}


function goToFirstComics(){
  disabledButtonsFunc();
  getComics(1,handleComics, handleError);
}
function goToPrevComics(){
  if(Number(window.location.search.slice(1)) >1) {
    getComics(Number(window.location.search.slice(1)) - 1,handleComics, handleError);
  } else {
    handleError('Вы просматриваете первый комикс!');
  }
  disabledButtonsFunc();
}
function goToRandomComics(){
  getComics(Math.floor((Math.random()*numberOfLastComics) + 1),handleComics, handleError);
  disabledButtonsFunc();
}
function goToNextComics(){
  if(Number(window.location.search.slice(1)) < numberOfLastComics) {
    getComics(Number(window.location.search.slice(1)) + 1,handleComics, handleError);
  } else {
    handleError('Вы просматриваете последний комикс!');
  }
  disabledButtonsFunc();
}
function goToLastComics(){
  disabledButtonsFunc();
  getComics(0,handleComics, handleError);
}
buttonFirstPosition.addEventListener('click', goToFirstComics);
buttonPrevPosition.addEventListener('click', goToPrevComics);
buttonRandomPosition.addEventListener('click', goToRandomComics);
buttonNextPosition.addEventListener('click', goToNextComics);
buttonLastPosition.addEventListener('click', goToLastComics);