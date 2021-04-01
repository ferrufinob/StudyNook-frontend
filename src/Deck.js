class Deck {
  static all = [];
  constructor({ id, name, card_count }) {
    this.id = id;
    this.name = name;
    this.card_count = card_count;
    this.deck = this.renderDeck();
    this.deck.addEventListener("click", this.handleClick);
    this.constructor.all.push(this);
  }

  renderDeck = () => {
    const deckDiv = document.createElement("div");
    deckDiv.classList.add("deck");
    deckDiv.dataset.id = `deck-${this.id}`;
    deckDiv.innerHTML = this.renderInnerHTML();
    deckContainer.append(deckDiv);
    return deckDiv;
    // deckDiv.addEventListener("click", this.handleClick);
  };

  renderInnerHTML = () => {
    return `
        <h3>${this.name}</h3>
        <p>${this.card_count} terms</p>
        `;
  };

  handleClick = () => {
    deckContainer.style.display = "none";
    cardContainer.style.display = "flex";
    addCardDiv.style.display = "block";
    addCardBtn.style.display = "inline";
    viewDecksBtn.style.display = "inline";
    let hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.value = this.id;
    hiddenInput.id = "deck_id";
    cardForm.append(hiddenInput);
    this.filteredDeckCards();
  };

  filteredDeckCards = () => {
    const totalCards = this.card_count;
    if (totalCards < 1) {
      cardContainer.innerHTML = `<p>Currently no Cards to Display for ${this.name}</p>`;
    } else {
      let filteredCards = Card.all.filter((card) => card.deck_id == this.id);
      filteredCards.map((card) => card.renderCard());
    }
  };
}
