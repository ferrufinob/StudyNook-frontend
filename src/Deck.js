"use strict";
class Deck {
  static all = [];
  constructor({ id, name, card_count }) {
    this.id = id;
    this.name = name;
    this.cardCount = card_count;
    this.decks = document.createElement("div");
    this.decks.id = `deck-${this.id}`;
    this.decks.classList.add("deck");
    this.constructor.all.push(this);
  }

  attachToDom() {
    deckContainer.append(this.renderHTML());
    this.decks.addEventListener("click", this.showCards.bind(this));
  }

  renderHTML() {
    this.decks.innerHTML = `
        <h3>${this.name}</h3>
        <p id="count">${this.cardCount}<p>
        `;
    return this.decks;
  }

  cards() {
    return Card.all.filter((card) => card.deck_id == this.id);
  }

  showCards() {
    deckContainer.style.display = "none";
    cardContainer.style.display = "flex";
    addCardDiv.style.display = "block";
    addCardBtn.style.display = "inline";
    backBtn.style.display = "inline";
    Card.addDeckToForm(this.id);
    this.cards().map((card) => {
      card.attachToDom();
    });
  }
}
