class Deck {
  static all = [];
  constructor({ id, name, card_count }) {
    this.id = id;
    this.name = name;
    this.cardCount = card_count;
    this.constructor.all.push(this);
  }

  attachToDom() {
    container.innerHTML += `
        <div class="deck" data-id=${this.id}>
        <h3>${this.name}</h3>
        <p>${this.cardCount} terms</p>
        </div>
        `;
  }
}
