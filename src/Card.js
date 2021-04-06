"use strict";
class Card {
  static all = [];
  constructor({ id, front, back, deck_id, deck_name }) {
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
    this.card.addEventListener("click", this.deleteCardHandler);
  }

  renderHTML() {
    this.card.innerHTML = `
    <button class="deleteBtn" data-id="${this.id}">X</button>
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

  static addEventListeners() {
    backBtn.addEventListener("click", this.backBtn);
    addCardBtn.addEventListener("click", this.cardFormToggler);
    cardForm.addEventListener("submit", cardApi.createCard);
  }

  static backBtn() {
    searchContainer.style.display = "block";
    cardForm.reset();
    cardContainer.innerHTML = "";
    document.querySelector("#deck_id").remove();
    formContainer.style.display = "none";
    addCardDiv.style.display = "none";
    addCardBtn.style.display = "none";
    backBtn.style.display = "none";
    deckContainer.style.display = "flex";
  }

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

  deleteCardHandler = (e) => {
    if (e.target.classList.contains("deleteBtn")) {
      this.constructor.all = this.constructor.all.filter(
        (card) => card != this
      );
      this.card.remove();
      cardApi.deleteCard(this.id);
    }
  };
}
