import data from "./data.js";

let startIndex = 0;
let len = 4;
let dataArray = data.slice(startIndex, len);
let counter = 1;

function displayData() {
  const dataContainer = document.getElementById("dataContiner");
  dataContainer.innerHTML = "";
  const mainImage = document.getElementById("main-image");
  const mainText = document.getElementById("main-text");
  const currentPage = document.getElementById("page-number");
  currentPage.innerText = counter;
  // console.log(dataArray);

  // Loop through the dataArray and create HTML elements
  dataArray.forEach((item) => {
    const li = document.createElement("li");

    const img = document.createElement("img");
    img.src = item.previewImage;
    img.classList.add("logo-image");

    const btn = document.createElement("button");
    btn.innerText = item.title;

    // li.innerHTML = `<img src="${item.previewImage}" alt="${item.title}" class="logo-image"> <button>${item.title}</button>`;
    li.classList.add("list-item");
    li.setAttribute("data-image", item.previewImage);
    li.setAttribute("data-text", item.title);
    li.appendChild(img);
    li.appendChild(btn);

    dataContainer.appendChild(li);
  });

  // Add event listeners to buttons
  const items = dataContainer.querySelectorAll(".list-item");
  items.forEach((item) => {
    item.addEventListener("click", () => {
      //removing Clicked Class
      items.forEach((item) => {
        item.classList.remove("Clicked");
      });

      mainImage.src = item.getAttribute("data-image");
      mainText.innerText = item.getAttribute("data-text");
      item.classList.add("Clicked");
    });
  });
}

const buttons = document.querySelectorAll(".navigate button");

buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (index == 1 && startIndex + len < data.length) {
      startIndex += len;
      counter++;
    }
    if (index == 0 && startIndex - len >= 0) {
      startIndex -= len;
      counter--;
    }

    dataArray = data.slice(startIndex, Math.min(startIndex + len, data.length));
    displayData();
  });
});

displayData();
