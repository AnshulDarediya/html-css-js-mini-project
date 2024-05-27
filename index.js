import data from "./data.js";

const len = 4;
let startIndex = 0;
let subIndex=0;
let dataArray = data.slice(startIndex, len);
const map1 = new Map();

function CreateButton(itemText) {
  const btn = document.createElement("button");
  const totalChars = estimateCharacterCount("dataContiner");

  if (itemText.length < totalChars) {
    btn.innerText = itemText;
  } else {
    const textElement = itemText;
    let availableLength = totalChars - 5;
    let frontText = "";
    const middleText = " ... ";
    let endText = "";
    let i = 0;
    let j = textElement.length - 1;

    while (availableLength - 2 >= 0 && i <= j) {
      frontText += textElement[i];
      endText += textElement[j];
      i++;
      j--;
      availableLength -= 2;
    }
    endText=endText.split('').reverse().join('');

    btn.innerText = frontText + middleText + endText;
  }
  return btn;
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

    const btn = CreateButton(item.title);
    // li.innerHTML = `<img src="${item.previewImage}" alt="${item.title}" class="logo-image"> <button>${item.title}</button>`;
    li.classList.add("list-item");
    li.setAttribute("data-image", item.previewImage);
    li.setAttribute("data-text", item.title);
    li.appendChild(img);
    li.appendChild(btn);

    dataContainer.appendChild(li);
  });
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
      subIndex=index;
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

function estimateCharacterCount(containerId) {
  const container = document.getElementById(containerId);
  const containerWidth = container.offsetWidth;
  const tempSpan = document.createElement("span");
  tempSpan.innerText = "A";

  document.body.appendChild(tempSpan);
  const charWidth = tempSpan.offsetWidth;
  document.body.removeChild(tempSpan);

  const charsPerLine = Math.floor(containerWidth / charWidth);

  return charsPerLine;
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
    subIndex=0;
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
    subIndex=0;
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

function displaySelected(){
  let selected=document.getElementsByClassName("list-item")[subIndex];
  selected.classList.add("Clicked");
}

function listenEditContent() {
  const textCotent = document.getElementById("main-text");
  textCotent.addEventListener("input", () => {
    const imgContent = document.getElementById("main-image");
    map1.set(startIndex + subIndex, textCotent.innerText);
  });
}

function main() {
  //function Calls
  displayData();
  handleButtonClick();
  handlePageChange();
  displayFirstImage(dataArray[0].previewImage, dataArray[0].title);
  displaySelected();
  
  //Global Listner
  listenButtonClick();
  listenScreenResize();
  listenEditContent();
}

main();
