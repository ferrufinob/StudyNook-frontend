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

    let cardInfo = {
      front,
      back,
      deck_id,
    };

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(cardInfo),
    };

    fetch(this.url, configObj)
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

  patchCard = (cardId) => {
    const front = document.querySelector(`.update-front-${cardId}`).value;
    const back = document.querySelector(`.update-back-${cardId}`).value;

    let cardObj = {
      front: front,
      back: back,
    };

    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(cardObj),
    };
    fetch(`${this.url}/${cardId}`, configObj)
      .then((resp) => resp.json())
      .then((card) => {
        if (card.errors) {
          this.displayMessage(card.errors, 2000);
        } else {
          let findCard = Card.findById(card.data.id);
          findCard.renderUpdatedCard(card.data.attributes);
          this.displayMessage("Sucessfully Updated Card", 2000);
        }
      })
      .catch((error) => this.displayMessage(error, 2000));
  };

  deleteCard = (id) => {
    fetch(`${this.url}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((card) => this.displayMessage(card.message, 2000));
  };

  displayMessage(message, duration) {
    const msg = document.createElement("div");
    msg.classList.add("msg");
    msg.innerText = `${message}`;
    addCardDiv.appendChild(msg);
    setTimeout(function () {
      msg.parentNode.removeChild(msg);
    }, duration);
  }
}
