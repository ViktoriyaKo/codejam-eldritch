import difficulties from "./data/difficulties.js";
import cardsDataBlue from "./assets/mycard/blue.js";
import cardsDataGreen from "./assets/mycard/green.js";
import cardsDataBrown from "./assets/mycard/brown.js";
import ancientsData from "./assets/mycard/ancients.js";

const mixCard = document.querySelector(".mix-card-button");
const chosenCard = document.querySelector(".chosen-card");
const backCard = document.querySelector(".back-card");

//Азарот
const totalGreen =
  ancientsData[0].firstStage.greenCards +
  ancientsData[0].secondStage.greenCards +
  ancientsData[0].thirdStage.greenCards;

const totalBlue =
  ancientsData[0].firstStage.blueCards +
  ancientsData[0].secondStage.blueCards +
  ancientsData[0].thirdStage.blueCards;

const totalBrown =
  ancientsData[0].firstStage.brownCards +
  ancientsData[0].secondStage.brownCards +
  ancientsData[0].thirdStage.brownCards;

//4
const cardfirstStage =
  ancientsData[0].firstStage.greenCards +
  ancientsData[0].firstStage.brownCards +
  ancientsData[0].firstStage.blueCards;
//16 карт для каждого древнего для 3х этапов

//сортировка массивов по цветам для всех карт!!!

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}
// green:
let arrGreen = [];
for (let i = 0; i < cardsDataGreen.length; i++) {
  arrGreen.push(i);
}
//brown:
let arrBrown = [];
for (let i = 0; i < cardsDataBrown.length; i++) {
  arrBrown.push(i);
}
//blue:
let arrBlue = [];
for (let i = 0; i < cardsDataBlue.length; i++) {
  arrBlue.push(i);
}

//Обрезка массива для azathoth:
let shuffleGreen = shuffleArray(arrGreen).slice(0, totalGreen);
let shuffleBrown = shuffleArray(arrBrown).slice(0, totalBrown);
let shuffleBlue = shuffleArray(arrBlue).slice(0, totalBlue);
console.log("Обрезка массива для azathoth");
console.log(shuffleGreen);
// Массив в объект

function getArraytoObjGreen() {
  let arr = [];
  for (let i = 0; i < shuffleGreen.length; i++) {
    arr.push(cardsDataGreen[shuffleGreen[i]].cardFace);
  }
  return arr;
}

function getArraytoObjBlue() {
  let arr = [];
  for (let i = 0; i < shuffleBlue.length; i++) {
    arr.push(cardsDataBlue[shuffleBlue[i]].cardFace);
  }
  return arr;
}

function getArraytoObjBrown() {
  let arr = [];
  for (let i = 0; i < shuffleBrown.length; i++) {
    arr.push(cardsDataBrown[shuffleBrown[i]].cardFace);
  }
  return arr;
}

let objBrown = getArraytoObjBrown();
let objBlue = getArraytoObjBlue();
let objGreen = getArraytoObjGreen();
console.log("Перевод из массива в url");
console.log(objGreen);

let greenFirst = objGreen.slice(0, ancientsData[0].firstStage.greenCards);
let brownFirst = objBrown.slice(0, ancientsData[0].firstStage.brownCards);
let blueFirst = objBlue.slice(0, ancientsData[0].firstStage.blueCards);

let greenSecond = objGreen.slice(
  ancientsData[0].firstStage.greenCards,
  ancientsData[0].secondStage.greenCards + ancientsData[0].firstStage.greenCards
);
let brownSecond = objBrown.slice(
  ancientsData[0].firstStage.brownCards,
  ancientsData[0].secondStage.brownCards + ancientsData[0].firstStage.brownCards
);
let blueSecond = objBlue.slice(
  ancientsData[0].firstStage.blueCards,
  ancientsData[0].secondStage.blueCards + ancientsData[0].firstStage.blueCards
);

let greenThird = objGreen.slice(
  ancientsData[0].secondStage.greenCards +
    ancientsData[0].firstStage.greenCards,
  totalGreen
);
let brownThird = objBrown.slice(
  ancientsData[0].secondStage.brownCards +
    ancientsData[0].firstStage.brownCards,
  totalBrown
);
let blueThird = objBlue.slice(
  ancientsData[0].secondStage.blueCards + ancientsData[0].firstStage.blueCards,
  totalBlue
);
//соединяем неотфильтр массивы поэтапно:
let totalFirst = greenFirst.concat(brownFirst, blueFirst);
let totalSecond = greenSecond.concat(brownSecond, blueSecond);
let totalThird = greenThird.concat(brownThird, blueThird);

//фильтруем поэтапно:
function randomArrayUrl(array) {
  array.sort(() => Math.random() - 0.5);
  console.log(array);
  return array;
}
console.log("сортировка url");
let randomArrayF = randomArrayUrl(totalFirst);
let randomArrayS = randomArrayUrl(totalSecond);
let randomArrayTh = randomArrayUrl(totalThird);

//получаем общий массив url для всех этапов:
let totalArrayUrl = randomArrayF.concat(randomArrayS, randomArrayTh);
console.log("сортированный массив url для трех этапов");
console.log(totalArrayUrl);

let count = -1;
function getGeneralArray() {
  count++;
  if (count < 16) {
    console.log(count);
    chosenCard.style.backgroundImage = totalArrayUrl[count];
  } else {
    chosenCard.style.backgroundImage = "none";
    backCard.style.backgroundImage = "none";
  }
}

function hiddenButton() {
  mixCard.classList.add("hidden");
  document.querySelector(".text-change").textContent = "Возьмите карту:";
}
backCard.addEventListener("click", getGeneralArray);
mixCard.addEventListener("click", hiddenButton);
