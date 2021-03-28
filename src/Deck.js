class Deck {
  static all = [];
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
    this.constructor.all.push(this);
  }

  attachToDom() {
    container.innerHTML += `
        <div class="deck" data-id=${this.id}><h3>${this.name}</h3></div>
        `;
  }
}
