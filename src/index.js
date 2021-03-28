const container = document.querySelector("#container");
const deckApi = new ApiService("http://localhost:3000/api/v1/decks");

deckApi
  .getAllDecks()
  .then((decks) =>
    decks.data.map((deck) => new Deck({ id: deck.id, ...deck.attributes }))
  );

// container.addEventListener("click", (e) => {
//   console.log("clicked");
//   if (e.target.classList.contains("deck")) {
//     container.innerHTML = "";
//     //get all cards belonging to this category
//   }
// });
