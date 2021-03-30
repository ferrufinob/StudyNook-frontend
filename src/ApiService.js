class ApiService {
  constructor(url) {
    this.url = url;
  }
  getAllDecks = () => {
    fetch(this.url)
      .then((res) => res.json())
      .then((decks) => {
        decks.data.map((deck) => new Deck({ id: deck.id, ...deck.attributes }));
      });
  };

  getAllCards = (id) => {
    fetch(this.url)
      .then((res) => res.json())
      .then((cards) => {
        cards.data.map((card) => new Card({ id: card.id, ...card.attributes }));
      });
  };

  createCard = (e) => {
    e.preventDefault();
    const deck_id = document.querySelector("#deck").value;
    const front = document.querySelector("#front").value;
    const back = document.querySelector("#back").value;

    let newCardObj = {
      front,
      back,
      deck_id,
    };

    let configCard = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newCardObj),
    };

    fetch(this.url, configCard)
      .then((res) => res.json())
      .then((card) => {
        let newCard = new Card(card.data.attributes);
        newCard.renderCard();
      });
    cardForm.reset();
  };
}
