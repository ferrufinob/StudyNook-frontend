class ApiService {
  constructor(url) {
    this.url = url;
  }
  getAllDecks() {
    return fetch(`${this.url}/decks`).then((response) => response.json());
  }

  //   getAllCards(deckId, cardId) {
  //     return fetch(`${this.url}/${deckId}/cards/${cardId}`).then((response) =>
  //       response.json()
  //     );
  //   }
}
