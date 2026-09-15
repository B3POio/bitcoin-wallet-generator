"use strict";

import { Buffer } from "buffer";
import * as bitcoin from "bitcoinjs-lib";
import * as bip39 from "bip39";
import BIP32Factory from "bip32";
import * as ecc from "@bitcoin-js/tiny-secp256k1-asmjs";
import {
  initializeLanguage,
  translate
} from "./i18n.js";

globalThis.Buffer = Buffer;

const bip32 = BIP32Factory(ecc);

const REGTEST_NETWORK = Object.freeze({
  messagePrefix: "\x18Bitcoin Signed Message:\n",
  bech32: "bcrt",
  bip32: Object.freeze({
    public: 0x043587cf,
    private: 0x04358394
  }),
  pubKeyHash: 0x6f,
  scriptHash: 0xc4,
  wif: 0xef
});

const WalletApp = (() => {
  const CONFIG = {
    networks: {
      mainnet: {
        id: "mainnet",
        translationKey: "bitcoin",
        label: "Bitcoin",
        name: "Bitcoin Mainnet",
        badge: "MAINNET",
        coinType: 0,
        icon: "network-icon-mainnet",
        network: bitcoin.networks.bitcoin
      },
      testnet: {
        id: "testnet",
        translationKey: "testnet",
        label: "Testnet",
        name: "Bitcoin Testnet",
        badge: "TESTNET",
        coinType: 1,
        icon: "network-icon-testnet",
        network: bitcoin.networks.testnet
      },
      signet: {
        id: "signet",
        translationKey: "signet",
        label: "Signet",
        name: "Bitcoin Signet",
        badge: "SIGNET",
        coinType: 1,
        icon: "network-icon-signet",
        network: bitcoin.networks.testnet
      },
      regtest: {
        id: "regtest",
        translationKey: "regtest",
        label: "Regtest",
        name: "Bitcoin Regtest",
        badge: "REGTEST",
        coinType: 1,
        icon: "network-icon-regtest",
        network: REGTEST_NETWORK
      }
    },
    entropy: {
      12: 128,
      24: 256
    }
  };

  const state = {
    wallet: null,
    mnemonicVisible: true,
    activeNetwork: "mainnet",
    securityStatusKey: "checkingSecurity"
  };

  const elements = {};

  const THEME_STORAGE_KEY = "bitcoin-wallet-theme";
  const THEMES = new Set(["light", "dark"]);

  function init() {
    cacheElements();
    initializeLanguage();
    initThemeSelector();
    initNetworkSelector();
    bindEvents();
    checkBrowserSecurity();
    loadVersionInfo();
  }

  function cacheElements() {
    elements.securityStatus = document.getElementById("securityStatus");
    elements.securityStatusText =
      document.getElementById("securityStatusText");
    elements.offlineWarning =
      document.getElementById("offlineWarning");
    elements.network = document.getElementById("network");
    elements.wordCount = document.getElementById("wordCount");
    elements.generateButton =
      document.getElementById("generateButton");
    elements.walletCard =
      document.getElementById("walletCard");
    elements.networkBadge =
      document.getElementById("networkBadge");
    elements.mnemonicGrid =
      document.getElementById("mnemonicGrid");
    elements.toggleMnemonicButton =
      document.getElementById("toggleMnemonicButton");
    elements.copyMnemonicButton =
      document.getElementById("copyMnemonicButton");
    elements.address = document.getElementById("address");
    elements.copyAddressButton =
      document.getElementById("copyAddressButton");
    elements.derivationPath =
      document.getElementById("derivationPath");
    elements.fingerprint =
      document.getElementById("fingerprint");
    elements.xpub = document.getElementById("xpub");
    elements.printButton =
      document.getElementById("printButton");
    elements.destroyButton =
      document.getElementById("destroyButton");
    elements.verificationCard =
      document.getElementById("verificationCard");
    elements.themeToggle =
      document.getElementById("themeToggle");
    elements.networkToggle =
      document.getElementById("networkToggle");
    elements.networkDropdown =
      document.getElementById("networkDropdown");
    elements.networkLabel =
      document.getElementById("networkLabel");
    elements.networkIcon =
      document.getElementById("networkIcon");
    elements.networkOptions = Array.from(
      document.querySelectorAll(".network-option")
    );
  }

  function bindEvents() {
    elements.generateButton.addEventListener(
      "click",
      generateWallet
    );

    elements.toggleMnemonicButton.addEventListener(
      "click",
      toggleMnemonicVisibility
    );

    elements.copyMnemonicButton.addEventListener(
      "click",
      copyMnemonic
    );

    elements.copyAddressButton.addEventListener(
      "click",
      copyAddress
    );

    elements.printButton.addEventListener(
      "click",
      printBackup
    );

    elements.destroyButton.addEventListener(
      "click",
      destroyWallet
    );

    elements.network.addEventListener("change", () => {
      setNetwork(elements.network.value);
    });

    window.addEventListener(
      "language-changed",
      () => {
        updateNetworkUI();
        updateThemeToggleLabel();
        updateDynamicLabels();
      }
    );
  }

  function updateDynamicLabels() {
    if (!state.wallet) {
      elements.generateButton.textContent =
        translate("generateWallet");
    }

    elements.toggleMnemonicButton.textContent =
      state.mnemonicVisible
        ? translate("hidePhrase")
        : translate("revealPhrase");

    elements.securityStatusText.textContent =
      translate(state.securityStatusKey);
  }

  function readSavedTheme() {
    try {
      const savedTheme =
        window.localStorage.getItem(
          THEME_STORAGE_KEY
        );

      return THEMES.has(savedTheme)
        ? savedTheme
        : null;
    } catch (error) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      window.localStorage.setItem(
        THEME_STORAGE_KEY,
        theme
      );
    } catch (error) {
      // Theme selection still works when storage is unavailable.
    }
  }

  function applyTheme(theme, persist = false) {
    const resolvedTheme = THEMES.has(theme)
      ? theme
      : "light";

    document.documentElement.dataset.theme =
      resolvedTheme;

    document.documentElement.style.colorScheme =
      resolvedTheme;

    updateThemeToggleLabel();

    if (persist) {
      saveTheme(resolvedTheme);
    }

    window.dispatchEvent(
      new CustomEvent("theme-changed", {
        detail: {
          theme: resolvedTheme
        }
      })
    );
  }

  function updateThemeToggleLabel() {
    if (!elements.themeToggle) {
      return;
    }

    const translationKey =
      document.documentElement.dataset.theme ===
      "dark"
        ? "switchToLight"
        : "switchToDark";

    const label = translate(translationKey);

    elements.themeToggle.setAttribute(
      "aria-label",
      label
    );

    elements.themeToggle.setAttribute(
      "title",
      label
    );

    elements.themeToggle.dataset.i18nAriaLabel =
      translationKey;

    elements.themeToggle.dataset.i18nTitle =
      translationKey;
  }

  function initThemeSelector() {
    const initialTheme =
      readSavedTheme() ||
      document.documentElement.dataset.theme ||
      "light";

    applyTheme(initialTheme);

    elements.themeToggle?.addEventListener(
      "click",
      () => {
        const nextTheme =
          document.documentElement.dataset.theme ===
          "dark"
            ? "light"
            : "dark";

        applyTheme(nextTheme, true);
      }
    );
  }

  function getNetworkConfig(networkId) {
    return CONFIG.networks[networkId] || null;
  }

  function getActiveNetwork() {
    return getNetworkConfig(
      state.activeNetwork
    );
  }

  function closeNetworkSelector({
    restoreFocus = false
  } = {}) {
    if (
      !elements.networkDropdown ||
      !elements.networkToggle
    ) {
      return;
    }

    elements.networkDropdown.hidden = true;

    elements.networkToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    if (restoreFocus) {
      elements.networkToggle.focus();
    }
  }

  function openNetworkSelector() {
    if (
      !elements.networkDropdown ||
      !elements.networkToggle
    ) {
      return;
    }

    elements.networkDropdown.hidden = false;

    elements.networkToggle.setAttribute(
      "aria-expanded",
      "true"
    );
  }

  function updateNetworkUI() {
    const network = getActiveNetwork();

    if (!network) {
      return;
    }

    if (elements.network) {
      elements.network.value = network.id;
    }

    if (elements.networkLabel) {
      elements.networkLabel.textContent =
        translate(network.translationKey);
    }

    if (elements.networkIcon) {
      elements.networkIcon.setAttribute(
        "class",
        `bitcoin-icon ${network.icon}`
      );
    }

    elements.networkOptions.forEach(
      (option) => {
        const optionNetwork =
          getNetworkConfig(
            option.dataset.network
          );

        if (!optionNetwork) {
          return;
        }

        const isActive =
          optionNetwork.id === network.id;

        option.classList.toggle(
          "active",
          isActive
        );

        option.setAttribute(
          "aria-checked",
          String(isActive)
        );

        const optionIcon =
          option.querySelector(
            ".network-option-icon"
          );

        optionIcon?.setAttribute(
          "class",
          `bitcoin-icon network-option-icon ${optionNetwork.icon}`
        );
      }
    );
  }

  function setNetwork(networkId) {
    const network =
      getNetworkConfig(networkId);

    if (!network) {
      console.warn(
        `Unknown Bitcoin network: ${networkId}`
      );

      return false;
    }

    if (
      state.wallet &&
      state.wallet.networkKey !== network.id
    ) {
      clearWallet();
    }

    state.activeNetwork = network.id;

    updateNetworkUI();

    window.dispatchEvent(
      new CustomEvent(
        "bitcoin-network-changed",
        {
          detail: network
        }
      )
    );

    return true;
  }

  function moveNetworkFocus(
    currentOption,
    direction
  ) {
    const currentIndex =
      elements.networkOptions.indexOf(
        currentOption
      );

    if (
      currentIndex < 0 ||
      elements.networkOptions.length === 0
    ) {
      return;
    }

    const nextIndex =
      (
        currentIndex +
        direction +
        elements.networkOptions.length
      ) %
      elements.networkOptions.length;

    elements.networkOptions[nextIndex].focus();
  }

  function initNetworkSelector() {
    if (
      !elements.networkToggle ||
      !elements.networkDropdown
    ) {
      return;
    }

    const initialNetwork = getNetworkConfig(
      elements.network?.value
    )
      ? elements.network.value
      : "mainnet";

    state.activeNetwork = initialNetwork;

    updateNetworkUI();

    elements.networkToggle.addEventListener(
      "click",
      (event) => {
        event.stopPropagation();

        if (
          elements.networkDropdown.hidden
        ) {
          openNetworkSelector();
        } else {
          closeNetworkSelector();
        }
      }
    );

    elements.networkToggle.addEventListener(
      "keydown",
      (event) => {
        if (event.key !== "ArrowDown") {
          return;
        }

        event.preventDefault();

        openNetworkSelector();

        const activeOption =
          elements.networkOptions.find(
            (option) =>
              option.dataset.network ===
              state.activeNetwork
          );

        (
          activeOption ||
          elements.networkOptions[0]
        )?.focus();
      }
    );

    elements.networkOptions.forEach(
      (option) => {
        option.addEventListener(
          "click",
          () => {
            if (
              setNetwork(
                option.dataset.network
              )
            ) {
              closeNetworkSelector({
                restoreFocus: true
              });
            }
          }
        );

        option.addEventListener(
          "keydown",
          (event) => {
            if (
              event.key === "ArrowDown"
            ) {
              event.preventDefault();

              moveNetworkFocus(option, 1);
            } else if (
              event.key === "ArrowUp"
            ) {
              event.preventDefault();

              moveNetworkFocus(option, -1);
            } else if (
              event.key === "Home"
            ) {
              event.preventDefault();

              elements.networkOptions[
                0
              ]?.focus();
            } else if (
              event.key === "End"
            ) {
              event.preventDefault();

              elements.networkOptions[
                elements.networkOptions
                  .length - 1
              ]?.focus();
            }
          }
        );
      }
    );

    document.addEventListener(
      "click",
      (event) => {
        if (
          event.target instanceof Element &&
          !event.target.closest(
            ".network-selector"
          )
        ) {
          closeNetworkSelector();
        }
      }
    );

    document.addEventListener(
      "keydown",
      (event) => {
        if (
          event.key === "Escape" &&
          !elements.networkDropdown.hidden
        ) {
          closeNetworkSelector({
            restoreFocus: true
          });
        }
      }
    );
  }

  async function loadVersionInfo() {
    try {
      const [
        githubResponse,
        packageResponse
      ] = await Promise.all([
        fetch(
          "https://api.github.com/repos/B3POio/bitcoin-wallet-generator/commits/main"
        ),
        fetch(
          "https://raw.githubusercontent.com/B3POio/bitcoin-wallet-generator/main/package.json"
        )
      ]);

      if (
        !githubResponse.ok ||
        !packageResponse.ok
      ) {
        throw new Error(
          "GitHub request failed"
        );
      }

      const commitData =
        await githubResponse.json();

      const packageData =
        await packageResponse.json();

      const versionElement =
        document.getElementById("appVersion");

      const commitElement =
        document.getElementById("appCommit");

      if (versionElement) {
        versionElement.textContent =
          `v${packageData.version}`;
      }

      if (commitElement) {
        commitElement.textContent =
          ` ${commitData.sha.substring(
            0,
            7
          )}`;
      }
    } catch (error) {
      console.warn(
        "Could not load version information:",
        error
      );
    }
  }

  function checkBrowserSecurity() {
    const cryptoAvailable =
      window.crypto &&
      typeof window.crypto.getRandomValues ===
        "function";

    if (!cryptoAvailable) {
      setSecurityStatus(
        false,
        "secureRandomUnavailable"
      );

      elements.generateButton.disabled =
        true;

      throw new Error(
        translate(
          "secureRandomUnavailable"
        )
      );
    }

    const secureContext =
      window.isSecureContext === true;

    if (!secureContext) {
      setSecurityStatus(
        false,
        "secureContextRecommended"
      );

      elements.offlineWarning.hidden =
        false;
    } else {
      setSecurityStatus(
        true,
        "secureRandomAvailable"
      );

      elements.offlineWarning.hidden =
        true;
    }
  }

  function setSecurityStatus(
    secure,
    translationKey
  ) {
    state.securityStatusKey =
      translationKey;

    elements.securityStatus.classList.toggle(
      "secure",
      secure
    );

    elements.securityStatusText.dataset.i18n =
      translationKey;

    elements.securityStatusText.textContent =
      translate(translationKey);
  }

  function generateEntropy(bits) {
    if (bits !== 128 && bits !== 256) {
      throw new Error(
        translate("unsupportedEntropy")
      );
    }

    const byteLength = bits / 8;

    const entropy =
      new Uint8Array(byteLength);

    window.crypto.getRandomValues(entropy);

    return entropy;
  }

  function bytesToHex(bytes) {
    let result = "";

    for (
      let index = 0;
      index < bytes.length;
      index += 1
    ) {
      result += bytes[index]
        .toString(16)
        .padStart(2, "0");
    }

    return result;
  }

  function generateWallet() {
    let entropy = null;
    let seed = null;

    try {
      elements.generateButton.disabled =
        true;

      elements.generateButton.textContent =
        translate("generating");

      clearWallet();

      const networkKey =
        state.activeNetwork;

      const networkConfig =
        getNetworkConfig(networkKey);

      if (!networkConfig) {
        throw new Error(
          translate("invalidNetwork")
        );
      }

      const wordCount = Number(
        elements.wordCount.value
      );

      const entropyBits =
        CONFIG.entropy[wordCount];

      if (!entropyBits) {
        throw new Error(
          translate(
            "invalidPhraseLength"
          )
        );
      }

      entropy =
        generateEntropy(entropyBits);

      const entropyHex =
        bytesToHex(entropy);

      const mnemonic =
        bip39.entropyToMnemonic(entropyHex);

      const mnemonicValid =
        bip39.validateMnemonic(mnemonic);

      if (!mnemonicValid) {
        throw new Error(
          translate(
            "invalidGeneratedPhrase"
          )
        );
      }

      seed =
        bip39.mnemonicToSeedSync(mnemonic);

      const root = bip32.fromSeed(
        seed,
        networkConfig.network
      );

      const accountPath =
        "m/84'/" +
        networkConfig.coinType +
        "'/0'";

      const addressPath =
        accountPath + "/0/0";

      const receivingNode =
        root.derivePath(addressPath);

      if (!receivingNode.privateKey) {
        throw new Error(
          translate("privateKeyFailure")
        );
      }

      const payment =
        bitcoin.payments.p2wpkh({
          pubkey:
            receivingNode.publicKey,
          network:
            networkConfig.network
        });

      if (!payment.address) {
        throw new Error(
          translate("addressFailure")
        );
      }

      const account =
        root.derivePath(accountPath);

      const accountPublicKey =
        account.neutered();

      const xpub =
        accountPublicKey.toBase58();

      const fingerprint =
        root.fingerprint;

      state.wallet = {
        networkKey,
        network: networkConfig.network,
        networkName:
          networkConfig.name,
        mnemonic,
        seed,
        root,
        account,
        receivingNode,
        address: payment.address,
        publicKey:
          receivingNode.publicKey,
        accountPath,
        addressPath,
        fingerprint,
        xpub
      };

      renderWallet();

      verifyWallet();

      if (
        elements.verificationCard
      ) {
        elements.verificationCard.hidden =
          false;
      }
    } catch (error) {
      console.error(
        "Wallet generation error:",
        error
      );

      clearWallet();

      window.alert(
        translate("generationFailed") +
          "\n\n" +
          (
            error instanceof Error
              ? error.message
              : String(error)
          )
      );
    } finally {
      if (entropy) {
        entropy.fill(0);
      }

      if (seed) {
        seed.fill(0);
      }

      elements.generateButton.disabled =
        false;

      elements.generateButton.textContent =
        translate("generateWallet");
    }
  }

  function renderWallet() {
    const wallet = state.wallet;

    if (!wallet) {
      return;
    }

    elements.networkBadge.textContent =
      getNetworkConfig(
        wallet.networkKey
      )?.badge || "BITCOIN";

    renderMnemonic(wallet.mnemonic);

    elements.address.textContent =
      wallet.address;

    elements.derivationPath.textContent =
      wallet.addressPath;

    elements.fingerprint.textContent =
      bytesToHex(wallet.fingerprint);

    elements.xpub.textContent =
      wallet.xpub;

    elements.walletCard.hidden = false;

    elements.walletCard.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function renderMnemonic(mnemonic) {
    const words =
      mnemonic.trim().split(/\s+/);

    elements.mnemonicGrid.innerHTML = "";

    words.forEach((word, index) => {
      const item =
        document.createElement("div");

      item.className = "mnemonic-word";

      const number =
        document.createElement("span");

      number.className =
        "mnemonic-number";

      number.textContent =
        String(index + 1);

      const value =
        document.createElement("span");

      value.className =
        "mnemonic-value";

      value.textContent = word;

      item.appendChild(number);
      item.appendChild(value);

      elements.mnemonicGrid.appendChild(
        item
      );
    });

    state.mnemonicVisible = true;

    elements.mnemonicGrid.classList.remove(
      "mnemonic-hidden"
    );

    elements.toggleMnemonicButton.textContent =
      translate("hidePhrase");
  }

  function toggleMnemonicVisibility() {
    if (!state.wallet) {
      return;
    }

    state.mnemonicVisible =
      !state.mnemonicVisible;

    elements.mnemonicGrid.classList.toggle(
      "mnemonic-hidden",
      !state.mnemonicVisible
    );

    elements.toggleMnemonicButton.textContent =
      state.mnemonicVisible
        ? translate("hidePhrase")
        : translate("revealPhrase");
  }

  async function copyMnemonic() {
    if (!state.wallet) {
      return;
    }

    const confirmed = window.confirm(
      translate(
        "copyPhraseConfirmation"
      )
    );

    if (!confirmed) {
      return;
    }

    await copyToClipboard(
      state.wallet.mnemonic,
      elements.copyMnemonicButton,
      translate("copyPhrase")
    );
  }

  async function copyAddress() {
    if (!state.wallet) {
      return;
    }

    await copyToClipboard(
      state.wallet.address,
      elements.copyAddressButton,
      translate("copyAddress")
    );
  }

  async function copyToClipboard(
    text,
    button,
    defaultLabel
  ) {
    try {
      if (
        !navigator.clipboard ||
        typeof navigator.clipboard
          .writeText !== "function"
      ) {
        throw new Error(
          "Clipboard API unavailable."
        );
      }

      await navigator.clipboard.writeText(
        text
      );

      const originalText =
        button.textContent;

      button.textContent =
        translate("copied");

      window.setTimeout(() => {
        button.textContent =
          originalText || defaultLabel;
      }, 1500);
    } catch (error) {
      console.error(
        "Clipboard error:",
        error
      );

      window.alert(
        translate("clipboardFailed")
      );
    }
  }

  function printBackup() {
    if (!state.wallet) {
      return;
    }

    const confirmed = window.confirm(
      translate("printConfirmation")
    );

    if (!confirmed) {
      return;
    }

    window.print();
  }

  function verifyWallet() {
    if (!state.wallet) {
      return false;
    }

    const wallet = state.wallet;

    const reconstructedSeed =
      bip39.mnemonicToSeedSync(
        wallet.mnemonic
      );

    const reconstructedRoot =
      bip32.fromSeed(
        reconstructedSeed,
        wallet.network
      );

    const reconstructedNode =
      reconstructedRoot.derivePath(
        wallet.addressPath
      );

    const reconstructedPayment =
      bitcoin.payments.p2wpkh({
        pubkey:
          reconstructedNode.publicKey,
        network: wallet.network
      });

    const addressMatches =
      reconstructedPayment.address ===
      wallet.address;

    const publicKeyMatches =
      bytesEqual(
        reconstructedNode.publicKey,
        wallet.publicKey
      );

    const reconstructedAccount =
      reconstructedRoot.derivePath(
        wallet.accountPath
      );

    const reconstructedXpub =
      reconstructedAccount
        .neutered()
        .toBase58();

    const xpubMatches =
      reconstructedXpub === wallet.xpub;

    reconstructedSeed.fill(0);

    if (
      !addressMatches ||
      !publicKeyMatches ||
      !xpubMatches
    ) {
      throw new Error(
        translate(
          "verificationFailure"
        )
      );
    }

    return true;
  }

  function bytesEqual(a, b) {
    if (!a || !b) {
      return false;
    }

    if (a.length !== b.length) {
      return false;
    }

    for (
      let index = 0;
      index < a.length;
      index += 1
    ) {
      if (a[index] !== b[index]) {
        return false;
      }
    }

    return true;
  }

  function clearWallet() {
    if (state.wallet) {
      if (
        state.wallet.seed &&
        typeof state.wallet.seed.fill ===
          "function"
      ) {
        try {
          state.wallet.seed.fill(0);
        } catch (error) {
          console.warn(
            "Unable to clear seed buffer.",
            error
          );
        }
      }

      if (
        state.wallet.receivingNode &&
        state.wallet.receivingNode
          .privateKey &&
        typeof state.wallet.receivingNode
          .privateKey.fill === "function"
      ) {
        try {
          state.wallet.receivingNode
            .privateKey.fill(0);
        } catch (error) {
          console.warn(
            "Unable to clear private key buffer.",
            error
          );
        }
      }
    }

    state.wallet = null;
    state.mnemonicVisible = true;

    if (elements.walletCard) {
      elements.walletCard.hidden = true;
    }

    if (elements.verificationCard) {
      elements.verificationCard.hidden =
        true;
    }

    if (elements.mnemonicGrid) {
      elements.mnemonicGrid.innerHTML = "";
    }

    if (elements.address) {
      elements.address.textContent = "";
    }

    if (elements.derivationPath) {
      elements.derivationPath.textContent =
        "";
    }

    if (elements.fingerprint) {
      elements.fingerprint.textContent = "";
    }

    if (elements.xpub) {
      elements.xpub.textContent = "";
    }
  }

  function destroyWallet() {
    if (!state.wallet) {
      return;
    }

    const confirmed = window.confirm(
      translate("destroyConfirmation")
    );

    if (!confirmed) {
      return;
    }

    clearWallet();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  return {
    init
  };
})();

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    WalletApp.init
  );
} else {
  WalletApp.init();
}