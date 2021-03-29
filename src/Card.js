class Card {
  static all = [];
  constructor({ id, front, back, deck_id }) {
    this.front = front;
    this.back = back;
    this.id = `card-${id}`;
    this.deckId = deck_id;
    this.constructor.all.push(this);
  }

  renderCard() {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.dataset.id = this.id;
    cardDiv.innerHTML = this.renderInnerHTML();
    cardContainer.append(cardDiv);
  }

  renderInnerHTML() {
    return `
    <h4>${this.front}</h4>
    <h4>${this.back}</h4>
    `;
  }
}
