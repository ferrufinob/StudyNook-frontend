"use strict";
class Deck {
  static all = [];
  constructor({ id, name, card_count }) {
    this.id = id;
    this.name = name;
    this.cardCount = card_count;
    this.constructor.all.push(this);
  }

  attachToDom() {
    const deckDiv = document.createElement("div");
    deckDiv.classList.add("deck");
    deckDiv.dataset.id = `deck-${this.id}`;
    deckDiv.innerHTML = this.renderInnerHTML();
    deckContainer.append(deckDiv);
    deckDiv.addEventListener("click", this.handleClick);
  }

  renderInnerHTML() {
    return `
        <h3>${this.name}</h3>
        <p class="card-count">${this.cardCount} terms</p>
        `;
  }

  handleClick = () => {
    // is there a cleaner and better way to do this?
    deckContainer.style.display = "none";
    cardContainer.style.display = "flex";
    addCardDiv.style.display = "block";
    addCardBtn.style.display = "inline";
    backBtn.style.display = "inline";
    let hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.value = this.id;
    hiddenInput.id = "deckId";
    cardForm.append(hiddenInput);
    this.filteredCards();
  };

  filteredCards = (e) => {
    let filteredCards = Card.all.filter((card) => card.deckId == this.id);
    // attach to dom only after deck button has been clicked and cards have been filtered.
    filteredCards.map((card) => card.attachToDom());
  };
}
