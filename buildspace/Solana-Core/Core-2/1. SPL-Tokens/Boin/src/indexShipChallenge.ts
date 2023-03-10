import { initializeKeypair } from "./initializeKeypair"
import * as web3 from "@solana/web3.js"
import * as token from "@solana/spl-token"
import {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
  toMetaplexFile,
  findMetadataPda
} from "@metaplex-foundation/js"
import {
  DataV2,
  createCreateMetadataAccountV2Instruction,
  createUpdateMetadataAccountV2Instruction,
} from "@metaplex-foundation/mpl-token-metadata"
import * as fs from "fs"

const tokenName = "Pooh"
const description = "Whoever holds this token is a Pooh hodler"
const symbol = "POOH"
const decimals = 2
const amount = 1

async function main() {
  const connection = new web3.Connection(web3.clusterApiUrl("devnet"))
  const user = await initializeKeypair(connection)

  console.log("PublicKey:", user.publicKey.toBase58())

  /* CREATE A NEW TOKEN MINT INPUTS */

  // rent for token mint
  const lamports = await token.getMinimumBalanceForRentExemptMint(connection);

  // keypair for new token mint
  const mintKeypair = web3.Keypair.generate()

  // program ID
  const programId = token.TOKEN_PROGRAM_ID

  // mint authority
  const mintAuthority = user.publicKey

  // freeze authority
  const freezeAuthority = user.publicKey

  /* CREATE A METADATA ACCOUNT FOR THE TOKEN MINT */

  // metaplex setup
  const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(user))
    .use(
      bundlrStorage({
        address: "https://devnet.bundlr.network",
        providerUrl: "https://api.devnet.solana.com",
        timeout: 60000,
      })
    )
  
  // file to buffer
  const buffer = fs.readFileSync("assets/pooh_bear.jpg")

  // buffer to metaplex file
  const file = toMetaplexFile(buffer, "pooh_bear.jpg")

  // upload image and get image uri
  const imageUri = await metaplex.storage().upload(file)

  // upload metadata and get metadata uri (off chain metadata)
  const { uri } = await metaplex
    .nfts()
    .uploadMetadata({
      name: tokenName,
      description: description,
      image: imageUri,
    })

  // get metadata account address
  // const metadataPDA = metaplex.nfts().pdas().metadata({mintKeypair.publicKey})
  const metadataPDA = await findMetadataPda(mintKeypair.publicKey)

  // onchain metadata format
  const tokenMetadata = {
    name: tokenName,
    symbol: symbol,
    uri: uri,
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null,
  } as DataV2

  const transaction = new web3.Transaction().add(
      
      // create new account
      web3.SystemProgram.createAccount({
          fromPubkey: user.publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space: token.MINT_SIZE,
          lamports: lamports,
          programId: programId,
      }),

      // create new token mint
      token.createInitializeMintInstruction(mintKeypair.publicKey, decimals, mintAuthority, freezeAuthority, programId),
      
      //create metadata account
      createCreateMetadataAccountV2Instruction(
        {
          metadata: metadataPDA,
          mint: mintKeypair.publicKey,
          mintAuthority: user.publicKey,
          payer: user.publicKey,
          updateAuthority: user.publicKey,
        },
        {
          createMetadataAccountArgsV2: {
            data: tokenMetadata,
            isMutable: true,
          },
        }
      )
  );

  /* CREATE A TOKEN ACCOUNT */

  // program ID
  const associatedTokenProgramId = token.ASSOCIATED_TOKEN_PROGRAM_ID

  // commitment
  const commitment = "finalized"

  // get associated token account address for use
  const associatedToken = await token.getAssociatedTokenAddress(
    mintKeypair.publicKey,
    user.publicKey,
    false,
    programId,
    associatedTokenProgramId
  );

  let account: token.Account;
  try {
      account = await token.getAccount(connection, associatedToken, commitment, programId);
  } catch (error: unknown) {
      if (error instanceof token.TokenAccountNotFoundError || error instanceof token.TokenInvalidAccountOwnerError) {
          try {
            transaction.add(
              // add instruction to create token account if one does not exist
              token.createAssociatedTokenAccountInstruction(
                  user.publicKey,
                  associatedToken,
                  user.publicKey,
                  mintKeypair.publicKey,
                  programId,
                  associatedTokenProgramId
              )
            );

          } catch (error: unknown) {}
      } else {
          throw error;
      }
  }

  transaction.add(
    // mint tokens to token account
    token.createMintToInstruction(
      mintKeypair.publicKey,
      associatedToken,
      user.publicKey,
      amount * Math.pow(10, decimals)
    )
  )

  // send transaction
  const transactionSignature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [user, mintKeypair],
  )

  console.log(
    `Transaction: https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`
  )

}

main()
  .then(() => {
    console.log("Finished successfully")
    process.exit(0)
  })
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
