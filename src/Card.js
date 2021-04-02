"use strict";
class Card {
  static all = [];
  constructor({ id, front, back, deck_id }) {
    this.front = front;
    this.back = back;
    this.id = id;
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

  // handleSubmit
  // create & update(pass an id from function living in CardForm)

  // handleClick
  //card flip
  // delete
  //edit button(doesn't need it, it will onyl display form when clicked on)
  // cancel button if they don't want to edit card anymore
}
