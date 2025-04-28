const SELECTORS = {
  root: "[data-js-modal]",
  content: "[data-js-modal-content]",
  close: "[data-js-modal-close]",
  image: "[data-js-modal-image]",
};

let IS_FIRST_INIT = true;

export class Modal {
  stateClasses = {
    open: "open",
  };

  triggers = [...document.querySelectorAll(".slider__item-image")];

  constructor(rootElement) {
    this.rootElement = rootElement;
    this.modalElement = document.querySelector(SELECTORS.root);
    this.modalContentElement = this.modalElement.querySelector(SELECTORS.content);
    this.modalImageElement = this.modalContentElement.querySelector(
      SELECTORS.image
    );
    this.isOpen = false;

    this.bindEvents();
    this.init();
  }

  isOutsideModalContentClick = (event) => {
    return event.target.closest(SELECTORS.content) === null;
  };

  isButtonCloseClick = (event) => {
    return event.target.closest(SELECTORS.close) !== null;
  };

  openModal = () => {
    this.scrollPosition = window.scrollY || document.documentElement.scrollTop;

    document.body.style.position = "fixed";
    document.body.style.top = `-${this.scrollPosition}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";

    this.modalElement.classList.add(this.stateClasses.open);
    this.isOpen = true;
  };

  closeModal = () => {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.overflow = "";

    window.scrollTo({
      top: this.scrollPosition,
      left: 0,
      behavior: "instant",
    });

    this.modalElement.classList.remove(this.stateClasses.open);
    this.isOpen = false;
  };

  setImage = () => {
    this.modalImageElement.src = this.rootElement?.src;
  };

  onModalClick = (event) => {
    const isClickToClose =
      this.isOpen &&
      (this.isOutsideModalContentClick(event) || this.isButtonCloseClick(event));

    if (isClickToClose) {
      this.closeModal();
    } else {
      this.openModal();
    }
  };

  handlePressedKey = (event) => {
    if (
      event.key === "Enter" &&
      event.target.closest(".slider__item-image") &&
      !this.isOpen
    ) {
      this.openModal();
    }

    if (event.key === "Escape" && this.isOpen) {
      this.closeModal();
    }
  };

  bindEvents = () => {
    if (!this.triggers.includes(this.rootElement)) {
      this.rootElement?.addEventListener("click", this.onModalClick);
    }
  };

  init = () => {
    if (window.innerWidth < 950) {
      return;
    }

    if (IS_FIRST_INIT) {
      this.triggers.forEach((trigger) =>
        trigger.addEventListener("click", this.onModalClick)
      );
      this.triggers.forEach((trigger) =>
        trigger.addEventListener("keydown", this.handlePressedKey)
      );
      this.modalElement.addEventListener("click", this.onModalClick);
      document.addEventListener("keydown", this.handlePressedKey);

      IS_FIRST_INIT = false;
    } else {
      this.setImage();
    }
  };
}
