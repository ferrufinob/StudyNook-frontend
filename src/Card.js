class Card {
  static all = [];
  constructor({ id, front, back, deck_id }) {
    this.front = front;
    this.back = back;
    this.id = `card-${id}`;
    this.deckId = deck_id;
    // this.testing();
    this.constructor.all.push(this);
  }

  // static getAllCards(id) {
  //   fetch(`http://localhost:3000/api/v1/decks/${id}/cards`)
  //     .then((res) => res.json())
  //     .then((cards) => {
  //       cards.data.map((card) => {
  //         let newCard = new Card({ id: card.id, ...card.attributes });
  //         newCard.testing();
  //       });
  //     });
  // }

  testing() {
    cardContainer.innerHTML += `
    <div deckset=deck-${this.deckId} class="card">
    <h4>${this.front}</h4>
    <h4>${this.back}</h4>
    </div>
    `;
    console.log(this);
    return cardContainer;
  }
}

//deck.id = card.deck_id
