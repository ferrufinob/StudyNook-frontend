class Deck {
  static all = [];
  constructor({ id, name, card_count }) {
    this.id = id;
    this.name = name;
    this.card_count = card_count;
    this.renderDeck();
    this.constructor.all.push(this);
  }

  renderDeck() {
    const deckDiv = document.createElement("div");
    deckDiv.classList.add("deck");
    deckDiv.dataset.id = `deck-${this.id}`;
    deckDiv.innerHTML = this.renderInnerHTML();
    deckContainer.append(deckDiv);
    // goal: should i make an separate addEventListener function for this?
    deckDiv.addEventListener("click", this.handleClick);
  }

  renderInnerHTML() {
    return `
        <h3>${this.name}</h3>
        <p>${this.card_count} terms</p>
        `;
  }

  // goal: separate filter into its own function
  handleClick = () => {
    console.log("clicked " + this.name);
    if (this.card_count === 0) {
      cardContainer.innerHTML = `<p>Currently no Cards to Display for ${this.name}</p>`;
    } else {
      cardContainer.innerHTML = "";
      let filteredCards = Card.all.filter((card) => card.deck_id == this.id);
      filteredCards.map((card) => card.renderCard());
    }
  };
}
