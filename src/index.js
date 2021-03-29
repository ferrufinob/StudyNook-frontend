const deckContainer = document.querySelector("#deckContainer");
const cardContainer = document.querySelector("#cardContainer");
const deckApi = new ApiService("http://localhost:3000/api/v1");
const cardApi = new ApiService("http://localhost:3000/api/v1/cards");

document.addEventListener("DOMContentLoaded", () => {
  deckApi.getAllDecks();
  cardApi.getAllCards();
});
