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

const totalCards = totalGreen + totalBlue + totalBrown;

// 2 значения массива blue
function shakeCardBlue() {
  //blue
  let arr = [];
  for (let i = 0; i < totalBlue; i++) {
    let randomBlue = Math.floor(Math.random() * cardsDataBlue.length); // от 0
    arr.push(cardsDataBlue[randomBlue]);
  }
  console.log(arr);
  return arr;
}

// 5 значений массива green
function shakeCardGreen() {
  //green
  let arr = [];
  for (let i = 0; i < totalGreen; i++) {
    let randomGreen = Math.floor(Math.random() * cardsDataGreen.length); // от 0
    arr.push(cardsDataGreen[randomGreen]);
  }
  console.log(arr);
  return arr;
}
// 9 значений массива green
const shakeCardBrown = () => {
  //green
  let arr = [];
  for (let i = 0; i < totalBrown; i++) {
    let randomBrown = Math.floor(Math.random() * cardsDataBrown.length); // от 0
    arr.push(cardsDataBrown[randomBrown]);
  }
  console.log(arr);
  return arr;
};
let shakeCardBrownValue = shakeCardBrown();
let shakeCardGreenValue = shakeCardGreen();
let shakeCardBlueValue = shakeCardBlue();

function hiddenButton() {
  mixCard.classList.add("hidden");
  document.querySelector(".text-change").textContent = "Возьмите карту:";
}

mixCard.addEventListener("click", shakeCardBlue);
mixCard.addEventListener("click", shakeCardGreen);
mixCard.addEventListener("click", shakeCardBrown);
mixCard.addEventListener("click", hiddenButton);

function getFirst() {
  //   green

  // first: shakeCardGreenValue[0] +
  //   shakeCardBlueValue[0] +
  //   shakeCardBrownValue[0] +
  //   shakeCardBrownValue[1];
  // second: shakeCardGreenValue[1] +
  //   shakeCardGreenValue[2] +
  //   shakeCardBlueValue[1] +
  //   shakeCardBrownValue[2] +
  //   shakeCardBrownValue[3] +
  //   shakeCardBrownValue[4];
  // third: shakeCardGreenValue[2] +
  //   shakeCardGreenValue[3] +
  //   shakeCardBrownValue[5] +
  //   shakeCardBrownValue[6] +
  //   shakeCardBrownValue[7] +
  //   shakeCardBrownValue[8];
  let arr = [];
  for (let i = 0; i < ancientsData[0].firstStage.greenCards; i++) {
    arr.push(shakeCardGreenValue[i]);
  }
  let arr2 = [];
  for (let i = 0; i < ancientsData[0].firstStage.blueCards; i++) {
    arr2.push(shakeCardBlueValue[i]);
  }
  let arr3 = [];
  for (let i = 0; i < ancientsData[0].firstStage.brownCards; i++) {
    arr3.push(shakeCardBrownValue[i]);
  }
  let res = arr.concat(arr2, arr3);
  //случайная сортировка!!!
  console.log(res.sort(() => Math.random() - 0.5));
  return res.sort(() => Math.random() - 0.5);
}

function getSecond() {
  //   green
  let arr = [];
  for (let i = 0; i < ancientsData[0].secondStage.greenCards; i++) {
    arr.push(shakeCardGreenValue[i + 1]);
  }
  let arr2 = [];
  for (let i = 0; i < ancientsData[0].secondStage.blueCards; i++) {
    arr2.push(shakeCardBlueValue[i + 1]);
  }
  let arr3 = [];
  for (let i = 0; i < ancientsData[0].secondStage.brownCards; i++) {
    arr3.push(shakeCardBrownValue[i + 2]);
  }
  let res = arr.concat(arr2, arr3);

  //случайная сортировка!!!
  console.log(res.sort(() => Math.random() - 0.5));
  return res.sort(() => Math.random() - 0.5);
}

function getThird() {
  //   green
  let arr = [];
  for (let i = 0; i < ancientsData[0].thirdStage.greenCards; i++) {
    arr.push(shakeCardGreenValue[i + 2]);
  }
  let arr2 = [];
  for (let i = 0; i < ancientsData[0].thirdStage.blueCards; i++) {
    arr2.push(shakeCardBlueValue[i]);
  }
  let arr3 = [];
  for (let i = 0; i < ancientsData[0].thirdStage.brownCards; i++) {
    arr3.push(shakeCardBrownValue[i + 5]);
  }
  let res = arr.concat(arr2, arr3);
  //случайная сортировка!!!
  console.log(res.sort(() => Math.random() - 0.5));
  return res.sort(() => Math.random() - 0.5);
}

document.querySelector(".difficulty-level").addEventListener("click", getThird);
document
  .querySelector(".difficulty-level")
  .addEventListener("click", getSecond);
document.querySelector(".difficulty-level").addEventListener("click", getFirst);

const getFirstValue = getFirst();
const getSecondValue = getSecond();
const getThirdValue = getThird();
function sumArray() {
  console.log(getFirstValue.concat(getSecondValue, getThirdValue));
  return getFirstValue.concat(getSecondValue, getThirdValue);
}
let sumArrayValue = sumArray();
let count = 0;
function countCard() {
  if (count < totalCards) {
    console.log(sumArrayValue[count]);
    console.log(count);
    chosenCard.style.backgroundImage = sumArrayValue[count].cardFace;
    count++;
  } else {
    chosenCard.style.backgroundImage = "none";
    backCard.style.backgroundImage = "none";
  }
}
backCard.addEventListener("click", countCard);
