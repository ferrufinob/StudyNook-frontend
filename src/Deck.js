class Deck {
  static all = [];
  constructor({ id, name, card_count }) {
    this.id = id;
    this.name = name;
    this.cardCount = card_count;
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
        <p>${this.cardCount} terms</p>
        `;
  }

  // goal: separate filter into its own function
  handleClick = () => {
    console.log("clicked");
    Card.all.filter((card) => {
      if (card.deckId == this.id) {
        cardContainer.innerHTML = "";
        card.renderCard();
      } else if (this.cardCount === 0) {
        cardContainer.innerHTML = `
        <h2>No Cards in this Deck</h2>
        `;
      }
    });
  };
}
