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
    this.card.dataset.id = `deck-${this.deck_id}`;
    this.constructor.all.push(this);
  }

  attachToDom() {
    cardContainer.append(this.renderHTML());
    this.cardEventListeners();
  }

  renderHTML() {
    this.card.innerHTML = `
    <button class="deleteBtn" data-id=${this.id} data-action="delete">delete</button>
    <button class="editBtn" data-id=${this.id} data-action="edit">edit</button>
    <div class="cardFront">
    <button class="flipBtn">FLIP</button>
    <h2>${this.front}</h2>
    </div>
    <div class="cardBack">
    <button class="flipBtn">FLIP</button>
    <p>${this.back}</p>
    </div>
    `;
    return this.card;
  }

  cardEventListeners() {
    this.card.addEventListener("click", this.deleteCardHandler.bind(this));
  }

  static addTogglerEventListeners() {
    backBtn.addEventListener("click", this.backBtn);
    addCardBtn.addEventListener("click", this.cardFormToggler);
  }

  static backBtn() {
    cardForm.reset();
    cardContainer.style.display = "none";
    document.querySelector("#deck_id").remove();
    formContainer.style.display = "none";
    addCardDiv.style.display = "none";
    addCardBtn.style.display = "none";
    backBtn.style.display = "none";
    deckContainer.style.display = "flex";
  }

  static cardFormToggler() {
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

  // make this click handler if i do edit
  deleteCardHandler(e) {
    if (e.target.classList.contains("deleteBtn")) {
      cardApi.deleteCard(this.id);
      this.removeCardFromAll(this);
      this.card.remove();
    }
  }

  removeCardFromAll(card) {
    //find the card element in DOM
    const index = this.constructor.all.indexOf(card);
    //check whether or not the value is in the cards array
    if (index !== -1) {
      //if it's there remove it
      this.constructor.all.splice(index, 1);
    }
    return false;
  }
}
