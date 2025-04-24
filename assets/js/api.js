const selectInput = document.querySelector(".grid-select-input");
const selectInputSpan = selectInput.querySelector("span");
const selectOptions = document.querySelector(".grid-select-options");
const gridList = document.querySelector(".grid-list");
const scrollSection = document.getElementById("scroll-section");
const modal = document.querySelector("#modal");
const modalIdElem = modal.querySelector("#modalId");
const modalTextElem = modal.querySelector("#modalText");
const modalValueElem = modal.querySelector("#modalValue");
const modalImageElem = modal.querySelector("#modalImage");

let productData = [];
let chosenProduct = null;
let isLoading = false;
let showDialog = false;

// ===Domyślne wartości===
let pageNumber = 1;
let pageSize = 50;
// ===

async function fetchProducts() {
  isLoading = true;
  const api = `https://brandstestowy.smallhost.pl/api/random?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  try {
    const response = await fetch(api);
    const { data } = await response.json();
    productData = data;
    renderGrid(data);
  } catch (err) {
    console.error(err);
  }
  isLoading = false;
}

function renderGrid(items) {
  gridList.innerHTML = "";
  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "grid-item";
    card.textContent = `ID: ${item.id}`;
    card.addEventListener("click", () => openProductModal(item.id));
    gridList.appendChild(card);
  });
}

function setupPageSizeOptions() {
  const sizes = [2, 5, 10, 25, 50];
  sizes.forEach((size) => {
    const btn = document.createElement("button");
    btn.textContent = size;
    btn.addEventListener("click", () => {
      selectInputSpan.textContent = size;
      pageSize = size;
      pageNumber = 1;
      fetchProducts();
      selectOptions.classList.add("hidden");
    });
    selectOptions.appendChild(btn);
  });
}

function togglePageSizeList() {
  selectOptions.classList.toggle("hidden");
}

function onScroll() {
  const { scrollY, innerHeight } = window;
  const { scrollHeight } = document.documentElement;
  if (!isLoading && scrollY + innerHeight > scrollHeight - 200) {
    pageSize += Number(selectInputSpan.textContent);
    fetchProducts();
  }
}

function openProductModal(id) {
  chosenProduct = productData.find((p) => p.id === id);
  if (!chosenProduct) return;
  modalIdElem.textContent = chosenProduct.id || "0";
  modalTextElem.textContent = chosenProduct.text || "Brak nazwy";
  modalValueElem.textContent = chosenProduct.image || "Brak wartości";
  modalImageElem.src = chosenProduct.image || "";
  modalImageElem.alt = "Obraz produktu";
  showDialog = true;
  modal.classList.remove("hidden");
}

function closeModal() {
  showDialog = false;
  modal.classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  setupPageSizeOptions();
  fetchProducts();
  window.addEventListener("scroll", onScroll);
  selectInput.addEventListener("click", togglePageSizeList);
  modal.querySelector(".close-btn").addEventListener("click", closeModal);
});
