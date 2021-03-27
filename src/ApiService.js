class ApiService {
  getAllDecks() {
    return fetch(baseURL).then((response) => response.json());
  }
}
