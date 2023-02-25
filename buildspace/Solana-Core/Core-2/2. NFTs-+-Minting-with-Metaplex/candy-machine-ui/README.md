# Metaplex Candy Machine Reference UI

## NOTICE
- Currently facing a ```Error: Invalid option tokenMint``` error, unable to fix this issue, skipping this project ...
- To continue to the next section, go back to Candy Machine project workspace and mint some NFTs to wallet using
    ```
    sugar mint -n <no of tokens> --receiver <receiverWalletAddress>
    ```

## Tip
- Run ```export NODE_OPTIONS=--openssl-legacy-provider``` in your terminal if you encounter ```error:0308010C:digital envelope routines::unsupported```.
- If the loading of webpage using ```http://localhost:3000/``` is very slow, use ```http://127.0.0.1:3000/``` instead.
- If the 'Mint' button on the webpage is unclickable, try the followings:
    - Check that the Candy Machine ID address is Candy Machine V2 address (When installing Sugar CLI, select the legacy option that uses Metaplex Candy Machine V2.)
        - If it is not Candy Machine V2, reinstall Sugar CLI and select the legacy option.
        - Delete the *cache.json*, *config.json*, and *sugar.log* and then launch the collection again.
    - Ensure that the Candy Machine config.json is updated with 'goLiveDate' value (cannot be NULL)
        - Once this is updated, remember to use ```sugar update``` at the project workspace.
    - Change ```REACT_APP_SOLANA_RPC_HOST``` URL
