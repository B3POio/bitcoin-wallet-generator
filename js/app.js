"use strict";

import { Buffer } from "buffer";
import * as bitcoin from "bitcoinjs-lib";
import * as bip39 from "bip39";
import BIP32Factory from "bip32";
import * as ecc from "@bitcoin-js/tiny-secp256k1-asmjs";
import { initializeLanguage, translate } from "./i18n.js";

/* =========================================================
   GLOBAL DEPENDENCIES
   ========================================================= */

globalThis.Buffer = Buffer;
const bip32 = BIP32Factory(ecc);

/* =========================================================
   NETWORK CONFIGURATION
   ========================================================= */

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

/* =========================================================
   APPLICATION
   ========================================================= */

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

  const BIP84_SELF_TEST = Object.freeze({
    mnemonic:
      "abandon abandon abandon abandon abandon abandon " +
      "abandon abandon abandon abandon abandon about",
    path: "m/84'/0'/0'/0/0",
    publicKey:
      "0330d54fd0dd420a6e5f8d3624f5f3482cae350f79d5f0753bf5beef9c2d91af3c",
    address:
      "bc1qcr8te4kr609gcawutmrza0j4xv80jy8z306fyu"
  });

  const state = {
    wallet: null,
    mnemonicVisible: true,
    activeNetwork: "mainnet",
    securityStatusKey: "checkingSecurity",
    cryptographicSelfTestPassed: false,
    backupChallengePositions: [],
    mnemonicVisibilityBeforeBackupVerification: true
  };

  const elements = {};
  const THEME_STORAGE_KEY = "bitcoin-wallet-theme";
  const THEMES = new Set(["light", "dark"]);

  /* =========================================================
     INITIALIZATION
     ========================================================= */

  function init() {
    cacheElements();

    if (elements.generateButton) {
      elements.generateButton.disabled = true;
    }

    initializeLanguage();
    initThemeSelector();
    initNetworkSelector();
    bindEvents();

    const browserSecurityPassed = checkBrowserSecurity();
    const cryptographicSelfTestPassed = runCryptographicSelfTest();

    state.cryptographicSelfTestPassed = cryptographicSelfTestPassed;
    elements.generateButton.disabled =
      !(browserSecurityPassed && cryptographicSelfTestPassed);
  }

  /* =========================================================
     DOM CACHE
     ========================================================= */

  function cacheElements() {
    elements.securityStatus = document.getElementById("securityStatus");
    elements.securityStatusText = document.getElementById("securityStatusText");
    elements.offlineWarning = document.getElementById("offlineWarning");

    elements.network = document.getElementById("network");
    elements.wordCount = document.getElementById("wordCount");
    elements.generateButton = document.getElementById("generateButton");

    elements.walletCard = document.getElementById("walletCard");
    elements.networkBadge = document.getElementById("networkBadge");

    elements.mnemonicGrid = document.getElementById("mnemonicGrid");
    elements.toggleMnemonicButton =
      document.getElementById("toggleMnemonicButton");
    elements.copyMnemonicButton =
      document.getElementById("copyMnemonicButton");

    elements.address = document.getElementById("address");
    elements.copyAddressButton =
      document.getElementById("copyAddressButton");

    elements.derivationPath = document.getElementById("derivationPath");
    elements.fingerprint = document.getElementById("fingerprint");
    elements.xpub = document.getElementById("xpub");

    elements.printButton = document.getElementById("printButton");
    elements.destroyButton = document.getElementById("destroyButton");
    elements.verificationCard = document.getElementById("verificationCard");

    elements.appDialog = document.getElementById("appDialog");
    elements.appDialogTitle = document.getElementById("appDialogTitle");
    elements.appDialogMessage = document.getElementById("appDialogMessage");
    elements.appDialogClose = document.getElementById("appDialogClose");
    elements.appDialogCancel = document.getElementById("appDialogCancel");
    elements.appDialogConfirm = document.getElementById("appDialogConfirm");

    elements.backupVerificationDialog =
      document.getElementById("backupVerificationDialog");
    elements.backupVerificationClose =
      document.getElementById("backupVerificationClose");
    elements.backupChallengeStep =
      document.getElementById("backupChallengeStep");
    elements.backupChallengeFields =
      document.getElementById("backupChallengeFields");
    elements.backupChallengeError =
      document.getElementById("backupChallengeError");
    elements.backupChallengeCancel =
      document.getElementById("backupChallengeCancel");
    elements.backupChallengeContinue =
      document.getElementById("backupChallengeContinue");
    elements.backupAcknowledgementStep =
      document.getElementById("backupAcknowledgementStep");
    elements.backupAcknowledgementCancel =
      document.getElementById("backupAcknowledgementCancel");
    elements.backupClearWalletButton =
      document.getElementById("backupClearWalletButton");

    elements.backupAcknowledgements = Array.from(
      document.querySelectorAll(".backup-acknowledgement")
    );

    elements.themeToggle = document.getElementById("themeToggle");
    elements.networkToggle = document.getElementById("networkToggle");
    elements.networkDropdown = document.getElementById("networkDropdown");
    elements.networkLabel = document.getElementById("networkLabel");
    elements.networkIcon = document.getElementById("networkIcon");

    elements.networkOptions = Array.from(
      document.querySelectorAll(".network-option")
    );
  }

  /* =========================================================
     EVENT BINDINGS
     ========================================================= */

  function bindEvents() {
    elements.generateButton.addEventListener("click", generateWallet);
    elements.toggleMnemonicButton.addEventListener(
      "click",
      toggleMnemonicVisibility
    );
    elements.copyMnemonicButton.addEventListener("click", copyMnemonic);
    elements.copyAddressButton.addEventListener("click", copyAddress);
    elements.printButton.addEventListener("click", printBackup);
    elements.destroyButton.addEventListener("click", clearWalletData);

    elements.backupVerificationClose?.addEventListener(
      "click",
      cancelBackupVerification
    );

    elements.backupChallengeCancel?.addEventListener(
      "click",
      cancelBackupVerification
    );

    elements.backupAcknowledgementCancel?.addEventListener(
      "click",
      cancelBackupVerification
    );

    elements.backupChallengeContinue?.addEventListener(
      "click",
      verifyBackupChallenge
    );

    elements.backupClearWalletButton?.addEventListener(
      "click",
      completeBackupVerification
    );

    elements.backupAcknowledgements.forEach((button) => {
      button.addEventListener("click", () => {
        toggleBackupAcknowledgement(button);
      });
    });

    elements.backupVerificationDialog?.addEventListener(
      "cancel",
      (event) => {
        event.preventDefault();
        cancelBackupVerification();
      }
    );

    elements.network.addEventListener("change", () => {
      setNetwork(elements.network.value);
    });

    window.addEventListener("language-changed", () => {
      updateNetworkUI();
      updateThemeToggleLabel();
      updateDynamicLabels();
    });
  }

  /* =========================================================
     DYNAMIC UI LABELS
     ========================================================= */

  function updateDynamicLabels() {
    if (!state.wallet) {
      elements.generateButton.textContent = translate("generateWallet");
    }

    elements.toggleMnemonicButton.textContent = state.mnemonicVisible
      ? translate("hidePhrase")
      : translate("revealPhrase");

    elements.securityStatusText.textContent =
      translate(state.securityStatusKey);
  }

  /* =========================================================
     THEME
     ========================================================= */

  function readSavedTheme() {
    try {
      const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
      return THEMES.has(savedTheme) ? savedTheme : null;
    } catch {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Theme still works without persistence.
    }
  }

  function applyTheme(theme, persist = false) {
    const resolvedTheme = THEMES.has(theme) ? theme : "light";

    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.style.colorScheme = resolvedTheme;

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
    if (!elements.themeToggle) return;

    const translationKey =
      document.documentElement.dataset.theme === "dark"
        ? "switchToLight"
        : "switchToDark";

    const label = translate(translationKey);

    elements.themeToggle.setAttribute("aria-label", label);
    elements.themeToggle.setAttribute("title", label);
    elements.themeToggle.dataset.i18nAriaLabel = translationKey;
    elements.themeToggle.dataset.i18nTitle = translationKey;
  }

  function initThemeSelector() {
    const initialTheme =
      readSavedTheme() ||
      document.documentElement.dataset.theme ||
      "light";

    applyTheme(initialTheme);

    elements.themeToggle?.addEventListener("click", () => {
      const nextTheme =
        document.documentElement.dataset.theme === "dark"
          ? "light"
          : "dark";

      applyTheme(nextTheme, true);
    });
  }

  /* =========================================================
     NETWORK
     ========================================================= */

  function getNetworkConfig(networkId) {
    return CONFIG.networks[networkId] || null;
  }

  function getActiveNetwork() {
    return getNetworkConfig(state.activeNetwork);
  }

  function closeNetworkSelector({ restoreFocus = false } = {}) {
    if (!elements.networkDropdown || !elements.networkToggle) return;

    elements.networkDropdown.hidden = true;
    elements.networkToggle.setAttribute("aria-expanded", "false");

    if (restoreFocus) {
      elements.networkToggle.focus();
    }
  }

  function openNetworkSelector() {
    if (!elements.networkDropdown || !elements.networkToggle) return;

    elements.networkDropdown.hidden = false;
    elements.networkToggle.setAttribute("aria-expanded", "true");
  }

  function updateNetworkUI() {
    const network = getActiveNetwork();
    if (!network) return;

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

    elements.networkOptions.forEach((option) => {
      const optionNetwork = getNetworkConfig(option.dataset.network);
      if (!optionNetwork) return;

      const isActive = optionNetwork.id === network.id;

      option.classList.toggle("active", isActive);
      option.setAttribute("aria-checked", String(isActive));

      const optionIcon = option.querySelector(".network-option-icon");

      optionIcon?.setAttribute(
        "class",
        `bitcoin-icon network-option-icon ${optionNetwork.icon}`
      );
    });
  }

  function setNetwork(networkId) {
    const network = getNetworkConfig(networkId);

    if (!network) {
      console.warn(`Unknown Bitcoin network: ${networkId}`);
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
      new CustomEvent("bitcoin-network-changed", {
        detail: network
      })
    );

    return true;
  }

  function moveNetworkFocus(currentOption, direction) {
    const currentIndex = elements.networkOptions.indexOf(currentOption);

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
    if (!elements.networkToggle || !elements.networkDropdown) return;

    const initialNetwork =
      getNetworkConfig(elements.network?.value)
        ? elements.network.value
        : "mainnet";

    state.activeNetwork = initialNetwork;
    updateNetworkUI();

    elements.networkToggle.addEventListener("click", (event) => {
      event.stopPropagation();

      if (elements.networkDropdown.hidden) {
        openNetworkSelector();
      } else {
        closeNetworkSelector();
      }
    });

    elements.networkToggle.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowDown") return;

      event.preventDefault();
      openNetworkSelector();

      const activeOption = elements.networkOptions.find(
        (option) =>
          option.dataset.network === state.activeNetwork
      );

      (activeOption || elements.networkOptions[0])?.focus();
    });

    elements.networkOptions.forEach((option) => {
      option.addEventListener("click", () => {
        if (setNetwork(option.dataset.network)) {
          closeNetworkSelector({
            restoreFocus: true
          });
        }
      });

      option.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          moveNetworkFocus(option, 1);
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          moveNetworkFocus(option, -1);
        } else if (event.key === "Home") {
          event.preventDefault();
          elements.networkOptions[0]?.focus();
        } else if (event.key === "End") {
          event.preventDefault();
          elements.networkOptions[
            elements.networkOptions.length - 1
          ]?.focus();
        }
      });
    });

    document.addEventListener("click", (event) => {
      if (
        event.target instanceof Element &&
        !event.target.closest(".network-selector")
      ) {
        closeNetworkSelector();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        !elements.networkDropdown.hidden
      ) {
        closeNetworkSelector({
          restoreFocus: true
        });
      }
    });
  }

  /* =========================================================
     BROWSER SECURITY
     ========================================================= */

  function checkBrowserSecurity() {
    const cryptoAvailable = Boolean(
      window.crypto &&
      typeof window.crypto.getRandomValues === "function"
    );

    if (!cryptoAvailable) {
      setSecurityStatus(false, "secureRandomUnavailable");
      elements.offlineWarning.hidden = false;
      return false;
    }

    const localFile = window.location.protocol === "file:";
    const trustedContext =
      localFile ||
      window.isSecureContext === true;

    if (!trustedContext) {
      setSecurityStatus(false, "secureContextRequired");
      elements.offlineWarning.hidden = false;
      return false;
    }

    setSecurityStatus(true, "secureRandomAvailable");
    elements.offlineWarning.hidden = true;

    return true;
  }

  function setSecurityStatus(secure, translationKey) {
    state.securityStatusKey = translationKey;

    elements.securityStatus.classList.toggle("secure", secure);
    elements.securityStatusText.dataset.i18n = translationKey;
    elements.securityStatusText.textContent = translate(translationKey);
  }

  /* =========================================================
     CRYPTOGRAPHIC STARTUP SELF-TEST
     ========================================================= */

  function runCryptographicSelfTest() {
    let seed = null;
    let root = null;
    let receivingNode = null;

    try {
      if (!bip39.validateMnemonic(BIP84_SELF_TEST.mnemonic)) {
        throw new Error("BIP39 mnemonic validation failed.");
      }

      seed = bip39.mnemonicToSeedSync(BIP84_SELF_TEST.mnemonic);

      root = bip32.fromSeed(
        seed,
        bitcoin.networks.bitcoin
      );

      receivingNode = root.derivePath(BIP84_SELF_TEST.path);

      const publicKeyHex = bytesToHex(receivingNode.publicKey);

      const payment = bitcoin.payments.p2wpkh({
        pubkey: receivingNode.publicKey,
        network: bitcoin.networks.bitcoin
      });

      if (publicKeyHex !== BIP84_SELF_TEST.publicKey) {
        throw new Error(
          "BIP84 public key test vector mismatch."
        );
      }

      if (payment.address !== BIP84_SELF_TEST.address) {
        throw new Error(
          "BIP84 address test vector mismatch."
        );
      }

      return true;
    } catch (error) {
      console.error(
        "Cryptographic self-test failed.",
        error
      );

      setSecurityStatus(
        false,
        "cryptographicSelfTestFailed"
      );

      if (elements.offlineWarning) {
        elements.offlineWarning.hidden = false;
      }

      return false;
    } finally {
      wipeBuffer(seed);
      wipeBip32PrivateKey(receivingNode);
      wipeBip32PrivateKey(root);

      receivingNode = null;
      root = null;
      seed = null;
    }
  }

  /* =========================================================
     SECRET / BUFFER HYGIENE
     ========================================================= */

  function wipeBuffer(value) {
    if (!value || typeof value.fill !== "function") return;

    try {
      value.fill(0);
    } catch {
      // Best effort only.
    }
  }

  function wipeBip32PrivateKey(node) {
    if (!node) return;

    try {
      wipeBuffer(node.privateKey);
    } catch {
      // Best effort only.
    }
  }

  /* =========================================================
     ENTROPY
     ========================================================= */

  function generateEntropy(bits) {
    if (bits !== 128 && bits !== 256) {
      throw new Error(
        translate("unsupportedEntropy")
      );
    }

    const byteLength = bits / 8;
    const entropy = Buffer.alloc(byteLength);

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

  /* =========================================================
     WALLET GENERATION
     ========================================================= */

  function generateWallet() {
    let entropy = null;
    let seed = null;
    let root = null;
    let account = null;
    let receivingNode = null;

    try {
      if (!state.cryptographicSelfTestPassed) {
        throw new Error(
          translate("cryptographicSelfTestFailed")
        );
      }

      elements.generateButton.disabled = true;
      elements.generateButton.textContent = translate("generating");

      clearWallet();

      const networkKey = state.activeNetwork;
      const networkConfig = getNetworkConfig(networkKey);

      if (!networkConfig) {
        throw new Error(
          translate("invalidNetwork")
        );
      }

      const wordCount = Number(elements.wordCount.value);
      const entropyBits = CONFIG.entropy[wordCount];

      if (!entropyBits) {
        throw new Error(
          translate("invalidPhraseLength")
        );
      }

      entropy = generateEntropy(entropyBits);

      const mnemonic = bip39.entropyToMnemonic(entropy);

      if (!bip39.validateMnemonic(mnemonic)) {
        throw new Error(
          translate("invalidGeneratedPhrase")
        );
      }

      seed = bip39.mnemonicToSeedSync(mnemonic);

      root = bip32.fromSeed(
        seed,
        networkConfig.network
      );

      const accountPath =
        `m/84'/${networkConfig.coinType}'/0'`;

      const addressPath =
        `${accountPath}/0/0`;

      receivingNode = root.derivePath(addressPath);

      if (!receivingNode.privateKey) {
        throw new Error(
          translate("privateKeyFailure")
        );
      }

      const payment = bitcoin.payments.p2wpkh({
        pubkey: receivingNode.publicKey,
        network: networkConfig.network
      });

      if (!payment.address) {
        throw new Error(
          translate("addressFailure")
        );
      }

      account = root.derivePath(accountPath);

      const accountPublicKey = account.neutered();
      const xpub = accountPublicKey.toBase58();

      const publicKey = Buffer.from(receivingNode.publicKey);
      const fingerprint = Buffer.from(root.fingerprint);

      state.wallet = {
        networkKey,
        networkName: networkConfig.name,
        mnemonic,
        address: payment.address,
        publicKey,
        accountPath,
        addressPath,
        fingerprint,
        xpub
      };

      renderWallet();
      verifyWallet();

      if (elements.verificationCard) {
        elements.verificationCard.hidden = false;
      }
    } catch (error) {
      console.error(
        "Wallet generation error:",
        error
      );

      clearWallet();

      void showAlertDialog(
        translate("generationFailed"),
        error instanceof Error
          ? error.message
          : String(error)
      );
    } finally {
      wipeBuffer(entropy);
      wipeBuffer(seed);

      wipeBip32PrivateKey(receivingNode);
      wipeBip32PrivateKey(account);
      wipeBip32PrivateKey(root);

      entropy = null;
      seed = null;
      receivingNode = null;
      account = null;
      root = null;

      elements.generateButton.disabled =
        !state.cryptographicSelfTestPassed;

      elements.generateButton.textContent =
        translate("generateWallet");
    }
  }

  /* =========================================================
     WALLET RENDERING
     ========================================================= */

  function renderWallet() {
    const wallet = state.wallet;
    if (!wallet) return;

    elements.networkBadge.textContent =
      getNetworkConfig(wallet.networkKey)?.badge ||
      "BITCOIN";

    renderMnemonic(wallet.mnemonic);

    elements.address.textContent = wallet.address;
    elements.derivationPath.textContent = wallet.addressPath;
    elements.fingerprint.textContent =
      bytesToHex(wallet.fingerprint);
    elements.xpub.textContent = wallet.xpub;

    elements.walletCard.hidden = false;

    elements.walletCard.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function renderMnemonic(mnemonic) {
    const words = mnemonic.trim().split(/\s+/);

    elements.mnemonicGrid.innerHTML = "";

    words.forEach((word, index) => {
      const item = document.createElement("div");
      item.className = "mnemonic-word";

      const number = document.createElement("span");
      number.className = "mnemonic-number";
      number.textContent = String(index + 1);

      const value = document.createElement("span");
      value.className = "mnemonic-value";
      value.textContent = word;

      item.appendChild(number);
      item.appendChild(value);

      elements.mnemonicGrid.appendChild(item);
    });

    state.mnemonicVisible = true;
    state.backupChallengePositions = [];
    state.mnemonicVisibilityBeforeBackupVerification = true;

    elements.mnemonicGrid.classList.remove(
      "mnemonic-hidden"
    );

    elements.toggleMnemonicButton.textContent =
      translate("hidePhrase");
  }

  /* =========================================================
     MNEMONIC VISIBILITY
     ========================================================= */

  function toggleMnemonicVisibility() {
    if (!state.wallet) return;

    state.mnemonicVisible = !state.mnemonicVisible;

    elements.mnemonicGrid.classList.toggle(
      "mnemonic-hidden",
      !state.mnemonicVisible
    );

    elements.toggleMnemonicButton.textContent =
      state.mnemonicVisible
        ? translate("hidePhrase")
        : translate("revealPhrase");
  }

  /* =========================================================
     NATIVE APPLICATION DIALOGS
     ========================================================= */

  function showDialog({
    title,
    message,
    confirmLabel = "OK",
    cancelLabel = null,
    danger = false
  }) {
    return new Promise((resolve) => {
      const dialog = elements.appDialog;

      if (
        !dialog ||
        typeof dialog.showModal !== "function"
      ) {
        console.error(
          "Native dialog support is unavailable."
        );

        resolve(false);
        return;
      }

      elements.appDialogTitle.textContent = title;
      elements.appDialogMessage.textContent = message;
      elements.appDialogConfirm.textContent = confirmLabel;

      elements.appDialogConfirm.classList.toggle(
        "button-primary",
        !danger
      );

      elements.appDialogConfirm.classList.toggle(
        "button-danger",
        danger
      );

      if (cancelLabel) {
        elements.appDialogCancel.hidden = false;
        elements.appDialogCancel.textContent = cancelLabel;
      } else {
        elements.appDialogCancel.hidden = true;
      }

      let settled = false;

      const finish = (result) => {
        if (settled) return;

        settled = true;

        elements.appDialogConfirm.removeEventListener(
          "click",
          confirm
        );

        elements.appDialogCancel.removeEventListener(
          "click",
          cancel
        );

        elements.appDialogClose.removeEventListener(
          "click",
          cancel
        );

        dialog.removeEventListener(
          "cancel",
          handleCancel
        );

        if (dialog.open) {
          dialog.close();
        }

        resolve(result);
      };

      const confirm = () => finish(true);
      const cancel = () => finish(false);

      const handleCancel = (event) => {
        event.preventDefault();
        finish(false);
      };

      elements.appDialogConfirm.addEventListener(
        "click",
        confirm
      );

      elements.appDialogCancel.addEventListener(
        "click",
        cancel
      );

      elements.appDialogClose.addEventListener(
        "click",
        cancel
      );

      dialog.addEventListener(
        "cancel",
        handleCancel
      );

      dialog.showModal();
    });
  }

  function showAlertDialog(title, message) {
    return showDialog({
      title,
      message,
      confirmLabel: "OK"
    });
  }

  function showConfirmDialog({
    title,
    message,
    confirmLabel,
    cancelLabel = "Cancel",
    danger = false
  }) {
    return showDialog({
      title,
      message,
      confirmLabel,
      cancelLabel,
      danger
    });
  }

  /* =========================================================
     CLIPBOARD
     ========================================================= */

  async function copyMnemonic() {
    if (!state.wallet) return;

    const confirmed = await showConfirmDialog({
      title: translate("copyPhrase"),
      message: translate(
        "copyPhraseConfirmation"
      ),
      confirmLabel: translate("copyPhrase")
    });

    if (!confirmed) return;

    await copyToClipboard(
      state.wallet.mnemonic,
      elements.copyMnemonicButton,
      translate("copyPhrase")
    );
  }

  async function copyAddress() {
    if (!state.wallet) return;

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
        typeof navigator.clipboard.writeText !==
          "function"
      ) {
        throw new Error(
          "Clipboard API unavailable."
        );
      }

      await navigator.clipboard.writeText(text);

      const originalText = button.textContent;

      button.textContent = translate("copied");

      window.setTimeout(() => {
        button.textContent =
          originalText || defaultLabel;
      }, 1500);
    } catch (error) {
      console.error(
        "Clipboard error:",
        error
      );

      await showAlertDialog(
        "Copy Failed",
        translate("clipboardFailed")
      );
    }
  }

  /* =========================================================
     PRINTING
     ========================================================= */

  async function printBackup() {
    if (!state.wallet) return;

    const confirmed = await showConfirmDialog({
      title: translate("printBackup"),
      message: translate(
        "printConfirmation"
      ),
      confirmLabel: translate("printBackup")
    });

    if (!confirmed) return;

    window.print();
  }

  /* =========================================================
     WALLET CONSISTENCY CHECK
     ========================================================= */

  function verifyWallet() {
    if (!state.wallet) {
      return false;
    }

    const wallet = state.wallet;
    const networkConfig =
      getNetworkConfig(wallet.networkKey);

    if (!networkConfig) {
      throw new Error(
        translate("verificationFailure")
      );
    }

    let reconstructedSeed = null;
    let reconstructedRoot = null;
    let reconstructedNode = null;
    let reconstructedAccount = null;

    try {
      reconstructedSeed =
        bip39.mnemonicToSeedSync(
          wallet.mnemonic
        );

      reconstructedRoot =
        bip32.fromSeed(
          reconstructedSeed,
          networkConfig.network
        );

      reconstructedNode =
        reconstructedRoot.derivePath(
          wallet.addressPath
        );

      const reconstructedPayment =
        bitcoin.payments.p2wpkh({
          pubkey: reconstructedNode.publicKey,
          network: networkConfig.network
        });

      const addressMatches =
        reconstructedPayment.address ===
        wallet.address;

      const publicKeyMatches =
        bytesEqual(
          reconstructedNode.publicKey,
          wallet.publicKey
        );

      reconstructedAccount =
        reconstructedRoot.derivePath(
          wallet.accountPath
        );

      const reconstructedXpub =
        reconstructedAccount
          .neutered()
          .toBase58();

      const xpubMatches =
        reconstructedXpub === wallet.xpub;

      if (
        !addressMatches ||
        !publicKeyMatches ||
        !xpubMatches
      ) {
        throw new Error(
          translate("verificationFailure")
        );
      }

      return true;
    } finally {
      wipeBuffer(reconstructedSeed);

      wipeBip32PrivateKey(
        reconstructedNode
      );

      wipeBip32PrivateKey(
        reconstructedAccount
      );

      wipeBip32PrivateKey(
        reconstructedRoot
      );

      reconstructedSeed = null;
      reconstructedNode = null;
      reconstructedAccount = null;
      reconstructedRoot = null;
    }
  }

  function bytesEqual(a, b) {
    if (!a || !b) return false;

    if (a.length !== b.length) {
      return false;
    }

    let difference = 0;

    for (
      let index = 0;
      index < a.length;
      index += 1
    ) {
      difference |=
        a[index] ^ b[index];
    }

    return difference === 0;
  }

  /* =========================================================
     BACKUP VERIFICATION
     ========================================================= */

  function getSecureRandomIndex(maximum) {
    if (
      !Number.isInteger(maximum) ||
      maximum <= 0
    ) {
      throw new Error(
        "Invalid random index range."
      );
    }

    const limit =
      Math.floor(
        0x100000000 / maximum
      ) * maximum;

    const value = new Uint32Array(1);

    do {
      window.crypto.getRandomValues(value);
    } while (value[0] >= limit);

    return value[0] % maximum;
  }

  function createBackupChallengePositions(
    wordCount,
    challengeCount = 3
  ) {
    if (challengeCount > wordCount) {
      throw new Error(
        "Backup challenge count exceeds recovery phrase length."
      );
    }

    const positions = new Set();

    while (positions.size < challengeCount) {
      positions.add(
        getSecureRandomIndex(wordCount)
      );
    }

    return Array.from(positions).sort(
      (a, b) => a - b
    );
  }

  function normalizeRecoveryWord(value) {
    return String(value || "")
      .normalize("NFKD")
      .trim()
      .toLowerCase();
  }

  function hideMnemonicForBackupVerification() {
    state.mnemonicVisibilityBeforeBackupVerification =
      state.mnemonicVisible;

    state.mnemonicVisible = false;

    elements.mnemonicGrid.classList.add(
      "mnemonic-hidden"
    );

    elements.toggleMnemonicButton.textContent =
      translate("revealPhrase");
  }

  function restoreMnemonicAfterBackupCancellation() {
    state.mnemonicVisible =
      state.mnemonicVisibilityBeforeBackupVerification;

    elements.mnemonicGrid.classList.toggle(
      "mnemonic-hidden",
      !state.mnemonicVisible
    );

    elements.toggleMnemonicButton.textContent =
      state.mnemonicVisible
        ? translate("hidePhrase")
        : translate("revealPhrase");
  }

  function getBackupChallengeWord(input) {
    if (!state.wallet) return "";

    const wordIndex = Number(
      input.dataset.wordIndex
    );

    const words = state.wallet.mnemonic
      .trim()
      .split(/\s+/);

    return normalizeRecoveryWord(
      words[wordIndex]
    );
  }

  function setBackupInputState(
    input,
    status,
    stateName
  ) {
    const wrapper = input.closest(
      ".backup-challenge-input-wrap"
    );

    if (!wrapper || !status) return;

    wrapper.classList.remove(
      "is-correct",
      "is-incorrect"
    );

    status.textContent = "";

    if (stateName === "correct") {
      wrapper.classList.add("is-correct");
      status.textContent = "Correct";
    } else if (stateName === "incorrect") {
      wrapper.classList.add("is-incorrect");
      status.textContent = "Incorrect";
    }
  }

  function validateBackupInput(
    input,
    finalValidation = false
  ) {
    const status = input.parentElement?.querySelector(
      ".backup-word-status"
    );

    const expectedWord =
      getBackupChallengeWord(input);

    const enteredWord =
      normalizeRecoveryWord(input.value);

    if (!enteredWord) {
      setBackupInputState(
        input,
        status,
        finalValidation
          ? "incorrect"
          : "neutral"
      );

      return false;
    }

    const exactMatch =
      enteredWord === expectedWord;

    const validPrefix =
      expectedWord.startsWith(
        enteredWord
      );

    if (finalValidation) {
      setBackupInputState(
        input,
        status,
        exactMatch
          ? "correct"
          : "incorrect"
      );

      return exactMatch;
    }

    if (!validPrefix) {
      setBackupInputState(
        input,
        status,
        "incorrect"
      );

      return false;
    }

    /*
     * While the user is typing, a valid prefix remains
     * neutral. "Correct" is shown after leaving the field
     * or when final verification is requested.
     */
    setBackupInputState(
      input,
      status,
      "neutral"
    );

    return exactMatch;
  }

  function renderBackupChallenge() {
    if (!state.wallet) return;

    const words =
      state.wallet.mnemonic
        .trim()
        .split(/\s+/);

    state.backupChallengePositions =
      createBackupChallengePositions(
        words.length,
        3
      );

    elements.backupChallengeFields.replaceChildren();

    state.backupChallengePositions.forEach(
      (position) => {
        const field =
          document.createElement("div");

        field.className =
          "backup-challenge-field";

        const label =
          document.createElement("label");

        const inputWrap =
          document.createElement("div");

        inputWrap.className =
          "backup-challenge-input-wrap";

        const input =
          document.createElement("input");

        const status =
          document.createElement("span");

        const inputId =
          `backup-word-${position + 1}`;

        label.htmlFor = inputId;
        label.textContent =
          `Word #${position + 1}`;

        input.id = inputId;
        input.type = "text";
        input.className =
          "backup-word-input";
        input.dataset.wordIndex =
          String(position);
        input.autocomplete = "off";
        input.autocapitalize = "none";
        input.spellcheck = false;

        status.className =
          "backup-word-status";
        status.setAttribute(
          "aria-live",
          "polite"
        );

        input.addEventListener(
          "input",
          () => {
            validateBackupInput(
              input,
              false
            );

            elements.backupChallengeError.hidden =
              true;
          }
        );

        input.addEventListener(
          "blur",
          () => {
            validateBackupInput(
              input,
              true
            );
          }
        );

        inputWrap.appendChild(input);
        inputWrap.appendChild(status);

        field.appendChild(label);
        field.appendChild(inputWrap);

        elements.backupChallengeFields.appendChild(
          field
        );
      }
    );

    elements.backupChallengeError.hidden = true;
  }

  function resetBackupAcknowledgements() {
    elements.backupAcknowledgements.forEach(
      (button) => {
        button.classList.remove(
          "is-confirmed"
        );

        button.setAttribute(
          "aria-pressed",
          "false"
        );
      }
    );

    elements.backupClearWalletButton.disabled =
      true;
  }

  function openBackupVerification() {
    if (
      !state.wallet ||
      !elements.backupVerificationDialog
    ) {
      return;
    }

    hideMnemonicForBackupVerification();

    elements.backupChallengeStep.hidden = false;
    elements.backupAcknowledgementStep.hidden =
      true;

    resetBackupAcknowledgements();
    renderBackupChallenge();

    elements.backupVerificationDialog.showModal();

    elements.backupChallengeFields
      .querySelector("input")
      ?.focus();
  }

  function verifyBackupChallenge() {
    if (!state.wallet) return;

    const inputs = Array.from(
      elements.backupChallengeFields.querySelectorAll(
        ".backup-word-input"
      )
    );

    const matches =
      inputs.length ===
        state.backupChallengePositions.length &&
      inputs.every((input) =>
        validateBackupInput(
          input,
          true
        )
      );

    if (!matches) {
      elements.backupChallengeError.hidden =
        false;

      const firstIncorrect =
        elements.backupChallengeFields.querySelector(
          ".is-incorrect .backup-word-input"
        );

      firstIncorrect?.focus();

      return;
    }

    elements.backupChallengeError.hidden = true;

    /*
     * Remove all entered recovery words immediately after
     * successful verification.
     */
    inputs.forEach((input) => {
      input.value = "";
    });

    elements.backupChallengeFields.replaceChildren();

    elements.backupChallengeStep.hidden = true;
    elements.backupAcknowledgementStep.hidden =
      false;

    elements.backupAcknowledgements[0]?.focus();
  }

  function toggleBackupAcknowledgement(button) {
    const currentlyConfirmed =
      button.getAttribute("aria-pressed") ===
      "true";

    button.setAttribute(
      "aria-pressed",
      String(!currentlyConfirmed)
    );

    button.classList.toggle(
      "is-confirmed",
      !currentlyConfirmed
    );

    updateBackupClearButton();
  }

  function updateBackupClearButton() {
    const allConfirmed =
      elements.backupAcknowledgements.every(
        (button) =>
          button.getAttribute("aria-pressed") ===
          "true"
      );

    elements.backupClearWalletButton.disabled =
      !allConfirmed;
  }

  function cancelBackupVerification() {
    if (
      elements.backupVerificationDialog?.open
    ) {
      elements.backupVerificationDialog.close();
    }

    /*
     * Removing the fields drops the entered mnemonic
     * fragments from the DOM.
     */
    elements.backupChallengeFields.replaceChildren();

    state.backupChallengePositions = [];

    resetBackupAcknowledgements();

    if (state.wallet) {
      restoreMnemonicAfterBackupCancellation();
    }
  }

  function completeBackupVerification() {
    const allConfirmed =
      elements.backupAcknowledgements.every(
        (button) =>
          button.getAttribute("aria-pressed") ===
          "true"
      );

    if (!allConfirmed || !state.wallet) {
      return;
    }

    if (
      elements.backupVerificationDialog?.open
    ) {
      elements.backupVerificationDialog.close();
    }

    elements.backupChallengeFields.replaceChildren();
    state.backupChallengePositions = [];

    clearWallet();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  /* =========================================================
     CLEAR WALLET
     ========================================================= */

  function clearWallet() {
    if (state.wallet) {
      state.wallet.mnemonic = "";
    }

    state.wallet = null;
    state.mnemonicVisible = true;
    state.backupChallengePositions = [];
    state.mnemonicVisibilityBeforeBackupVerification = true;

    if (elements.walletCard) {
      elements.walletCard.hidden = true;
    }

    if (elements.verificationCard) {
      elements.verificationCard.hidden = true;
    }

    if (elements.mnemonicGrid) {
      elements.mnemonicGrid.replaceChildren();
    }

    if (elements.address) {
      elements.address.textContent = "";
    }

    if (elements.derivationPath) {
      elements.derivationPath.textContent = "";
    }

    if (elements.fingerprint) {
      elements.fingerprint.textContent = "";
    }

    if (elements.xpub) {
      elements.xpub.textContent = "";
    }
  }

  function clearWalletData() {
    if (!state.wallet) return;

    openBackupVerification();
  }

  return {
    init
  };
})();

/* =========================================================
   START APPLICATION
   ========================================================= */

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    WalletApp.init,
    {
      once: true
    }
  );
} else {
  WalletApp.init();
}