"use strict";
class ApiService {
  constructor(url) {
    this.url = url;
  }
  getAllDecks = () => {
    fetch(this.url)
      .then((res) => res.json())
      .then((decks) => {
        decks.data.map((deck) => {
          const allDecks = new Deck({ id: deck.id, ...deck.attributes });
          allDecks.attachToDom();
        });
      });
  };

  getAllCards = () => {
    fetch(this.url)
      .then((res) => res.json())
      .then((cards) => {
        cards.data.map((card) => new Card({ id: card.id, ...card.attributes }));
      });
  };

  createCard = (e) => {
    e.preventDefault();

    // does this belong here or can I put it in its own form class
    const deck_id = document.querySelector("#deckId").value;
    const front = document.querySelector("#frontInput").value;
    const back = document.querySelector("#backInput").value;

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
        if (card.errors) {
          alert(card.errors);
        } else {
          // might be cleaner to move this into form class method
          let newCard = new Card({ id: card.data.id, ...card.data.attributes });
          newCard.attachToDom();
          cardForm.reset();
          formContainer.style.display = "none";
        }
      })
      .catch((error) => alert(error));
  };
}
