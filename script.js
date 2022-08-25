import difficulties from "./data/difficulties.js";
import cardsDataBlue from "./assets/mycard/blue.js";
import cardsDataGreen from "./assets/mycard/green.js";
import cardsDataBrown from "./assets/mycard/brown.js";
import ancientsData from "./assets/mycard/ancients.js";

const mixCard = document.querySelector(".mix-card-button");
const chosenCard = document.querySelector(".chosen-card");
const backCard = document.querySelector(".back-card");

//Азарот
function getAzat(value1) {
  let totalGreen =
    ancientsData[value1].firstStage.greenCards +
    ancientsData[value1].secondStage.greenCards +
    ancientsData[value1].thirdStage.greenCards;

  let totalBlue =
    ancientsData[value1].firstStage.blueCards +
    ancientsData[value1].secondStage.blueCards +
    ancientsData[value1].thirdStage.blueCards;

  let totalBrown =
    ancientsData[value1].firstStage.brownCards +
    ancientsData[value1].secondStage.brownCards +
    ancientsData[value1].thirdStage.brownCards;

  let totalAmountCard =
    ancientsData[value1].firstStage.brownCards +
    ancientsData[value1].secondStage.brownCards +
    ancientsData[value1].thirdStage.brownCards +
    ancientsData[value1].firstStage.greenCards +
    ancientsData[value1].secondStage.greenCards +
    ancientsData[value1].thirdStage.greenCards +
    ancientsData[value1].firstStage.blueCards +
    ancientsData[value1].secondStage.blueCards +
    ancientsData[value1].thirdStage.blueCards;

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

  let greenFirst = objGreen.slice(
    0,
    ancientsData[value1].firstStage.greenCards
  );
  let brownFirst = objBrown.slice(
    0,
    ancientsData[value1].firstStage.brownCards
  );
  let blueFirst = objBlue.slice(0, ancientsData[value1].firstStage.blueCards);

  let greenSecond = objGreen.slice(
    ancientsData[value1].firstStage.greenCards,
    ancientsData[value1].secondStage.greenCards +
      ancientsData[value1].firstStage.greenCards
  );
  let brownSecond = objBrown.slice(
    ancientsData[value1].firstStage.brownCards,
    ancientsData[value1].secondStage.brownCards +
      ancientsData[value1].firstStage.brownCards
  );
  let blueSecond = objBlue.slice(
    ancientsData[value1].firstStage.blueCards,
    ancientsData[value1].secondStage.blueCards +
      ancientsData[value1].firstStage.blueCards
  );

  let greenThird = objGreen.slice(
    ancientsData[value1].secondStage.greenCards +
      ancientsData[value1].firstStage.greenCards,
    totalGreen
  );
  let brownThird = objBrown.slice(
    ancientsData[value1].secondStage.brownCards +
      ancientsData[value1].firstStage.brownCards,
    totalBrown
  );
  let blueThird = objBlue.slice(
    ancientsData[value1].secondStage.blueCards +
      ancientsData[value1].firstStage.blueCards,
    totalBlue
  );
  //соединяем неотфильтр массивы URL поэтапно:
  let totalFirst = greenFirst.concat(brownFirst, blueFirst);
  let totalSecond = greenSecond.concat(brownSecond, blueSecond);
  let totalThird = greenThird.concat(brownThird, blueThird);

  //фильтруем поэтапно:
  function randomArrayUrl(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
  }

  let randomArrayF = randomArrayUrl(totalFirst);
  let randomArrayS = randomArrayUrl(totalSecond);
  let randomArrayTh = randomArrayUrl(totalThird);

  //получаем общий массив url для всех этапов:
  let totalArrayUrl = randomArrayF.concat(randomArrayS, randomArrayTh);

  let count = -1;
  function getGeneralArray() {
    count++;
    if (count < totalAmountCard) {
      console.log(count);
      chosenCard.style.backgroundImage = totalArrayUrl[count];
    } else {
      backCard.style.backgroundImage = "none";
    }
  }

  function hiddenButton() {
    mixCard.classList.add("hidden");
    document.querySelector(".text-change").textContent = "Возьмите карту:";
  }
  backCard.addEventListener("click", getGeneralArray);
  mixCard.addEventListener("click", hiddenButton);

  //Трекер:

  let totalFirstCard = //4
    ancientsData[value1].firstStage.greenCards +
    ancientsData[value1].firstStage.blueCards +
    ancientsData[value1].firstStage.brownCards;

  let totalSecondCard = //6
    ancientsData[value1].secondStage.greenCards +
    ancientsData[value1].secondStage.blueCards +
    ancientsData[value1].secondStage.brownCards;

  let totalThirdCard = //6
    ancientsData[value1].thirdStage.greenCards +
    ancientsData[value1].thirdStage.blueCards +
    ancientsData[value1].thirdStage.brownCards;

  document.querySelector(".green1").textContent =
    ancientsData[value1].firstStage.greenCards;
  document.querySelector(".green2").textContent =
    ancientsData[value1].secondStage.greenCards;
  document.querySelector(".green3").textContent =
    ancientsData[value1].thirdStage.greenCards;
  document.querySelector(".blue1").textContent =
    ancientsData[value1].firstStage.blueCards;
  document.querySelector(".blue2").textContent =
    ancientsData[value1].secondStage.blueCards;
  document.querySelector(".blue3").textContent =
    ancientsData[value1].thirdStage.blueCards;
  document.querySelector(".brown1").textContent =
    ancientsData[value1].firstStage.brownCards;
  document.querySelector(".brown2").textContent =
    ancientsData[value1].secondStage.brownCards;
  document.querySelector(".brown3").textContent =
    ancientsData[value1].thirdStage.brownCards;

  function tracker() {
    if (count < totalFirstCard) {
      document.querySelector(".first-stage").classList.add("text-dif-js");
      if (totalArrayUrl[count].includes("brown")) {
        document.querySelector(".brown1").textContent =
          document.querySelector(".brown1").textContent - 1;
      } else if (totalArrayUrl[count].includes("green")) {
        document.querySelector(".green1").textContent =
          document.querySelector(".green1").textContent - 1;
      } else {
        document.querySelector(".blue1").textContent =
          document.querySelector(".blue1").textContent - 1;
      }
    }
    if (count < totalFirstCard + totalSecondCard && count >= totalFirstCard) {
      document.querySelector(".first-stage").classList.remove("text-dif-js");
      document.querySelector(".second-stage").classList.add("text-dif-js");

      if (totalArrayUrl[count].includes("brown")) {
        document.querySelector(".brown2").textContent =
          document.querySelector(".brown2").textContent - 1;
      } else if (totalArrayUrl[count].includes("green")) {
        document.querySelector(".green2").textContent =
          document.querySelector(".green2").textContent - 1;
      } else {
        document.querySelector(".blue2").textContent =
          document.querySelector(".blue2").textContent - 1;
      }
    }
    if (count < totalAmountCard && count >= totalFirstCard + totalSecondCard) {
      document.querySelector(".first-stage").classList.remove("text-dif-js");
      document.querySelector(".second-stage").classList.remove("text-dif-js");
      document.querySelector(".third-stage").classList.add("text-dif-js");
      if (totalArrayUrl[count].includes("brown")) {
        document.querySelector(".brown3").textContent =
          document.querySelector(".brown3").textContent - 1;
      } else if (totalArrayUrl[count].includes("green")) {
        document.querySelector(".green3").textContent =
          document.querySelector(".green3").textContent - 1;
      } else {
        document.querySelector(".blue3").textContent =
          document.querySelector(".blue3").textContent - 1;
      }
    }
  }

  backCard.addEventListener("click", tracker);
}

let card1 = document.querySelector(".card1");
let card2 = document.querySelector(".card2");
let card3 = document.querySelector(".card3");
let card4 = document.querySelector(".card4");
let getAncients1 = getAzat.bind(card1, "0");
let getAncients2 = getAzat.bind(card2, "1");
let getAncients3 = getAzat.bind(card3, "2");
let getAncients4 = getAzat.bind(card4, "3");
card1.onclick = getAncients1;
card2.onclick = getAncients2;
card3.onclick = getAncients3;
card4.onclick = getAncients4;

document
  .querySelector(".ancients-container")
  .addEventListener("click", (element) => {
    if (element.target.closest(".card1")) {
      card2.style.opacity = "0";
      card3.style.opacity = "0";
      card4.style.opacity = "0";
      card1.classList.add("card-active");
    } else if (element.target.closest(".card2")) {
      card1.style.opacity = "0";
      card3.style.opacity = "0";
      card4.style.opacity = "0";
      card2.classList.add("card-active");
    } else if (element.target.closest(".card3")) {
      card1.style.opacity = "0";
      card2.style.opacity = "0";
      card4.style.opacity = "0";
      card3.classList.add("card-active");
    } else if (element.target.closest(".card4")) {
      card1.style.opacity = "0";
      card2.style.opacity = "0";
      card3.style.opacity = "0";
      card4.classList.add("card-active");
    }
  });
