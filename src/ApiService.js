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

  getAllCards(id) {
    fetch(`${this.url}`)
      .then((res) => res.json())
      .then((cards) => {
        cards.data.map((card) => {
          let newCard = new Card({ id: card.id, ...card.attributes });
          newCard.testing();
        });
      });
  }

  // static getAllCards(id) {
  //   fetch(`http://localhost:3000/api/v1/decks/${id}/cards`)
  //     .then((res) => res.json())
  //     .then((cards) => {
  //       cards.data.map((card) => {
  //         let newCard = new Card({ id: card.id, ...card.attributes });
  //         Card.testing(newCard);
  //       });
  //     });
  // }
}
