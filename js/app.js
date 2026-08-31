"use strict";

import { Buffer } from "buffer";
import * as bitcoin from "bitcoinjs-lib";
import * as bip39 from "bip39";
import BIP32Factory from "bip32";
import * as ecc from "@bitcoin-js/tiny-secp256k1-asmjs";

globalThis.Buffer = Buffer;

const bip32 = BIP32Factory(ecc);

const WalletApp = (() => {
  const CONFIG = {
    networks: {
      bitcoin: {
        name: "Bitcoin Mainnet",
        badge: "MAINNET",
        coinType: 0,
        network: bitcoin.networks.bitcoin
      },
      testnet: {
        name: "Bitcoin Testnet",
        badge: "TESTNET",
        coinType: 1,
        network: bitcoin.networks.testnet
      }
    },
    entropy: {
      12: 128,
      24: 256
    }
  };

  const state = {
    wallet: null,
    mnemonicVisible: true
  };

  const elements = {};

  function init() {
    cacheElements();
    bindEvents();
    checkBrowserSecurity();
  }

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
    elements.toggleMnemonicButton = document.getElementById(
      "toggleMnemonicButton"
    );
    elements.copyMnemonicButton = document.getElementById(
      "copyMnemonicButton"
    );
    elements.address = document.getElementById("address");
    elements.copyAddressButton = document.getElementById("copyAddressButton");
    elements.derivationPath = document.getElementById("derivationPath");
    elements.fingerprint = document.getElementById("fingerprint");
    elements.xpub = document.getElementById("xpub");
    elements.printButton = document.getElementById("printButton");
    elements.destroyButton = document.getElementById("destroyButton");
    elements.verificationCard = document.getElementById("verificationCard");
  }

  function bindEvents() {
    elements.generateButton.addEventListener("click", generateWallet);
    elements.toggleMnemonicButton.addEventListener(
      "click",
      toggleMnemonicVisibility
    );
    elements.copyMnemonicButton.addEventListener("click", copyMnemonic);
    elements.copyAddressButton.addEventListener("click", copyAddress);
    elements.printButton.addEventListener("click", printBackup);
    elements.destroyButton.addEventListener("click", destroyWallet);
  }

  function checkBrowserSecurity() {
    const cryptoAvailable =
      window.crypto &&
      typeof window.crypto.getRandomValues === "function";

    if (!cryptoAvailable) {
      setSecurityStatus(
        false,
        "Secure random number generation unavailable"
      );

      elements.generateButton.disabled = true;

      throw new Error(
        "This browser does not provide a cryptographically secure random number generator."
      );
    }

    const secureContext = window.isSecureContext === true;

    if (!secureContext) {
      setSecurityStatus(false, "HTTPS or localhost recommended");
      elements.offlineWarning.hidden = false;
    } else {
      setSecurityStatus(
        true,
        "Secure random number generator available"
      );

      elements.offlineWarning.hidden = true;
    }
  }

  function setSecurityStatus(secure, message) {
    elements.securityStatus.classList.toggle("secure", secure);
    elements.securityStatusText.textContent = message;
  }

  function generateEntropy(bits) {
    if (bits !== 128 && bits !== 256) {
      throw new Error("Unsupported entropy size.");
    }

    const byteLength = bits / 8;
    const entropy = new Uint8Array(byteLength);

    window.crypto.getRandomValues(entropy);

    return entropy;
  }

  function bytesToHex(bytes) {
    let result = "";

    for (let i = 0; i < bytes.length; i++) {
      result += bytes[i].toString(16).padStart(2, "0");
    }

    return result;
  }

  function generateWallet() {
    let entropy = null;
    let seed = null;

    try {
      elements.generateButton.disabled = true;
      elements.generateButton.textContent = "Generating...";

      clearWallet();

      const networkKey = elements.network.value;
      const networkConfig = CONFIG.networks[networkKey];

      if (!networkConfig) {
        throw new Error("Invalid Bitcoin network.");
      }

      const wordCount = Number(elements.wordCount.value);
      const entropyBits = CONFIG.entropy[wordCount];

      if (!entropyBits) {
        throw new Error("Invalid recovery phrase length.");
      }

      entropy = generateEntropy(entropyBits);

      const entropyHex = bytesToHex(entropy);

      const mnemonic = bip39.entropyToMnemonic(entropyHex);

      const mnemonicValid = bip39.validateMnemonic(mnemonic);

      if (!mnemonicValid) {
        throw new Error(
          "Generated recovery phrase failed BIP39 validation."
        );
      }

      seed = bip39.mnemonicToSeedSync(mnemonic);

      const root = bip32.fromSeed(
        seed,
        networkConfig.network
      );

      const accountPath =
        "m/84'/" + networkConfig.coinType + "'/0'";

      const addressPath = accountPath + "/0/0";

      const receivingNode = root.derivePath(addressPath);

      if (!receivingNode.privateKey) {
        throw new Error("Unable to derive private key.");
      }

      const payment = bitcoin.payments.p2wpkh({
        pubkey: receivingNode.publicKey,
        network: networkConfig.network
      });

      if (!payment.address) {
        throw new Error("Unable to generate Bitcoin address.");
      }

      const account = root.derivePath(accountPath);
      const accountPublicKey = account.neutered();
      const xpub = accountPublicKey.toBase58();
      const fingerprint = root.fingerprint;

      state.wallet = {
        networkKey,
        network: networkConfig.network,
        networkName: networkConfig.name,
        mnemonic,
        seed,
        root,
        account,
        receivingNode,
        address: payment.address,
        publicKey: receivingNode.publicKey,
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
      console.error("Wallet generation error:", error);

      clearWallet();

      window.alert(
        "Wallet generation failed.\n\n" +
          (error instanceof Error ? error.message : String(error))
      );
    } finally {
      if (entropy) {
        entropy.fill(0);
      }

      if (seed) {
        seed.fill(0);
      }

      elements.generateButton.disabled = false;
      elements.generateButton.textContent = "Generate New Wallet";
    }
  }

  function renderWallet() {
    const wallet = state.wallet;

    if (!wallet) {
      return;
    }

    if (wallet.networkKey === "bitcoin") {
      elements.networkBadge.textContent = "MAINNET";
    } else {
      elements.networkBadge.textContent = "TESTNET";
    }

    renderMnemonic(wallet.mnemonic);

    elements.address.textContent = wallet.address;

    elements.derivationPath.textContent = wallet.addressPath;

    elements.fingerprint.textContent = bytesToHex(
      wallet.fingerprint
    );

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

    elements.mnemonicGrid.classList.remove("mnemonic-hidden");

    elements.toggleMnemonicButton.textContent =
      "Hide Recovery Phrase";
  }

  function toggleMnemonicVisibility() {
    if (!state.wallet) {
      return;
    }

    state.mnemonicVisible = !state.mnemonicVisible;

    elements.mnemonicGrid.classList.toggle(
      "mnemonic-hidden",
      !state.mnemonicVisible
    );

    elements.toggleMnemonicButton.textContent =
      state.mnemonicVisible
        ? "Hide Recovery Phrase"
        : "Reveal Recovery Phrase";
  }

  async function copyMnemonic() {
    if (!state.wallet) {
      return;
    }

    const confirmed = window.confirm(
      "Your recovery phrase gives complete control of this wallet.\n\n" +
        "Do not paste it into a website or send it to another person.\n\n" +
        "Copy the recovery phrase?"
    );

    if (!confirmed) {
      return;
    }

    await copyToClipboard(
      state.wallet.mnemonic,
      elements.copyMnemonicButton,
      "Copy Recovery Phrase"
    );
  }

  async function copyAddress() {
    if (!state.wallet) {
      return;
    }

    await copyToClipboard(
      state.wallet.address,
      elements.copyAddressButton,
      "Copy Address"
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
        typeof navigator.clipboard.writeText !== "function"
      ) {
        throw new Error("Clipboard API unavailable.");
      }

      await navigator.clipboard.writeText(text);

      const originalText = button.textContent;

      button.textContent = "Copied";

      window.setTimeout(() => {
        button.textContent =
          originalText || defaultLabel;
      }, 1500);
    } catch (error) {
      console.error("Clipboard error:", error);

      window.alert(
        "Unable to copy automatically.\n\n" +
          "Please copy the value manually."
      );
    }
  }

  function printBackup() {
    if (!state.wallet) {
      return;
    }

    const confirmed = window.confirm(
      "Before printing your recovery phrase:\n\n" +
        "• Make sure nobody can see your screen.\n" +
        "• Use a printer you trust.\n" +
        "• Never upload or photograph the phrase.\n" +
        "• Store the printed backup securely.\n\n" +
        "Continue?"
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
      bip39.mnemonicToSeedSync(wallet.mnemonic);

    const reconstructedRoot = bip32.fromSeed(
      reconstructedSeed,
      wallet.network
    );

    const reconstructedNode =
      reconstructedRoot.derivePath(
        wallet.addressPath
      );

    const reconstructedPayment =
      bitcoin.payments.p2wpkh({
        pubkey: reconstructedNode.publicKey,
        network: wallet.network
      });

    const addressMatches =
      reconstructedPayment.address === wallet.address;

    const publicKeyMatches = bytesEqual(
      reconstructedNode.publicKey,
      wallet.publicKey
    );

    const reconstructedAccount =
      reconstructedRoot.derivePath(
        wallet.accountPath
      );

    const reconstructedXpub =
      reconstructedAccount.neutered().toBase58();

    const xpubMatches =
      reconstructedXpub === wallet.xpub;

    reconstructedSeed.fill(0);

    if (
      !addressMatches ||
      !publicKeyMatches ||
      !xpubMatches
    ) {
      throw new Error(
        "Wallet integrity verification failed."
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

    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }

    return true;
  }

  function clearWallet() {
    if (state.wallet) {
      if (
        state.wallet.seed &&
        typeof state.wallet.seed.fill === "function"
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
        state.wallet.receivingNode.privateKey &&
        typeof state.wallet.receivingNode.privateKey.fill ===
          "function"
      ) {
        try {
          state.wallet.receivingNode.privateKey.fill(0);
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
      elements.verificationCard.hidden = true;
    }

    if (elements.mnemonicGrid) {
      elements.mnemonicGrid.innerHTML = "";
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

  function destroyWallet() {
    if (!state.wallet) {
      return;
    }

    const confirmed = window.confirm(
      "Destroy this wallet from the page?\n\n" +
        "Make absolutely certain that you have securely " +
        "backed up the recovery phrase first."
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
