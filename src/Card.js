"use strict";
class Card {
  static all = [];
  constructor({ id, front, back, deck_id }) {
    this.front = front;
    this.back = back;
    this.id = id;
    // this allows for true toggle functionality
    this.displayForm = false;
    this.deckId = deck_id;
    this.constructor.all.push(this);
  }

  renderCard() {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.dataset.id = this.id;
    cardDiv.id = `deck-${this.deckId}`;
    cardDiv.innerHTML = this.renderInnerHTML();
    cardContainer.append(cardDiv);
    // maybe make this into this.cardDiv
    // will have to attach, edit button, save button, delete, and flip events to this div
    cardDiv.addEventListener("click", (e) => {
      if (e.target.classList.contains("flipBtn"))
        cardDiv.classList.toggle("flipping");
    });
  }

  renderInnerHTML() {
    return `
    <button class="fas fa-times deleteBtn" data-id=${this.id} data-action="delete"></button>
    <button class="far fa-edit editBtn" data-id=${this.id} data-action="edit"></button>
    <div class="cardFront">
    <button class="flipBtn">FLIP</button>
    <h2>${this.front}</h2>
    </div>
    <div class="cardBack">
    <button class="flipBtn">FLIP</button>
    <p>${this.back}</p>
    </div>
    `;
  }

  // Find a better way to handle this, when I add edit and delete functionality
  // would like to make this more readable
  // if someone were to read this what would they imply from it?
  static addEventListeners = () => {
    addCardBtn.addEventListener("click", this.formToggle);
    cardForm.addEventListener("submit", (e) => cardApi.createCard(e));
    viewDecksBtn.addEventListener("click", this.backBtn);
  };

  // doesn't seem like it needs to be a static method
  // doesn't seem to belong in this class
  // look into having a form class that deals with just forms
  static formToggle = () => {
    this.displayForm = !this.displayForm;
    if (this.displayForm) {
      formContainer.style.display = "block";
    } else {
      formContainer.style.display = "none";
    }
  };

  // does this need to be a static method?
  // it doesn't deal with only one deck, it deals with all
  static backBtn = () => {
    cardContainer.innerHTML = "";
    formContainer.style.display = "none";
    addCardDiv.style.display = "none";
    addCardBtn.style.display = "none";
    viewDecksBtn.style.display = "none";
    deckContainer.style.display = "flex";
    // clears hidden input to avoid wrong deck id assignment
    document.querySelector("#deckId").remove();
  };
}
