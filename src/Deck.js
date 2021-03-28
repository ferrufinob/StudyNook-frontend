class Deck {
  static all = [];
  constructor({ id, name, card_count }) {
    this.id = id;
    this.name = name;
    this.cardCount = card_count;
    this.deck = this.createDeck();
    this.deck.addEventListener("click", this.handleClick);
    // console.log(this);
    this.constructor.all.push(this);
  }

  handleClick = (e) => {
    console.log(e.target);
    // when card gets clicked on render all its cards
    // deck.renderCards(e.id)????
  };

  renderInnerHTML() {
    return `
        <h3>${this.name}</h3>
        <p>${this.cardCount} terms</p>
        `;
  }

  createDeck() {
    const deck = document.createElement("div");
    deck.className = "deck";
    deck.dataset.id = this.id;
    deck.innerHTML = this.renderInnerHTML();
    container.append(deck);
    return deck;
  }
}
