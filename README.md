# my-solana-projects

## Learning Journey

- [(solana-facebook) Create a Solana dApp from scratch by lorisleiva](https://lorisleiva.com/create-a-solana-dapp-from-scratch)
    - The intend was to do a facebook version from the original [solana-twitter](https://github.com/lorisleiva/solana-twitter/tree/main).
    - On hold as of now
- [(SimpleCounter) The Complete Guide to Full Stack Solana Development with React, Anchor, Rust, and Phantom](https://dev.to/edge-and-node/the-complete-guide-to-full-stack-solana-development-with-react-anchor-rust-and-phantom-3291)
- [(buildspace/Solana-Core) Solana Core](https://buildspace.so/p/solana-core)
    - In progress (Core-3)
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
- For each project folder, install using 
    ```
    npm i
    ```

## Useful APIs / CLI References

- Solana Web3 (*@solana/web3.js*): https://solana-labs.github.io/solana-web3.js/
- Solana Wallet Adapter (*@solana/wallet-adapter...*): https://solana-labs.github.io/wallet-adapter/
- Solana SPL Token (*@solana/spl-token*): https://solana-labs.github.io/solana-program-library/token/js/
- Metaplex Foundation (*@metaplex-foundation/js*): https://metaplex-foundation.github.io/js/modules/js.html
- Solana Program Crate (*solana_program::{...}*): https://docs.rs/solana-program/latest/solana_program/
- Solana CLI Documentation: https://docs.solana.com/cli

## Useful Commands to Set Up Projects

- VueJS App: ```vue create app --force```
- Next.js App: ```npx create-next-app --typescript```
- Solana Client: ```npx create-solana-client <project folder name> --initialize-keypair```
- [Solana dApp Scaffold (Next.js)](https://github.com/solana-labs/dapp-scaffold)
- [Solana dApp Scaffold (VueJS)](https://github.com/solana-developers/dapp-scaffold-vue)
- [Solana Pay Scaffold](https://github.com/solana-labs/solana-pay-scaffold)
- Rust Project: ```cargo new --lib <project folder name>```

## Tips

- [How to polyfill node core modules in webpack 5](https://alchemy.com/blog/how-to-polyfill-node-core-modules-in-webpack-5)
- [export ‘Provider’ (imported as ‘Provider’) was not found in ‘@project-serum/anchor’](https://medium.com/illumination/export-provider-imported-as-provider-was-not-found-in-project-serum-anchor-b6f3dcc34601)
- [How do I make Git forget about a file that was tracked, but is now in .gitignore?](https://stackoverflow.com/questions/1274057/how-do-i-make-git-forget-about-a-file-that-was-tracked-but-is-now-in-gitignore)
- [Fix React 'Hydration failed because the initial UI does not match what was rendered on the server' error](https://github.com/metaplex-foundation/js-examples/pull/34/files)
- [How to create symbolic links in Linux](https://www.hostinger.com/tutorials/how-to-create-symbolic-links-in-linux/)
- [Frequent BSOD while working on WSL for Rust development](https://github.com/microsoft/vscode-remote-release/issues/988)
