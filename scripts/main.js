import { HeroTitleAnimator } from "./HeroTitleAnimator.js";
import { Slider } from "./Slider.js";
import { Modal } from "./Modal.js";
import { Theme } from "./Theme.js";

new Theme();

function updateBodyScroll() {
  let scrollTop = documentEl.scrollTop;

  bodyEl.style.setProperty("--backgroundParallax", Number(scrollTop / 2) + "px");

  if (scrollTop > 100) headerEl.classList.add("header--small");
  else headerEl.classList.remove("header--small");
}

async function writeHeroTitleText() {
  await heroTitleAnimator.write(heroTitleTextArr[heroTitleTextNum]);
  await heroTitleAnimator.hide(heroTitleTextArr[heroTitleTextNum]);

  if (++heroTitleTextNum === heroTitleTextArr.length) {
    heroTitleTextNum = 0;
  }
  writeHeroTitleText();
}

function animateHeroNotebookCode() {
  heroNotebookCodeElArr[heroNotebookCodeNum].classList.add("shown");

  setTimeout(() => {
    if (++heroNotebookCodeNum < heroNotebookCodeElArr.length) {
      animateHeroNotebookCode();
    }
  }, 30);
}

const documentEl = document.documentElement;
const bodyEl = document.body;

const headerEl = document.querySelector("[data-js-header]");
const menuOpenButtonEl = document.querySelector("[data-js-menu-open-button]");

const heroTitleEl = document.querySelector("[data-js-hero-title]");
const heroTitleMeasureEl = document.querySelector("[data-js-hero-title-measures]");
const heroTitleTextArr = Array.from(heroTitleMeasureEl.children).map(
  (el) => el.innerText
);
const heroTitleAnimator = new HeroTitleAnimator(heroTitleEl);
let heroTitleTextNum = 0;

const heroNotebookCodeElArr = document.querySelectorAll(".notebook__code");
let heroNotebookCodeNum = 0;

new Slider(bodyEl.querySelector("[data-js-portfolio-slider]"));
new Modal();

bodyEl.onscroll = () => {
  updateBodyScroll();
};

updateBodyScroll();
setTimeout(() => {
  bodyEl.classList.add("loaded");
}, 500);

menuOpenButtonEl.onclick = () => {
  headerEl.classList.toggle("open");
  menuOpenButtonEl.classList.toggle("open");
};

headerEl.onscroll = () => {
  headerEl.scrollTop = 0;
};

headerEl.onclick = (e) => {
  if (e.target.closest("a")) headerEl.classList.remove("open");
};

setTimeout(writeHeroTitleText, 1500);
setTimeout(() => {
  heroTitleTextArr.shift();
  heroTitleTextNum--;
}, 1550);
setTimeout(animateHeroNotebookCode, 3200);
