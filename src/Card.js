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

  attachToDom() {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.dataset.id = this.id;
    cardDiv.id = `deck-${this.deckId}`;
    cardDiv.innerHTML = this.renderInnerHTML();
    cardContainer.append(cardDiv);
    cardDiv.addEventListener("click", (e) => {
      if (e.target.classList.contains("flipBtn")) {
        cardDiv.classList.toggle("flipping");
      }
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

  static addEventListeners() {
    backBtn.addEventListener("click", this.backBtn);
    addCardBtn.addEventListener("click", this.cardFormToggler);
    cardForm.addEventListener("submit", (e) => cardApi.createCard(e));
  }

  static backBtn() {
    cardContainer.innerHTML = "";
    cardForm.reset();
    formContainer.style.display = "none";
    addCardDiv.style.display = "none";
    addCardBtn.style.display = "none";
    backBtn.style.display = "none";
    deckContainer.style.display = "flex";
    document.querySelector("#deckId").remove();
  }

  static cardFormToggler = () => {
    let state = formContainer.style.display;
    if (state === "block") {
      formContainer.style.display = "none";
    } else {
      formContainer.style.display = "block";
    }
  };

  static filteredCards = (deck) => {
    let filteredCards = Card.all.filter((card) => {
      parseInt(card.deckId) === deck;
      // console.log(card);
      console.log(deck, card.deckId);
      card.attachToDom();
    });

    // attach to dom only after deck button has been clicked and cards have been filtered.
    // filteredCards.map((card) => card.attachToDom());
  };
}
