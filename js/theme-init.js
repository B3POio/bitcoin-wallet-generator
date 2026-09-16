"use strict";

(() => {
  try {
    const savedTheme = window.localStorage.getItem("bitcoin-wallet-theme");
    const theme = savedTheme === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
  } catch (error) {
    document.documentElement.dataset.theme = "light";
  }
})();