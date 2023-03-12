# my-solana-projects

## Learning Journey

- [(solana-facebook) Create a Solana dApp from scratch by lorisleiva](https://lorisleiva.com/create-a-solana-dapp-from-scratch)
    - The intend was to do a facebook version from the original [solana-twitter](https://github.com/lorisleiva/solana-twitter/tree/main).
    - On hold as of now
- [(SimpleCounter) The Complete Guide to Full Stack Solana Development with React, Anchor, Rust, and Phantom](https://dev.to/edge-and-node/the-complete-guide-to-full-stack-solana-development-with-react-anchor-rust-and-phantom-3291)
- [(buildspace/Solana-Core) Solana Core](https://buildspace.so/p/solana-core)
    - In progress (Core-5)
- [(buildspace/Solana-dApp-Anime-Wall) Create and Deploy your first Solana dApp](https://buildspace.so/p/build-solana-web3-app)
    - Future
- [(buildspace/Solana-NFT) Ship an NFT Collection on Solana](https://buildspace.so/p/ship-solana-nft-collection)
    - Future

## General Installation

- Follow the installation process [here](https://lorisleiva.com/create-a-solana-dapp-from-scratch/getting-started-with-solana-and-anchor).
    - Install Rust
    - Install Solana
    - Install NVM
    - Install Node.js
    - Install Mocha
    - Install Yarn
    - Install Anchor
- Install Sugar: Candy Machine CLI [here](https://docs.metaplex.com/developer-tools/sugar/overview/installation)
- Install Chai using
```
npm install chai
```
- For each project folder, install using 
    ```
    npm i
    ```

## Useful APIs / CLI References

- Solana Web3 (*@solana/web3.js*): https://solana-labs.github.io/solana-web3.js/
- Solana Wallet Adapter (*@solana/wallet-adapter...*): https://solana-labs.github.io/wallet-adapter/
- Solana Wallet Adapter WalletContextState (*@solana/wallet-adapter-react...*): https://solana-labs.github.io/wallet-adapter/interfaces/_solana_wallet_adapter_react.WalletContextState.html#sendTransaction
- Solana SPL Token (*@solana/spl-token*): https://solana-labs.github.io/solana-program-library/token/js/
- Metaplex Foundation (*@metaplex-foundation/js*): https://metaplex-foundation.github.io/js/modules/js.html
- Solana CLI Documentation: https://docs.solana.com/cli
- Rust Community's Crate Registry: https://crates.io/
- Solana Program Crate (*solana_program::{...}*): https://docs.rs/solana-program/latest/solana_program/
- SPL Associated Token Account Crate (*spl-associated-token-account::{...}*): https://docs.rs/spl-associated-token-account/latest/spl_associated_token_account/
- SPL Token Crate (*spl_token::{...}*): https://docs.rs/spl-token/latest/spl_token/
- Solana SDK Crate (*solana_sdk::{...}*): https://docs.rs/solana-sdk/latest/solana_sdk/
- Solana Program Test Crate (*solana_program_test::{...}*): https://docs.rs/solana-program-test/latest/solana_program_test/
- Anchor CLI Documentation: https://www.anchor-lang.com/docs/cli
- Anchor Crate (*anchor_lang::{...}*): https://docs.rs/anchor-lang/latest/anchor_lang/
- Project-Serum Anchor (*@project-serum/anchor*): https://coral-xyz.github.io/anchor/ts/index.html

## Useful Commands to Set Up Projects

- VueJS App: ```vue create app --force```
- Next.js App: ```npx create-next-app --typescript```
- Solana Client: ```npx create-solana-client <project folder name> --initialize-keypair```
- [Solana dApp Scaffold (Next.js)](https://github.com/solana-labs/dapp-scaffold)
- [Solana dApp Scaffold (VueJS)](https://github.com/solana-developers/dapp-scaffold-vue)
- [Solana Pay Scaffold](https://github.com/solana-labs/solana-pay-scaffold)
- Rust Project: ```cargo new --lib <project folder name>```
- Anchor Project: ```anchor init <project folder name>```

## Tips

- [Convert PublicKey to String](https://solana.stackexchange.com/questions/3514/publickey-tostring-vs-publickey-tobase58)
- [How to polyfill node core modules in webpack 5](https://alchemy.com/blog/how-to-polyfill-node-core-modules-in-webpack-5)
- [export ‘Provider’ (imported as ‘Provider’) was not found in ‘@project-serum/anchor’](https://medium.com/illumination/export-provider-imported-as-provider-was-not-found-in-project-serum-anchor-b6f3dcc34601)
- [How do I make Git forget about a file that was tracked, but is now in .gitignore?](https://stackoverflow.com/questions/1274057/how-do-i-make-git-forget-about-a-file-that-was-tracked-but-is-now-in-gitignore)
- [Fix React 'Hydration failed because the initial UI does not match what was rendered on the server' error](https://github.com/metaplex-foundation/js-examples/pull/34/files)
- [How to create symbolic links in Linux](https://www.hostinger.com/tutorials/how-to-create-symbolic-links-in-linux/)
- [Frequent BSOD while working on WSL for Rust development](https://github.com/microsoft/vscode-remote-release/issues/988)
- If the error below occurs when building Rust program using ```cargo build-bpf```, open up the *Cargo.toml* file, and ensure that the *solana-program* version under *[dependencies]* matches the installed Solana version (use ```solana --version``` to check).
    ```
    [ERROR cargo_build_sbf] Failed to obtain package metadata: `cargo metadata` exited with an error: 
    Updating crates.io index 
    Downloading crates ... 
    Downloaded solana-program v1.14.16 error: failed to parse manifest at `/home/gordonjun/.cargo/registry/src/github.com-1ecc6299db9ec823/solana-program-1.14.16/Cargo.toml` 
    Caused by: virtual manifests must be configured with [workspace]
    ```
- [SPL Token Program Error Codes Reference](https://github.com/solana-labs/solana-program-library/blob/master/token/program/src/error.rs)
- [Metaplex Program Error Codes Reference](https://github.com/metaplex-foundation/metaplex-program-library/blob/45a97b2edbfd6aff34df4ee3e56194008f71bba7/token-metadata/program/src/error.rs#L15)
- [Anchor Framework Error Codes Reference](https://github.com/coral-xyz/anchor/blob/master/lang/src/error.rs#L158)
- [Error: failed to send transaction: Transaction simulation failed: Error processing Instruction 0: custom program error: 0x0](https://solana.stackexchange.com/questions/3355/error-failed-to-send-transaction-transaction-simulation-failed-error-processi)
- If the error below occurs, ensure that each seed's length is not more than 32 (refer the code [here](https://gist.github.com/jeduan/3fc20fb788a95b8de563c914c4187a6d)).
    ```
    TypeError: Max seed length exceeded
    ```


