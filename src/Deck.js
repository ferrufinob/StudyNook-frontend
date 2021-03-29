class Deck {
  static all = [];
  constructor({ id, name, card_count }) {
    this.id = id;
    this.name = name;
    this.cardCount = card_count;
    this.renderDeck();
    // this.deck.addEventListener("click", this.handleClick);
    this.constructor.all.push(this);
  }

  renderDeck() {
    const deckDiv = document.createElement("div");
    deckDiv.classList.add("deck");
    deckDiv.dataset.id = `deck-${this.id}`;
    deckDiv.dataset.filter = `${this.name}`;
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
    // Card.getAllCards(this.id);
    Card.all.filter((card) => {
      if (card.deckId == this.id) {
        console.log(
          "Card id:" + card.id,
          "Deck:" + card.deckId,
          "This:" + this.id,
          "Card Front:" + card.front
        );
        card.testing();
      }
    });
  };
}
