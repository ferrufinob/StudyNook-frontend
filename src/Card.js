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
    cardDiv.addEventListener("click", (e) => {
      if (e.target.classList.contains("flipBtn"))
        cardDiv.classList.toggle("flipping");
    });
  }

  renderInnerHTML() {
    return `
    <button class="fas fa-times delete-btn" data-id=${this.id} data-action="delete"></button>
    <button class="far fa-edit edit-btn" data-id=${this.id} data-action="edit"></button>
    <div class="card-front">
    <button class="flipBtn">FLIP</button>
    <h2>${this.front}</h2>
    </div>
    <div class="card-back">
    <button class="flip-btn">FLIP</button>
    <p>${this.back}</p>
    </div>
    `;
  }

  // Find a better way to handle this, when I add edit and delete functionality
  static addEventListeners = () => {
    addCardBtn.addEventListener("click", this.formToggle);
    cardForm.addEventListener("submit", (e) => cardApi.createCard(e));
    viewDecksBtn.addEventListener("click", this.backBtn);
  };

  static formToggle = () => {
    this.displayForm = !this.displayForm;
    if (this.displayForm) {
      formContainer.style.display = "block";
    } else {
      formContainer.style.display = "none";
    }
  };

  static backBtn = () => {
    cardContainer.innerHTML = "";
    formContainer.style.display = "none";
    addCardDiv.style.display = "none";
    addCardBtn.style.display = "none";
    viewDecksBtn.style.display = "none";
    deckContainer.style.display = "flex";
    document.querySelector("#deck_id").remove();
  };
}
