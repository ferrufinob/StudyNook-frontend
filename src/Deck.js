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
    deckDiv.addEventListener("click", this.handleClick);
    return deckDiv;
  }

  renderInnerHTML() {
    return `
        <h3>${this.name}</h3>
        <p>${this.cardCount} terms</p>
        `;
  }

  handleClick = () => {
    // deckContainer.style.display = "none";
    console.log("clicked");
    Card.all.filter((card) => {
      if (card.deckId == this.id) {
        card.renderCard();
      }
    });
  };
}
