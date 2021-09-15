"use strict";
class Deck {
  static all = [];
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
    this.decks = document.createElement("div");
    this.decks.id = `deck-${this.id}`;
    this.decks.classList.add("deck");
    this.constructor.all.push(this);
  }

  attachToDom() {
    deckContainer.append(this.renderHTML());
    this.decks.addEventListener("click", this.showCards);
    this.decks.addEventListener("click", this.handleDeckClicks);
  }

  renderHTML() {
    this.decks.innerHTML = `
        <h3>${this.name}</h3>
        <button class="deleteDeckBtn data-id="${this.id}">x</button>
        `;
    return this.decks;
  }

  static addEventListeners = () => {
    deckForm.addEventListener("submit", deckApi.createDeck);
  };

  cards() {
    return Card.all.filter((card) => card.deck_id == this.id);
  }

  showCards = () => {
    this.clearDeckContainer();
    cardContainer.style.display = "flex";
    addCardDiv.style.display = "block";
    addCardBtn.style.display = "inline";
    backBtn.style.display = "inline";
    Card.addDeckToForm(this.id);
    this.cards().map((card) => {
      card.attachToDom();
    });
  };

  clearDeckContainer = () => {
    searchContainer.style.display = "none";
    cardContainer.innerHTML = "";
    deckContainer.style.display = "none";
    deckFormContainer.style.display = "none";
  };

  deleteDeck = () => {
    this.constructor.all = this.constructor.all.filter((deck) => deck != this);
    this.decks.remove();
    deckApi.deleteDeck(this.id);
  };

  handleDeckClicks = (e) => {
    if (e.target.classList.contains("deleteDeckBtn")) {
      this.deleteDeck();
    }
  };
}
