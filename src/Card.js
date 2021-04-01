class Card {
  static all = [];
  constructor({ id, front, back, deck_id }) {
    this.front = front;
    this.back = back;
    this.id = id;
    this.card = document.createElement("div");
    this.deck_id = deck_id;
    this.constructor.all.push(this);
  }

  renderCard = () => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.dataset.id = this.id;
    cardDiv.id = `deck-${this.deck_id}`;
    cardDiv.innerHTML = this.renderInnerHTML();
    cardContainer.append(cardDiv);
    cardDiv.addEventListener("click", () => {
      cardDiv.classList.toggle("flipping");
    });
  };

  renderInnerHTML() {
    return `
    <button class="fas fa-times delete-btn" data-id=${this.id} data-action="delete"></button>
    <button class="far fa-edit edit-btn" data-id=${this.id} data-action="edit"></button>
    <div class="card-front">
    <h4>${this.front}</h4>
    </div>
    <div class="card-back">
    <h4>${this.back}</h4>
    </div>
    `;
  }
}
