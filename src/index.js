const baseURL = "http://localhost:3000/api/v1/decks";
const container = document.querySelector("#container");
const api = new ApiService();

function renderDecks(decks) {
  decks.data.map((deck) => {
    container.insertAdjacentHTML(
      "beforeend",
      `
        <div class="deck" data-id=${deck.id}><h3>${deck.attributes.name}</h3></div>
        `
    );
  });
}

api.getAllDecks().then((deckData) => {
  renderDecks(deckData);
});
