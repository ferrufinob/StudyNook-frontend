class ApiService {
  constructor(url) {
    this.url = url;
  }
  getAllDecks = () => {
    fetch(`${this.url}/decks`)
      .then((res) => res.json())
      .then((decks) => {
        decks.data.map((deck) => new Deck({ id: deck.id, ...deck.attributes }));
      });
  };

  getAllCards = (id) => {
    fetch(`${this.url}`)
      .then((res) => res.json())
      .then((cards) => {
        cards.data.map((card) => new Card({ id: card.id, ...card.attributes }));
      });
  };
}
