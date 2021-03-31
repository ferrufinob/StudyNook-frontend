class Card {
  static all = [];
  constructor({ id, front, back, deck_id }) {
    this.front = front;
    this.back = back;
    this.id = id;
    this.deck_id = deck_id;
    this.constructor.all.push(this);
  }

  renderCard() {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.dataset.id = this.id;
    cardDiv.id = `deck-${this.deck_id}`;
    cardDiv.innerHTML = this.renderInnerHTML();
    cardContainer.append(cardDiv);
  }

  renderInnerHTML() {
    return `
    <button class="edit-btn" data-id=${this.id} data-action="edit">edit</i></button>
    <button class="delete-btn" data-id=${this.id} data-action="delete">delete</button>
    <h4>${this.front}</h4>
    <h4>${this.back}</h4>
    `;
  }

  // static listen = (e) => {
  //   if (e.target.classList.contains("edit-btn")) {
  //     console.log(e.target);
  //     //add(append) a new edit form to the card
  //     //get the button
  //     //listen for "submit" of the brand new edit form i just made
  //     //grab those input values
  //     // No to full page reload! e.preventDefault()
  //     //fetch request with a patch
  //   } else if (e.target.classList.contains("delete-btn")) {
  //     console.log(e.target);
  //   } else if (e.target.classList.contains("card")) {
  //     // listen for flip event
  //     // remove front text when flipping to back
  //     console.log(e.target);
  //   }
  // };
}
