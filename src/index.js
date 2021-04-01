// refactor all these variables, too many

const deckContainer = document.querySelector("#deckContainer");
const cardContainer = document.querySelector("#cardContainer");
const deckApi = new ApiService("http://localhost:3000/api/v1/decks");
const cardApi = new ApiService("http://localhost:3000/api/v1/cards");
const cardForm = document.querySelector("#card-form");
const container = document.querySelector(".form-container");
const addCardBtn = document.querySelector(".add-card-btn");
const viewDecksBtn = document.querySelector(".view-decks-btn");
const addCardDiv = document.querySelector(".add-card-div");
//⬇⬇  This is not good practice , refactor and move to form constructor
let addCard = false;

// document.addEventListener("DOMContentLoaded", () => {
deckApi.getAllDecks();
cardApi.getAllCards();
cardForm.addEventListener("submit", cardApi.createCard);
addCardBtn.addEventListener("click", () => {
  addCard = !addCard;
  if (addCard) {
    container.style.display = "block";
  } else {
    container.style.display = "none";
  }
});
// })

cardContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log(e.target);
  if (e.target.id === "card-edit-form") {
    // console.log("click it");
    // Testing: move to class to get actual values
    let frontInput = e.target.querySelector("#edit-card-front").value;
    let backInput = e.target.querySelector("#edit-card-back").value;
    fetch(`http://localhost:3000/api/v1/cards/${e.target.dataset.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        front: frontInput,
        back: backInput,
      }),
    })
      .then((res) => res.json())
      .then((card) => {});
  }
});

cardContainer.addEventListener("click", (e) => {
  if (e.target.dataset.action === "edit") {
    e.target.parentElement.innerHTML = `
    <form data-id="${e.target.dataset.id}" id="card-edit-form">
    <label for="front">Question:</label><br>
    <textarea id="edit-card-front" name="front" value=""></textarea><br>
     <label for="back">Answer:</label><br>
    <textarea id="edit-card-back" name="back" value=""></textarea><br>
    <button class="edit-btn" type="submit">Edit Card</button>
    </form>
    `;
  }
});

// goal: make a form constructor that will deal with the form later
