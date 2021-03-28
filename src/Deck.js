class Deck {
  static all = [];
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
    this.renderDeck();
    this.constructor.all.push(this);
  }

  renderDeck() {
    container.innerHTML += `
        <div class="deck" data-id=${this.id}><h3>${this.name}</h3></div>
        `;
  }
}
