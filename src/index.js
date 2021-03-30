const deckContainer = document.querySelector("#deckContainer");
const cardContainer = document.querySelector("#cardContainer");
const deckApi = new ApiService("http://localhost:3000/api/v1");
const cardApi = new ApiService("http://localhost:3000/api/v1/cards");
const cardForm = document.querySelector(".form-container");
const addCardBtn = document.querySelector(".add-card-btn");
//⬇⬇  This is not good practice , refactor and move to form constructor
let addCard = false;

document.addEventListener("DOMContentLoaded", () => {
  deckApi.getAllDecks();
  cardApi.getAllCards();
  addCardBtn.addEventListener("click", () => {
    addCard = !addCard;
    if (addCard) {
      cardForm.style.display = "block";
    } else {
      cardForm.style.display = "none";
    }
  });
});

// goal: make a form constructor that will deal with the form later
