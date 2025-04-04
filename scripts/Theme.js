const THEME_KEY = "user-theme";

export class Theme {
  selectors = {
    root: "[data-js-theme-switcher]",
    slider: "[data-js-theme-switcher-slider]",
    iconSun: "[data-js-theme-switcher-icon-sun]",
    iconMoon: "[data-js-theme-switcher-icon-moon]",
  };

  stateClasses = {
    checked: "checked",
  };

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
    this.sliderElement = this.rootElement.querySelector(this.selectors.slider);
    this.iconSunElement = this.rootElement.querySelector(this.selectors.iconSun);
    this.iconMoonElement = this.rootElement.querySelector(this.selectors.iconMoon);

    this.bindEvents();
    this.init();
  }

  saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
  }

  applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
  };

  getPreferredTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  slideSwitcher = () => {
    this.sliderElement.classList.toggle(this.stateClasses.checked);
    this.rootElement.classList.toggle(this.stateClasses.checked);
  };

  setInitialPositionSlider = () => {
    if (this.getSavedTheme() === "light") {
      this.slideSwitcher();
    }
  };

  onThemeSwitcherKeydown = (event) => {
    if (event.key === "Enter") {
      this.onThemeSwitcherClick();
    }
  };

  onThemeSwitcherClick = (event) => {
    const current = document.documentElement.getAttribute("data-theme");
    const newTheme = current === "dark" ? "light" : "dark";

    this.slideSwitcher();
    this.applyTheme(newTheme);
    this.saveTheme(newTheme);
  };

  bindEvents = () => {
    this.rootElement.addEventListener("click", this.onThemeSwitcherClick);
    this.rootElement.addEventListener("keydown", this.onThemeSwitcherKeydown);
  };

  getSavedTheme = () => {
    const saved = localStorage.getItem(THEME_KEY);
    const theme = saved || this.getPreferredTheme();

    return theme;
  };

  init = () => {
    this.applyTheme(this.getSavedTheme());
    this.setInitialPositionSlider();
  };
}
