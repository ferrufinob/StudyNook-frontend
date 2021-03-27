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
