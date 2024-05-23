import data from "./data.js";

let startIndex = 0;
let len = 4;
let dataArray = data.slice(startIndex, len);

function displayData() {
  const dataContainer = document.getElementById("dataContiner");
  dataContainer.innerHTML = "";
  const mainImage = document.getElementById("main-image");
  const mainText = document.getElementById("main-text");
  // console.log(dataArray);

  // Loop through the dataArray and create HTML elements
  dataArray.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<img src="${item.previewImage}" alt="${item.title}" class="logo-image"> <button>${item.title}</button>`;
    li.classList.add("list-item");
    li.setAttribute("data-image", item.previewImage);
    li.setAttribute("data-text", item.title);
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

buttons.forEach((button,index) => {
  button.addEventListener("click", () => {
    if(index==1 && startIndex+len<data.length){
      startIndex += len;
    } 
    if(index==0 && startIndex-len>=0){
      startIndex-=len;
    } 

    dataArray = [];
    for (let i = startIndex; i < mini(startIndex + len, data.length); i++) {
      dataArray.push(data[i]);
    }
    displayData();
  });
});

displayData();

function mini(a, b) {
  if (a < b) return a;
  else return b;
}
