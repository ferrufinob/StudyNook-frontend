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
      .then((cards) =>
        cards.data.map((card) => new Card({ id: card.id, ...card.attributes }))
      );
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
          // if any errors creating(coming from validations)
          this.messageHandler(card.errors, 2000);
        } else {
          let newCard = new Card({ id: card.data.id, ...card.data.attributes });
          newCard.attachToDom();
          cardForm.reset();
          formContainer.style.display = "none";
        }
      })
      //if any errors with the fetch request
      .catch((error) => alert(error));
  };

  deleteCard(id) {
    fetch(`${this.url}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((card) => this.messageHandler(card.message, 2000));
  }
  updateCard = (id, card) => {
    fetch(`${this.url}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card),
    }).then((resp) => resp.json());
  };
  // can use this with create, update and delete
  messageHandler(message, duration) {
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
