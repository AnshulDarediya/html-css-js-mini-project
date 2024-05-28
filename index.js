import data from "./data.js";

const len = 4;
let startIndex = 0;
let subIndex = 0;
let dataArray = data.slice(startIndex, len);
const map1 = new Map();

function elipsify() {
  const btns = document.querySelectorAll("#btn-text");
  btns.forEach((btn) => {
    btn.innerText = estimateFinalText(btn.innerText);
  });
}

function estimateFinalText(buttonText) {

  const container = document.getElementById("btn-text");
  let containerWidth = container.offsetWidth - 60;
  let requriedWidth = 0;

  for (let k = 0; k < buttonText.length; k++) {
    let ch = buttonText[k];
    requriedWidth += characterWidth(ch);
  }

  let finalText;
  if (requriedWidth < containerWidth) {
    finalText = buttonText;
  } else {
    let startText = "";
    let endText = "";
    let middleText = " ... ";
    let currentWidth = 0;
    currentWidth += 2 * characterWidth(" ");
    currentWidth += 3 * characterWidth(".");
    let i = 0;
    let j = buttonText.length - 1;
    while (currentWidth < containerWidth && i < j) {
      let ch1 = buttonText[i];
      let ch2 = buttonText[j];
      currentWidth += characterWidth(ch1);
      currentWidth += characterWidth(ch2);
      startText += buttonText[i];
      endText += buttonText[j];
      i++;
      j--;
    }
    endText = endText.split("").reverse().join("");
    finalText = startText + middleText + endText;
  }

  return finalText;
}

function characterWidth(ch) {
  const tempSpan = document.createElement("span");
  tempSpan.innerText = ch;
  document.body.appendChild(tempSpan);
  const charWidth = tempSpan.offsetWidth;
  document.body.removeChild(tempSpan);
  return charWidth;
}

function displayData() {
  const dataContainer = document.getElementById("dataContiner");
  dataContainer.innerHTML = "";

  // Loop through the dataArray and create HTML elements
  dataArray.forEach((item) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = item.previewImage;
    img.classList.add("logo-image");

    li.classList.add("list-item");
    li.setAttribute("data-image", item.previewImage);
    li.setAttribute("data-text", item.title);
    li.appendChild(img);
    const btn = document.createElement("button");
    btn.innerText = item.title;
    btn.setAttribute("id", "btn-text");
    li.appendChild(btn);
    dataContainer.appendChild(li);
  });
  elipsify();
}

function displayFirstImage(source, text) {
  const mainImage = document.getElementById("main-image");
  const mainText = document.getElementById("main-text");
  mainImage.src = source;
  mainText.innerText = text;
}

function handleButtonClick() {
  const mainImage = document.getElementById("main-image");
  const mainText = document.getElementById("main-text");
  const currentPage = document.getElementById("page-number");
  const dataContainer = document.getElementById("dataContiner");

  currentPage.innerText = startIndex / len + 1;

  // Add event listeners to buttons
  const items = dataContainer.querySelectorAll(".list-item");
  items.forEach((item, index) => {
    item.addEventListener("click", () => {
      //removing Clicked Class
      items.forEach((item) => {
        item.classList.remove("Clicked");
      });

      mainImage.src = item.getAttribute("data-image");
      mainText.innerText = item.getAttribute("data-text");

      if (map1.has(startIndex + index)) {
        mainText.innerText = map1.get(startIndex + index);
      }
      item.classList.add("Clicked");
      subIndex = index;
    });
  });
}

function handlePageChange() {
  if (startIndex - len >= 0) {
    document.getElementById("pagination-button-left").style.visibility =
      "visible";
  } else {
    document.getElementById("pagination-button-left").style.visibility =
      "hidden";
  }

  if (startIndex + len < data.length) {
    document.getElementById("pagination-button-right").style.visibility =
      "visible";
  } else {
    document.getElementById("pagination-button-right").style.visibility =
      "hidden";
  }
}

function listenButtonClick() {
  const leftButton = document.getElementById("pagination-button-left");
  const rightButton = document.getElementById("pagination-button-right");

  leftButton.addEventListener("click", () => {
    startIndex -= len;
    dataArray = data.slice(startIndex, Math.min(startIndex + len, data.length));

    handlePageChange();
    displayData();
    handleButtonClick();

    let mainTitle = dataArray[0].title;
    if (map1.has(startIndex)) mainTitle = map1.get(startIndex);
    subIndex = 0;
    displaySelected();
    displayFirstImage(dataArray[0].previewImage, mainTitle);
  });

  rightButton.addEventListener("click", () => {
    startIndex += len;
    dataArray = data.slice(startIndex, Math.min(startIndex + len, data.length));
    handlePageChange();
    displayData();
    handleButtonClick();
    let mainTitle = dataArray[0].title;
    if (map1.has(startIndex)) mainTitle = map1.get(startIndex);
    subIndex = 0;
    displaySelected();
    displayFirstImage(dataArray[0].previewImage, dataArray[0].title);
  });
}

function listenScreenResize() {
  window.addEventListener("resize", () => {
    displayData();
    handleButtonClick();
    displaySelected();
  });
}

function displaySelected() {
  let selected = document.getElementsByClassName("list-item")[subIndex];
  selected.classList.add("Clicked");
}

function listenEditContent() {
  const textCotent = document.getElementById("main-text");
  textCotent.addEventListener("input", () => {
    const imgContent = document.getElementById("main-image");
    map1.set(startIndex + subIndex, textCotent.innerText);
  });
}

function fetchAndRun() {
  displayData();
  handleButtonClick();
  handlePageChange();
  displaySelected();
  displayFirstImage(dataArray[0].previewImage, dataArray[0].title);

  //Global Listner
  listenButtonClick();
  listenScreenResize();
  listenEditContent();
}

function main() {
  //function Calls
  
  let promise = new Promise(function (resolve, reject) {
    setTimeout(() => {
      let num=Math.random();
      // console.log(num);
      if(num<=0.5) resolve("Done");
      else reject("404");
    }, 3000);
  });

  promise
  .then(() => fetchAndRun())
  .catch((err) => alert(`Error due to ${err}`));
}


main();
