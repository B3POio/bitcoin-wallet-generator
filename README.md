# Bitcoin Wallet Generator

A minimal, browser-based Bitcoin wallet generator focused on transparency, portability, offline use, and verifiable wallet generation.

The application generates a BIP39 recovery phrase locally, derives a BIP84 native SegWit wallet, and performs a consistency check by re-deriving the generated wallet data before displaying it.

Wallet secrets are generated locally in the browser and are not submitted to a backend, Bitcoin node, wallet API, analytics service, or other remote service.

[View the repository](https://github.com/B3POio/bitcoin-wallet-generator)

## Features

- Generate 12-word or 24-word BIP39 recovery phrases
- Derive hierarchical deterministic keys using BIP32
- Generate BIP84 native SegWit receiving addresses
- Support for Bitcoin Mainnet, Testnet, Signet, and Regtest
- Display the wallet derivation path
- Display the master fingerprint
- Display the account extended public key
- Re-derive and verify generated wallet data for consistency
- Perform a BIP84 cryptographic self-test before wallet generation is enabled
- Copy wallet addresses and recovery phrases
- Hide or reveal the recovery phrase
- Print a physical wallet backup
- Clear displayed wallet information when finished
- Light and dark themes
- Multilingual interface with RTL support
- Responsive desktop and mobile interface
- No account, analytics, wallet server, Bitcoin node, or backend API required
- Direct offline use without a local web server

## Networks

| Network | Address prefix | Coin type | Intended use |
| --- | --- | ---: | --- |
| Mainnet | `bc1` | `0'` | Real Bitcoin |
| Testnet | `tb1` | `1'` | Public testing |
| Signet | `tb1` | `1'` | Controlled public testing |
| Regtest | `bcrt1` | `1'` | Local development |

Changing the selected network updates the address format, key parameters, derivation path, interface badge, and consistency-check parameters.

Any wallet already displayed is cleared when the selected network changes.

## Local Wallet Generation

Wallet creation and key derivation occur entirely inside the browser.

The application does not require:

- an account
- a wallet server
- a Bitcoin node
- a backend API
- analytics
- telemetry
- an internet connection

Cryptographic entropy is generated using the browser's `window.crypto.getRandomValues()` implementation.

The application will not enable wallet generation if a cryptographically secure random-number generator is unavailable.

## Cryptographic Self-Test

Before wallet generation is enabled, the application performs a deterministic cryptographic self-test using a published BIP84 test vector.

The test verifies that the bundled BIP39, BIP32, secp256k1, and Bitcoin address-generation libraries reproduce the expected public key and native SegWit address.

If the self-test fails, wallet generation is disabled.

This helps detect:

- broken builds
- incompatible dependency changes
- bundling errors
- unexpected cryptographic behavior

The self-test does not replace independent security review.

## Wallet Consistency Check

After generating a wallet, the application re-derives the wallet from the generated recovery phrase and confirms that the resulting:

- receiving address
- public key
- account extended public key

match the values originally generated.

This is a consistency check rather than an independent cryptographic implementation because the same bundled libraries are used for both derivations.

For additional assurance, independently verify important wallet data using another trusted Bitcoin implementation or hardware wallet.

## Offline Use

The application is designed to work directly from downloaded files.

You do **not** need to run a localhost server.

For offline use:

1. Download the project or official release.
2. Verify the downloaded files when release checksums are available.
3. Disconnect the computer from the internet.
4. Open `index.html` directly in a modern browser.
5. Generate the wallet.
6. Write down and verify the recovery phrase.
7. Clear the displayed wallet data when finished.

The application supports direct `file://` execution.

All assets required by the application are stored locally.

The application does not automatically load icons, scripts, metadata, fonts, or other resources from external servers.

Links to GitHub and bitcoin.org remain available but are only accessed when explicitly selected by the user.

## Network Isolation

The application uses a restrictive Content Security Policy.

Runtime network connections are prohibited with:

```text
connect-src 'none'
```

This prevents the application from initiating connections using mechanisms such as:

- `fetch`
- XMLHttpRequest
- WebSockets
- EventSource
- Beacon requests

The application therefore does not need network access to generate, derive, verify, display, or clear a wallet.

## Requirements

### Using the application

- A modern browser
- Support for `window.crypto.getRandomValues()`

No Node.js installation or local web server is required to use a downloaded build.

### Building from source

- A current version of Node.js
- npm

## Setup

Clone the repository:

```bash
git clone https://github.com/B3POio/bitcoin-wallet-generator.git
cd bitcoin-wallet-generator
```

Install the exact dependency versions defined by the lockfile:

```bash
npm ci
```

Build the production JavaScript bundle:

```bash
npm run build
```

You may then open:

```text
index.html
```

directly in your browser.

A localhost server may still be used during development if preferred:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Development

Create an unminified development bundle with a source map:

```bash
npm run build:dev
```

The browser loads:

```text
js/app.bundle.js
```

Source modules such as:

```text
js/app.js
js/i18n.js
```

are bundled by esbuild.

Changes to those source files require rebuilding the bundle.

The project structure includes:

```text
.
├── index.html
├── assets/
│   ├── bitcoin.svg
│   └── github.svg
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── app.bundle.js
│   ├── i18n.js
│   ├── release-info.js
│   └── theme-init.js
├── package.json
└── package-lock.json
```

## Using the App

1. Select the intended Bitcoin network.
2. Choose a 12-word or 24-word recovery phrase.
3. Select **Generate New Wallet**.
4. Write down the recovery phrase in the correct order.
5. Verify the displayed wallet information.
6. Securely store the recovery phrase before using the receiving address.
7. Select **Clear Wallet Data** when finished.

Use Testnet, Signet, or Regtest while evaluating the application.

Only use Mainnet after independently reviewing the source, dependencies, build output, and generated wallet data.

## Recovery Phrase Security

The recovery phrase provides complete control over the Bitcoin associated with the wallet.

Never:

- share the recovery phrase
- upload it to a website
- email or message it
- photograph it
- store it in cloud notes
- store it in an unencrypted file
- paste it into an untrusted application

### Clipboard

Copying a recovery phrase places sensitive data outside the application's memory boundary.

Clipboard history, clipboard managers, operating-system synchronization, remote-desktop software, or other applications may retain copied information.

Writing the recovery phrase down manually is preferable when practical.

### Printing

Printers and operating systems may retain print jobs.

Avoid network, cloud, shared, or otherwise untrusted printers when printing a recovery phrase.

## Sensitive Data Handling

Private wallet material is retained only for as long as necessary during derivation.

The application does not intentionally keep the following private-key-capable objects in long-lived application state:

- entropy
- BIP39 seed
- BIP32 root private node
- BIP32 account private node
- BIP32 receiving private node

Accessible entropy, seed, and private-key buffers are overwritten where practical after they are no longer required.

The recovery phrase must remain available while the wallet is displayed and is therefore retained by the application until the wallet data is cleared.

JavaScript cannot guarantee complete removal of sensitive values from process memory. Browser runtimes, memory allocation, immutable strings, and garbage collection may temporarily retain copies of sensitive information.

**Clear Wallet Data** removes application references and displayed wallet information but should not be interpreted as guaranteed forensic memory erasure.

## Release Integrity

Release metadata is generated from the final release source rather than retrieved from GitHub when the application runs.

Release builds include or will include:

- application version
- source Git commit
- SHA-256 release checksums
- release manifest information

This allows an offline copy to retain its release identity without requiring network access.

Users should verify official release checksums before generating wallets intended to store meaningful value.

## Security Recommendations

This project handles wallet secrets and should be treated as security-sensitive software.

- Generate valuable wallets on a trusted, malware-free computer.
- Prefer a verified offline copy for Mainnet wallets containing meaningful value.
- Review the source before using it.
- Verify dependency versions and the production bundle.
- Verify release checksums when available.
- Disconnect from the internet before generating a wallet intended to hold funds.
- Confirm important derived addresses using a second trusted Bitcoin implementation or hardware wallet.
- Keep durable recovery-phrase backups in secure locations.
- Never expose a recovery phrase to an online service.
- Verify that the selected Bitcoin network is correct before using an address.

Browser extensions, malware, compromised operating systems, compromised build environments, and maliciously modified application files remain outside the protections provided by the application itself.

## Important Notice

This software has not been independently audited.

It is provided without a guarantee of security or fitness for storing funds.

Do not use it with significant value until you have independently verified the implementation, dependencies, release artifact, and generated wallet data and have accepted the associated risks.

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