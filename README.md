# Bitcoin Wallet Generator

A minimal, browser-based Bitcoin wallet generator focused on transparency, portability, and offline use.

The application generates a BIP39 recovery phrase locally, derives a BIP84 native SegWit wallet, and verifies the resulting address before displaying it. Wallet secrets are not submitted to a backend or sent to the Bitcoin network.

[View the repository](https://github.com/B3POio/bitcoin-wallet-generator)

## Features

- 12-word and 24-word BIP39 recovery phrases
- BIP32 hierarchical deterministic keys
- BIP84 native SegWit receiving addresses
- Bitcoin Mainnet, Testnet, Signet, and Regtest
- Independent wallet integrity verification
- Light and dark themes
- Multilingual interface with RTL support
- Printable offline backup
- Responsive desktop and mobile layout
- No account, analytics, or wallet backend required

## Networks

| Network | Address prefix | Coin type | Intended use |
| --- | --- | ---: | --- |
| Mainnet | `bc1` | `0'` | Real Bitcoin |
| Testnet | `tb1` | `1'` | Public testing |
| Signet | `tb1` | `1'` | Controlled public testing |
| Regtest | `bcrt1` | `1'` | Local development |

Changing the selected network updates the address format, extended-key version, derivation path, interface badge, and verification parameters. Any wallet already displayed is cleared when the network changes.

## Requirements

- A current version of Node.js and npm
- A modern browser with `window.crypto.getRandomValues`
- HTTPS or `localhost` for a secure browser context

## Setup

Clone the repository and switch into the project directory:

```bash
git clone https://github.com/B3POio/bitcoin-wallet-generator.git
cd bitcoin-wallet-generator
```

Install the project dependencies:

```bash
npm install
```

Build the production JavaScript bundle:

```bash
npm run build
```

Serve the project through `localhost` instead of opening `index.html` directly:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080` in your browser.

## Development

Create an unminified bundle with a source map:

```bash
npm run build:dev
```

The browser loads `js/app.bundle.js`. Source modules such as `js/app.js` and `js/i18n.js` are bundled by esbuild, so changes to those files require rebuilding the bundle.

```text
.
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── i18n.js
│   └── app.bundle.js
└── package.json
```

## Using the App

1. Select the intended Bitcoin network.
2. Choose a 12-word or 24-word recovery phrase.
3. Select **Generate New Wallet**.
4. Write down the recovery phrase in the correct order.
5. Verify and securely store the backup before using the receiving address.
6. Destroy the displayed wallet when finished.

Use Testnet, Signet, or Regtest while evaluating the application. Only use Mainnet after independently reviewing the source, dependencies, build output, and generated wallet data.

## Security

This project handles wallet secrets and should be treated as security-sensitive software.

- Generate valuable wallets on a trusted, malware-free computer.
- Download and inspect the source before using it offline.
- Verify the repository, dependency versions, and production bundle.
- Disconnect from the internet before generating a wallet intended to hold funds.
- Never share, upload, photograph, email, or paste a recovery phrase into a website.
- Never store a recovery phrase in cloud notes or an unencrypted file.
- Confirm derived addresses with a second trusted implementation or hardware wallet.
- Keep multiple durable backups in physically separate, secure locations.
- Use only the selected network's addresses and keys.

JavaScript cannot guarantee complete removal of sensitive values from browser memory. The application overwrites accessible entropy, seed, and private-key buffers where practical, but the browser runtime and garbage collector may retain copies temporarily.

The online interface may request public version metadata and external visual assets. Wallet creation and derivation do not require a Bitcoin node or wallet API. For the strongest isolation, download the project, review and build it, disconnect the computer, and serve the local files without external connectivity.

## Important Notice

This software has not been independently audited. It is provided without a guarantee of security or fitness for storing funds. Do not use it with significant value until you have independently verified the implementation and accepted the risks.

## Standards and Libraries

The project is built around established Bitcoin standards and maintained open-source libraries:

- [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) — hierarchical deterministic wallets
- [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) — mnemonic recovery phrases
- [BIP84](https://github.com/bitcoin/bips/blob/master/bip-0084.mediawiki) — native SegWit derivation
- [bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib)
- [bip32](https://github.com/bitcoinjs/bip32)
- [bip39](https://github.com/bitcoinjs/bip39)
- [tiny-secp256k1](https://github.com/bitcoinjs/tiny-secp256k1)
- [esbuild](https://github.com/evanw/esbuild)

## Creator

Created and maintained by [B3POio](https://github.com/B3POio).

Project source, releases, issues, and contribution history are available in the [Bitcoin Wallet Generator GitHub repository](https://github.com/B3POio/bitcoin-wallet-generator).

Contributions and careful security review are welcome.