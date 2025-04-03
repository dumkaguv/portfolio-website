import { Modal } from "./Modal.js";

export class Slider {
  sliderListEl;
  slideElArr;
  paginationButtonElArr;
  position = 0;
  maxPosition;

  constructor(sliderEl) {
    this.sliderListEl = sliderEl.querySelector(".slider__list");
    this.slideElArr = this.sliderListEl.querySelectorAll(".slider__item");
    this.maxPosition = this.slideElArr.length - 1;

    this.slideElArr[0].setAttribute("data-selected", "");

    let paginationButtonListEl = sliderEl.querySelector(
      ".slider__pagination-list"
    );
    let paginationButtonItemEl = sliderEl.querySelector(
      ".slider__pagination-item"
    );

    for (let i = 0; i < this.maxPosition; i++) {
      paginationButtonItemEl = paginationButtonItemEl.cloneNode(true);
      paginationButtonItemEl.children[0].children[0].textContent = `Слайд ${
        i + 1
      }`;
      paginationButtonListEl.appendChild(paginationButtonItemEl);
    }

    this.slideElArr.forEach((slideEl, position) => {
      slideEl.dataset.position = String(position);
    });

    this.paginationButtonElArr = paginationButtonListEl.querySelectorAll(
      ".slider__pagination-button"
    );
    this.paginationButtonElArr[0].setAttribute("data-selected", "");

    this.paginationButtonElArr.forEach((paginationButtonEl, position) => {
      paginationButtonEl.dataset.position = String(position);
    });

    sliderEl.onclick = (e) => {
      let target;

      if (e.target.closest(".slider__item-image")) {
        new Modal(e.target);
      }

      if (e.target.closest(".slider__rotate-left")) {
        this.rotate(false);
      } else if (e.target.closest(".slider__rotate-right")) {
        this.rotate(true);
      } else if (
        (target = e.target.closest(".slider__pagination-button")) ||
        (target = e.target.closest(".slider__item"))
      ) {
        let targetPosition = Number(target.getAttribute("data-position"));

        if (targetPosition !== this.position) {
          this.slide(targetPosition);
        }
      }
    };

    this.sliderListEl.onscrollsnapchanging = (e) => {
      this.slideElArr[this.position].removeAttribute("data-selected");
      this.paginationButtonElArr[this.position].removeAttribute("data-selected");
      this.position = Number(e.snapTargetInline.getAttribute("data-position"));
      this.slideElArr[this.position].setAttribute("data-selected", "");
      this.paginationButtonElArr[this.position].setAttribute("data-selected", "");
    };
  }

  rotate(right = true) {
    let position = this.position + (right ? 1 : -1);

    if (right) {
      if (position > this.maxPosition) {
        position = 0;
      }
    } else {
      if (position < 0) {
        position = this.maxPosition;
      }
    }

    this.slide(position);
  }

  slide(position) {
    let sliderListElLeft = this.sliderListEl.offsetLeft;
    let slideElLeft = this.slideElArr[position].offsetLeft;
    let slideElWidth = this.slideElArr[position].offsetWidth;

    this.sliderListEl.scrollTo({
      left: slideElLeft - sliderListElLeft - slideElWidth / 2,
      behavior: "smooth",
    });
  }
}
