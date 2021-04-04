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
        cards.data.map((card) => {
          return new Card({ id: card.id, ...card.attributes });
          // allCards.attachToDom();
        });
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
          // if any errors creating(coming from rails validations)
          this.displayMessage(card.errors, 2000);
        } else {
          let newCard = new Card({ id: card.data.id, ...card.data.attributes });
          newCard.attachToDom();
          cardForm.reset();
          formContainer.style.display = "none";
        }
      })
      //if any errors with the fetch request
      .catch((error) => this.displayMessage(error, 2000));
  };

  deleteCard(id) {
    fetch(`${this.url}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());
  }

  // updateCard = (id, card) => {
  //   fetch(`${this.url}/${id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(card),
  //   }).then((resp) => resp.json());
  // };

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
