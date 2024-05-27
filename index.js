import data from "./data.js";

const len = 4;
let startIndex = 0;
let dataArray = data.slice(startIndex, len);
const map1 = new Map();

function CreateButton(itemText) {
  const btn = document.createElement("button");
  const totalChars = estimateCharacterCount("dataContiner");

  if (itemText.length < totalChars) {
    btn.innerText = itemText;
  } else {
    const textElement = itemText;
    let availableLength = totalChars - 3;
    let frontText = "";
    const middleText = "...";
    let endText = "";
    let i = 0,
      j = textElement.length - 1;

    while (availableLength - 2 >= 0 && i <= j) {
      frontText += textElement[i];
      endText += textElement[j];
      i++;
      j--;
      availableLength -= 2;
    }

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

function getCharacterDimensions() {
  // Create a temporary span element to measure character size
  const tempSpan = document.createElement("span");
  tempSpan.style.position = "absolute";
  tempSpan.style.whiteSpace = "nowrap";
  tempSpan.style.visibility = "hidden";
  tempSpan.innerText = "A";

  document.body.appendChild(tempSpan);

  const charWidth = tempSpan.offsetWidth;
  const charHeight = tempSpan.offsetHeight;

  document.body.removeChild(tempSpan);

  return { charWidth, charHeight };
}

function estimateCharacterCount(containerId) {
  const container = document.getElementById(containerId);
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const { charWidth, charHeight } = getCharacterDimensions();

  const charsPerLine = Math.floor(containerWidth / charWidth);
  // const lines = Math.floor(containerHeight / charHeight);
  const lines = 1;
  const totalChars = charsPerLine * lines;

  return totalChars;
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
    displayFirstImage(dataArray[0].previewImage, dataArray[0].title);
  });
}

function listenScreenResize() {
  const screen = document.getElementById("main-body");
  console.log("screen element", screen);
  screen.addEventListener("resize", () => {
    console.log("Size Changed");
    displayData();
  });
}

function handleEditContent() {
  const textCotent = document.getElementById("main-text");
  textCotent.addEventListener("input", () => {
    const imgContent = document.getElementById("main-image");
    let idx = Number(imgContent.getAttribute("Index"));
    map1.set(startIndex + idx, textCotent.innerText);
  });
}

function main() {
  //function Calls
  displayData();
  handleButtonClick();
  handlePageChange();
  displayFirstImage(dataArray[0].previewImage, dataArray[0].title);

  listenButtonClick();
  listenScreenResize();
  handleEditContent();
}

main();
