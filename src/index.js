const baseURL = "http://localhost:3000/api/v1/decks";
const container = document.querySelector("#container");
const api = new ApiService();

api.getAllDecks().then((deckData) => {
  renderDecks(deckData);
});
