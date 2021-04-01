"use strict";
class Card {
  static all = [];
  constructor({ id, front, back, deck_id }) {
    this.front = front;
    this.back = back;
    this.id = id;
    // this allows for true toggle functionality
    this.displayForm = false;
    this.deck_id = deck_id;
    this.constructor.all.push(this);
  }

  renderCard() {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.dataset.id = this.id;
    cardDiv.id = `deck-${this.deck_id}`;
    cardDiv.innerHTML = this.renderInnerHTML();
    cardContainer.append(cardDiv);
    cardDiv.addEventListener("click", (e) => {
      if (e.target.classList.contains("flip-btn"))
        cardDiv.classList.toggle("flipping");
    });
  }

  renderInnerHTML() {
    return `
    <button class="fas fa-times delete-btn" data-id=${this.id} data-action="delete"></button>
    <button class="far fa-edit edit-btn" data-id=${this.id} data-action="edit"></button>
    <div class="card-front">
    <button class="flip-btn">FLIP</button>
    <h2>${this.front}</h2>
    </div>
    <div class="card-back">
    <button class="flip-btn">FLIP</button>
    <p>${this.back}</p>
    </div>
    `;
  }

  static addEventListeners() {
    addCardBtn.addEventListener("click", this.formToggle);
    cardForm.addEventListener("submit", (e) => cardApi.createCard(e));
  }

  static formToggle = () => {
    this.displayForm = !this.displayForm;
    if (this.displayForm) {
      formContainer.style.display = "block";
    } else {
      formContainer.style.display = "none";
    }
  };
}
