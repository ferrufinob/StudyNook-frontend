"use strict";

const deckContainer = document.querySelector("#deckContainer");
const cardContainer = document.querySelector("#cardContainer");
const deckApi = new ApiService("http://localhost:3000/api/v1/decks");
const cardApi = new ApiService("http://localhost:3000/api/v1/cards");
const cardForm = document.querySelector("#cardForm");
const deckForm = document.querySelector("#deckForm");
const cardFormContainer = document.querySelector(".cardFormContainer");
const deckFormContainer = document.querySelector(".deckFormContainer");
const addCardDiv = document.querySelector(".addCardDiv");
const addCardBtn = document.querySelector(".addCardBtn");
const backBtn = document.querySelector(".viewDecksBtn");
const searchContainer = document.querySelector(".searchBar");

deckApi.getAllDecks();
cardApi.getAllCards();
Deck.addEventListeners();
Card.addEventListeners();

searchContainer.addEventListener("keyup", (e) => {
  const string = e.target.value.toLowerCase();
  if (string) {
    const filteredCards = Card.all.filter((card) => {
      return (
        card.front.toLowerCase().includes(string) ||
        card.back.toLowerCase().includes(string)
      );
    });
    filteredCards.map((card) => {
      card.attachToDom();
    });
  } else {
    cardContainer.innerHTML = "";
  }
});
