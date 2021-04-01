"use strict";

const deckContainer = document.querySelector("#deckContainer");
const cardContainer = document.querySelector("#cardContainer");
const deckApi = new ApiService("http://localhost:3000/api/v1/decks");
const cardApi = new ApiService("http://localhost:3000/api/v1/cards");
const cardForm = document.querySelector("#card-form");
const formContainer = document.querySelector(".form-container");
const addCardDiv = document.querySelector(".add-card-div");
const addCardBtn = document.querySelector(".add-card-btn");
const viewDecksBtn = document.querySelector(".view-decks-btn");

deckApi.getAllDecks();
cardApi.getAllCards();
Card.addEventListeners();
