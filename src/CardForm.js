"use strict";

class CardForm {
  constructor() {
    this.displayForm = false;
  }

  addEventListeners() {
    addCardBtn.addEventListener("click", () => {
      this.formToggle();
    });
    cardForm.addEventListener("submit", (e) => cardApi.createCard(e));
  }

  formToggle = () => {
    this.displayForm = !this.displayForm;
    if (this.displayForm) {
      formContainer.style.display = "block";
    } else {
      formContainer.style.display = "none";
    }
  };
}
