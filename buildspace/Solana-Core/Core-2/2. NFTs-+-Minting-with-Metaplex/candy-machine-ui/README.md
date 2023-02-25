# Metaplex Candy Machine Reference UI

## NOTICE
- Currently facing a ```Error: Invalid option tokenMint``` error, unable to fix this issue, skipping this project ...

## Tip
- Run ```export NODE_OPTIONS=--openssl-legacy-provider``` in your terminal if you encounter ```error:0308010C:digital envelope routines::unsupported```.
- If the loading of webpage using ```http://localhost:3000/``` is very slow, use ```http://127.0.0.1:3000/``` instead.
- If the 'Mint' button on the webpage is unclickable, try the followings:
    - Ensure that the Candy Machine config.json is updated with 'goLiveDate' value (cannot be NULL)
        - Once this is updated, remember to use ```sugar update``` at the project workspace.
    - Change ```REACT_APP_SOLANA_RPC_HOST``` URL
    - Update ```REACT_APP_CANDY_MACHINE_ID```, delete ```yarn.lock```, and run ```yarn install && yarn start```
