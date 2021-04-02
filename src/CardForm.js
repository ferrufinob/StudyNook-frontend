class CardForm {
  constructor() {
    this.displayForm = false;
    this.addEventListeners();
  }

  addEventListeners() {
    addCardBtn.addEventListener("click", this.cardFormToggler);
    cardForm.addEventListener("submit", (e) => cardApi.createCard(e));
  }

  cardFormToggler = () => {
    this.displayForm = !this.displayForm;
    if (this.displayForm) {
      formContainer.style.display = "block";
    } else {
      formContainer.style.display = "none";
    }
  };
}
