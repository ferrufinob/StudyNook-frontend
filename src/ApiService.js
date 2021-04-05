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
    const deck_id = document.querySelector("#deck_id").value;
    const front = document.querySelector("#frontInput").value;
    const back = document.querySelector("#backInput").value;

    let configObj = {
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
      body: JSON.stringify(configObj),
    };

    fetch(this.url, configCard)
      .then((res) => res.json())
      .then((card) => {
        if (card.errors) {
          this.displayMessage(card.errors, 2000);
        } else {
          let newCard = new Card({ id: card.data.id, ...card.data.attributes });
          newCard.attachToDom();
          cardForm.reset();
          formContainer.style.display = "none";
        }
      })
      .catch((error) => this.displayMessage(error, 2000));
  };

  deleteCard(id) {
    fetch(`${this.url}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((card) => this.displayMessage(card.message, 2000));
  }

  displayMessage(message, duration) {
    const error = document.createElement("div");
    error.classList.add("error");
    error.innerText = `${message}`;
    addCardDiv.appendChild(error);
    setTimeout(function () {
      error.parentNode.removeChild(error);
    }, duration);
    addCardDiv.appendChild(error);
  }
}
