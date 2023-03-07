import * as borsh from '@project-serum/borsh'
import * as fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()
import { Wallet, Program, AnchorProvider, web3, BN } from "@project-serum/anchor";

function initializeSignerKeypair(): web3.Keypair {
    if (!process.env.PRIVATE_KEY) {
        console.log('Creating .env file')
        const signer = web3.Keypair.generate()
        fs.writeFileSync('.env',`PRIVATE_KEY=[${signer.secretKey.toString()}]`)
        return signer
    }
    
    const secret = JSON.parse(process.env.PRIVATE_KEY ?? "") as number[]
    const secretKey = Uint8Array.from(secret)
    const keypairFromSecretKey = web3.Keypair.fromSecretKey(secretKey)
    return keypairFromSecretKey
}

async function airdropSolIfNeeded(signer: web3.Keypair, connection: web3.Connection) {
    const balance = await connection.getBalance(signer.publicKey)
    console.log('Current balance is', balance)
    if (balance < web3.LAMPORTS_PER_SOL) {
        console.log('Airdropping 1 SOL...')
        await connection.requestAirdrop(signer.publicKey, web3.LAMPORTS_PER_SOL)
    }
}

type Counter = {
    count: BN;
  };

async function testCounter(wallet: Wallet, programId: web3.PublicKey, connection: web3.Connection) {
    
    const provider = new AnchorProvider(connection, wallet, {
        preflightCommitment: "processed",
        commitment: "processed",
    });

    // Read the generated IDL.
    const idl = JSON.parse(
        require("fs").readFileSync("./target/idl/simple_counter_anchor.json", "utf8")
    );

    const program = new Program(idl, programId, provider);

    const counter = web3.Keypair.generate()

    var tx = await program.methods
        .initialize()
        .accounts({ counter: counter.publicKey, user: provider.wallet.publicKey, systemProgram: web3.SystemProgram.programId })
        .signers([counter])
        .rpc()

    console.log(`https://explorer.solana.com/tx/${tx}?cluster=devnet`)

    var account = await program.account["counter"].fetch(counter.publicKey) as Counter

    console.log(account.count.toNumber())

    tx = await program.methods
        .increment()
        .accounts({ counter: counter.publicKey, user: provider.wallet.publicKey })
        .rpc()

    console.log(`https://explorer.solana.com/tx/${tx}?cluster=devnet`)

    tx = await program.methods
        .increment()
        .accounts({ counter: counter.publicKey, user: provider.wallet.publicKey })
        .rpc()

    console.log(`https://explorer.solana.com/tx/${tx}?cluster=devnet`)

    account = await program.account["counter"].fetch(counter.publicKey) as Counter

    console.log(account.count.toNumber())

    tx = await program.methods
        .decrement()
        .accounts({ counter: counter.publicKey, user: provider.wallet.publicKey })
        .rpc()

    console.log(`https://explorer.solana.com/tx/${tx}?cluster=devnet`)

    account = await program.account["counter"].fetch(counter.publicKey) as Counter

    console.log(account.count.toNumber())
    
}

async function main() {
    const signer = initializeSignerKeypair()
    
    const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'processed')
    await airdropSolIfNeeded(signer, connection)
    
    const wallet = new Wallet(signer)
    const counterProgramId = new web3.PublicKey('AjV2uJatiGkkEbJvcsLAufrD5XSi3HSBHTRHLUjt6XDS')
    await testCounter(wallet, counterProgramId, connection)
}

main().then(() => {
    console.log('Finished successfully')
    process.exit(0)
}).catch(error => {
    console.log(error)
    process.exit(1)
})