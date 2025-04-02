const selectInput = document.querySelector(".grid-select-input");
const selectOptions = document.querySelector(".grid-select-options");
let productData = [];
let chooseProductData = {};
let showDialog = false;

async function getData(pageNumber, pageSize) {
  const url = `https://brandstestowy.smallhost.pl/api/random?pageNumber=${pageNumber}&pageSize=${pageSize}`;

  try {
    const response = await fetch(url);

    const data = await response.json();
    console.log("Dane:", data);
    productData = data.data;
    showData(data.data);
  } catch (error) {
    console.error("Błąd:", error);
  }
}
const showData = (items) => {
  const gridList = document.querySelector(".grid-list");
  gridList.innerHTML = "";

  items.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("grid-item");
    div.textContent = `ID: ${item.id}`;
    div.addEventListener("click", () => getItem(item.id));
    gridList.appendChild(div);
  });
};
getData(1, 10);

const openPageList = () => {
  const selectInput = document.querySelector(".grid-select-options");
  const isOpen = selectInput.classList.contains("hidden");

  if (selectInput) selectInput.classList.toggle("hidden", !isOpen);
};
document.addEventListener("DOMContentLoaded", () => {
  const options = [2, 5, 10, 25, 50];

  options.forEach((option) => {
    const button = document.createElement("button");

    button.textContent = option;
    button.addEventListener("click", () => {
      selectInput.textContent = option;
      getData(1, option);
    });
    selectOptions.appendChild(button);
  });
});
const getItem = (id) => {
  chooseProductData = productData.filter((obj) => obj.id === id);
  if (chooseProductData) showModal();
};

const showModal = () => {
  let modalId = document.getElementById("modalId");
  let modalText = document.getElementById("modalText");
  let modalValue = document.getElementById("modalValue");
  let modalImage = document.getElementById("modalImage");

  const data = { ...chooseProductData };
  console.log(data);

  modalId.textContent = data[0].id || "0";
  modalText.textContent = data[0].text || "Brak nazwy";
  modalValue.textContent = data[0].image || "Brak wartości";
  modalImage.src = data[0].image || "";
  modalImage.alt = "Obraz produktu";

  showDialog = true;
  console.log(document.querySelector("#modal"));

  document.querySelector("#modal").classList.remove("hidden");
};

const hideModal = () => {
  showDialog = false;
  document.querySelector("#modal").classList.add("hidden");
};
