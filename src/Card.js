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
    this.card.id = `card-${this.id}`;
    this.card.dataset.id = this.id;
    this.constructor.all.push(this);
  }

  static findById(id) {
    return Card.all.find((card) => card.id == id);
  }

  attachToDom() {
    cardContainer.append(this.renderHTML());
    this.card.addEventListener("click", this.handleCardClicks);
  }

  renderHTML() {
    this.card.innerHTML = "";
    this.card.insertAdjacentHTML(
      "beforeend",
      `
    <button class="deleteBtn" data-id="${this.id}">DELETE</button>
    <button class="editBtn" data-id="${this.id}">EDIT</button>
    <div class="cardFront">
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
    formContainer.style.display = "none";
    addCardDiv.style.display = "none";
    addCardBtn.style.display = "none";
    backBtn.style.display = "none";
  };

  static cardFormToggler(e) {
    let state = formContainer.style.display;

    if (state === "block") {
      formContainer.style.display = "none";
    } else {
      formContainer.style.display = "block";
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
    } else if (e.target.innerText === "EDIT") {
      this.createEditFields(e.target);
    } else if (e.target.innerText === "SAVE") {
      const cardId = e.target.dataset.id;
      cardApi.patchCard(cardId);
    }
  };

  createEditFields = (editBtn) => {
    const card = editBtn.parentElement;
    const front = card.querySelector(".cardFront h2").innerText;
    const back = card.querySelector(".cardBack p").innerText;
    this.card.innerHTML = `
    <div class="update-form">
    <label for="front">Question</label>
    <textarea name="front" class="update-front-${this.id}" value="${front}">${front}</textarea>
    <label for="back">Answer</label>
    <textarea name="back" class="update-back-${this.id}" value="${back}">${back}</textarea>
    <button class="saveBtn" data-id="${this.id}">SAVE</button>
    </div>
    `;
  };

  renderUpdatedCard = ({ front, back }) => {
    this.front = front;
    this.back = back;
    this.renderHTML();
  };
}
