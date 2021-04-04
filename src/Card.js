"use strict";
class Card {
  static all = [];
  constructor({ id, front, back, deck_id }) {
    this.front = front;
    this.back = back;
    this.id = id;
    this.deckId = deck_id;
    this.constructor.all.push(this);
  }

  attachToDom() {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.dataset.id = this.id;
    cardDiv.id = `deck-${this.deckId}`;
    cardDiv.innerHTML = this.renderInnerHTML();
    cardContainer.appendChild(cardDiv);
    cardDiv.addEventListener("click", (e) => {
      if (e.target.classList.contains("flipBtn")) {
        cardDiv.classList.toggle("flipping");
      } else if (e.target.classList.contains("deleteBtn")) {
        // cardDiv.classList.add("hidden");
        // cardDiv.removeAttribute(".card");
        // cardContainer.removeChild(cardDiv);
        // cardDiv.parentNode.removeChild(cardDiv);
        console.log(e.target);
        cardApi.deleteCard(this.id);
        e.target.parentElement.remove();
        // cardDiv.classList.add("hidden");
      }
    });
  }

  renderInnerHTML() {
    return `
    <button class="deleteBtn" data-id=${this.id} data-action="delete">delete</button>
    <button class="editBtn" data-id=${this.id} data-action="edit">edit</button>
    <div class="cardFront">
    <button class="flipBtn">FLIP</button>
    <h2>${this.front}</h2>
    </div>
    <div class="cardBack">
    <button class="flipBtn">FLIP</button>
    <p>${this.back}</p>
    </div>
    `;
  }

  static addEventListeners() {
    backBtn.addEventListener("click", this.backBtn);
    addCardBtn.addEventListener("click", this.cardFormToggler);
    cardForm.addEventListener("submit", (e) => cardApi.createCard(e));
  }

  static backBtn() {
    cardForm.reset();
    cardContainer.innerHTML = "";
    cardContainer.style.display = "none";
    document.querySelector("#deck_id").remove();
    formContainer.style.display = "none";
    addCardDiv.style.display = "none";
    addCardBtn.style.display = "none";
    backBtn.style.display = "none";
    deckContainer.style.display = "flex";
  }

  static cardFormToggler = () => {
    let state = formContainer.style.display;
    if (state === "block") {
      formContainer.style.display = "none";
    } else {
      formContainer.style.display = "block";
    }
  };

  static assignDeckToForm(deck) {
    let hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.value = deck;
    hiddenInput.id = "deck_id";
    cardForm.append(hiddenInput);
  }
}
