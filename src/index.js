const container = document.querySelector("#container");
const deckApi = new ApiService("http://localhost:3000/api/v1");
const cardApi = new ApiService("http://localhost:3000/api/v1/decks");

deckApi
  .getAllDecks()
  .then((decks) =>
    decks.data.map((deck) =>
      new Deck({ id: deck.id, ...deck.attributes }).attachToDom()
    )
  );

function getCard(e) {
  const deckId = e.target.dataset.id;
  fetch(`http://localhost:3000/api/v1/decks/${deckId}/cards`)
    .then((response) => response.json())
    .then((cards) => {
      cards.data.map((card) => {
        console.log(card);
        container.innerHTML += `
        <div class="card">
        <h2>Deck: ${card.attributes.deck_name}</h2>
        <h3>${card.attributes.front}</h3>
        <p>${card.attributes.back}</p>
        </div>
        `;
      });
    });
}

container.addEventListener("click", (e) => {
  console.log("clicked");
  // if (e.target.classList.contains("deck")) {
  container.innerHTML = "";
  getCard(e);
  //get all cards belonging to this category
  // }
});
