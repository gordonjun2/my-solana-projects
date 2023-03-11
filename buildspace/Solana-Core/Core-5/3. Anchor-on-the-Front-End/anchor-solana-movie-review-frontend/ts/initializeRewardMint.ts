import { initializeKeypair } from "./initializeKeypair"
import * as token from "@solana/spl-token";
import { Wallet, Program, AnchorProvider, web3, Idl, setProvider } from "@project-serum/anchor";
import { IDL } from "../context/Anchor/movie_review"
import * as fs from "fs"
import {
    Metaplex,
    keypairIdentity,
    bundlrStorage,
    toMetaplexFile,
  } from "@metaplex-foundation/js"

const PROGRAM_ID = new web3.PublicKey(
    "CkKivfQPsd9c5bpZhSLzwBvGLTAKHnuAk2WYTPLo57Gc"
)

const TOKEN_NAME = "BloveCoin"
const TOKEN_SYMBOL = "BLOVE"
const TOKEN_DESCRIPTION = "Baby love"

async function initializeProgramTokenMint(
    connection: web3.Connection,
    signer: web3.Keypair,
    wallet: Wallet,
    programId: web3.PublicKey,
    metaplex: Metaplex,
    )   {

    const provider = new AnchorProvider(connection, wallet, {})
  
    setProvider(provider)
    const program = new Program(IDL as Idl, programId)

    const [mintPDA] = await web3.PublicKey.findProgramAddress(
        [Buffer.from("mint")],
        program.programId
    )

    // file to buffer
    const buffer = fs.readFileSync("assets/blove.jpeg")

    // buffer to metaplex file
    const file = toMetaplexFile(buffer, "blove.jpeg")

    // upload image and get image uri
    const imageUri = await metaplex.storage().upload(file)
    console.log("image uri:", imageUri)

    // upload metadata and get metadata uri (off chain metadata)
    const { uri } = await metaplex
        .nfts()
        .uploadMetadata({
        name: TOKEN_NAME,
        description: TOKEN_DESCRIPTION,
        image: imageUri,
        })
    
    console.log("metadata uri:", uri)

    // get metadata account address
    const metadataPDA = metaplex.nfts().pdas().metadata({mintPDA})

    const tx = await program.methods
        .createRewardMint(uri, TOKEN_NAME, TOKEN_SYMBOL)
        .accounts({
            rewardMint: mintPDA,
            user: signer.publicKey,
            systemProgram: web3.SystemProgram.programId,
            rent: web3.SYSVAR_RENT_PUBKEY,
            tokenProgram: token.TOKEN_PROGRAM_ID,
            metadata: mintPDA,
            tokenMetadataProgram: metadataPDA
        })
        .rpc()


    console.log(
        `Transaction submitted: https://explorer.solana.com/tx/${tx}?cluster=devnet`
    )
}

async function main() {
    const connection = new web3.Connection(web3.clusterApiUrl("devnet")) //"http://localhost:8899"
    const signer = await initializeKeypair(connection)

    // metaplex setup
    const metaplex = Metaplex.make(connection)
        .use(keypairIdentity(signer))
        .use(
            bundlrStorage({
                address: "https://devnet.bundlr.network",
                providerUrl: "https://api.devnet.solana.com",
                timeout: 60000,
            })
        )

    const wallet = new Wallet(signer)

    const txid = await initializeProgramTokenMint(connection, signer, wallet, PROGRAM_ID, metaplex)
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
