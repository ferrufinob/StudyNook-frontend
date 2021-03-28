const container = document.querySelector("#container");
const DeckApi = new ApiService("http://localhost:3000/api/v1/decks");

DeckApi.getAllDecks().then((deckData) => {
  renderDecks(deckData);
});

container.addEventListener("click", (e) => {
  console.log("clicked");
  if (e.target.classList.contains("deck")) {
    container.innerHTML = "";
    //get all cards belonging to this category
  }
});
