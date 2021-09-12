"use strict";
class Card {
  static all = [];
  constructor({ id, front, back, deck_id }) {
    this.front = front;
    this.back = back;
    this.id = id;
    this.deck_id = deck_id;
    this.card = document.createElement("div");
    this.card.classList.add("card");
    this.card.dataset.id = this.id;
    this.constructor.all.push(this);
  }

  static findById(id) {
    return Card.all.find((card) => card.id == id);
  }

  attachToDom() {
    cardContainer.append(this.renderHTML());
    this.card.addEventListener("click", this.handleCardClicks);
    this.card.addEventListener("submit", this.submitEditForm);
  }

  renderHTML() {
    this.card.innerHTML = "";
    this.card.insertAdjacentHTML(
      "beforeend",
      `
    <button class="deleteBtn fas fa-times" data-id="${this.id}"></button>
    <button class="editBtn fas fa-edit" data-id="${this.id}"></button>
    <div id="deck-${this.deck_id}" class="cardFront">
    <button class="flipBtn">FLIP</button>
    <h2>${this.front}</h2>
    </div>
    <div class="cardBack">
    <button class="flipBtn">FLIP</button>
    <p>${this.back}</p>
    </div>
    `
    );
    return this.card;
  }

  static addEventListeners() {
    backBtn.addEventListener("click", this.backBtn);
    addCardBtn.addEventListener("click", this.cardFormToggler);
    cardForm.addEventListener("submit", cardApi.createCard);
  }

  static backBtn = () => {
    this.clearCardContainer();
    searchContainer.style.display = "inline";
    deckContainer.style.display = "flex";
  };

  static clearCardContainer = () => {
    cardForm.reset();
    cardContainer.innerHTML = "";
    document.querySelector("#deck_id").remove();
    cardFormContainer.style.display = "none";
    addCardDiv.style.display = "none";
    addCardBtn.style.display = "none";
    backBtn.style.display = "none";
  };

  static cardFormToggler() {
    let state = cardFormContainer.style.display;

    if (state === "block") {
      cardFormContainer.style.display = "none";
    } else {
      cardFormContainer.style.display = "block";
    }
  }

  static addDeckToForm(deck) {
    let hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.value = deck;
    hiddenInput.id = "deck_id";
    cardForm.append(hiddenInput);
  }

  deleteCard = () => {
    this.constructor.all = this.constructor.all.filter((card) => card != this);
    this.card.remove();
    cardApi.deleteCard(this.id);
  };

  handleCardClicks = (e) => {
    if (e.target.classList.contains("deleteBtn")) {
      this.deleteCard();
    } else if (e.target.classList.contains("flipBtn")) {
      this.card.classList.toggle("flipping");
    } else if (e.target.classList.contains("editBtn")) {
      this.createEditFields(e.target);
    }
  };

  createEditFields = (editBtn) => {
    const card = editBtn.closest(".card");
    const front = card.querySelector(".cardFront h2").innerText;
    const back = card.querySelector(".cardBack p").innerText;
    this.card.innerHTML = `
    <form class="update-form" data-id="${this.id}">
    <label for="front">Question</label>
    <textarea name="front" class="update-front-${this.id}" value="${front}">${front}</textarea>
    <label for="back">Answer</label>
    <textarea name="back" class="update-back-${this.id}" value="${back}">${back}</textarea>
    <input type="submit" name="submit" value="SAVE" class="saveBtn" data-id="${this.id}">
    <form>
    `;
  };

  renderUpdatedCard = ({ front, back }) => {
    this.front = front;
    this.back = back;
    this.renderHTML();
  };

  submitEditForm = (e) => {
    e.preventDefault();
    const cardId = e.target.dataset.id;
    cardApi.patchCard(cardId);
  };
}
