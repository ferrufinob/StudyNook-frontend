class ApiService {
  constructor(url) {
    this.url = url;
  }
  getAllDecks() {
    return fetch(`${this.url}`).then((response) => response.json());
  }
}
