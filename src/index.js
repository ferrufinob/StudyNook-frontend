"use strict";

const deckContainer = document.querySelector("#deckContainer");
const cardContainer = document.querySelector("#cardContainer");
const deckApi = new ApiService("http://localhost:3000/api/v1/decks");
const cardApi = new ApiService("http://localhost:3000/api/v1/cards");
const cardForm = document.querySelector("#cardForm");
const formContainer = document.querySelector(".formContainer");
const addCardDiv = document.querySelector(".addCardDiv");
const addCardBtn = document.querySelector(".addCardBtn");
const backBtn = document.querySelector(".viewDecksBtn");

deckApi.getAllDecks();
cardApi.getAllCards();
Card.addEventListeners();
