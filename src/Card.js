"use strict";
class Card {
  static all = [];
  constructor({ id, front, back, deck_id }) {
    this.front = front;
    this.back = back;
    this.id = id;
    this.deck_id = deck_id;
    this.cards = document.createElement("div");
    this.cards.classList.add("card");
    this.cards.id = `deck-${this.deck_id}`;
    this.constructor.all.push(this);
  }

  attachToDom() {
    cardContainer.append(this.renderHTML());

    this.cards.addEventListener("click", (e) => {
      if (e.target.classList.contains("flipBtn")) {
        this.cards.classList.toggle("flipping");
      }
    });
  }

  renderHTML() {
    this.cards.insertAdjacentHTML(
      "beforeend",
      `
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
    `
    );
    return this.cards;
  }

  static addEventListeners() {
    backBtn.addEventListener("click", this.backBtn);
    addCardBtn.addEventListener("click", this.cardFormToggler);
    cardForm.addEventListener("submit", (e) => cardApi.createCard(e));
  }

  static backBtn() {
    cardForm.reset();
    cardContainer.innerHTML = "";
    cardContainer.style.display = "none";
    document.querySelector("#deck_id").remove();
    formContainer.style.display = "none";
    addCardDiv.style.display = "none";
    addCardBtn.style.display = "none";
    backBtn.style.display = "none";
    deckContainer.style.display = "flex";
  }

  static cardFormToggler = () => {
    let state = formContainer.style.display;
    if (state === "block") {
      formContainer.style.display = "none";
    } else {
      formContainer.style.display = "block";
    }
  };

  static addDeckToForm(deck) {
    let hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.value = deck;
    hiddenInput.id = "deck_id";
    cardForm.append(hiddenInput);
  }
}
