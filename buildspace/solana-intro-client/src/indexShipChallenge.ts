// We're adding these
import * as Web3 from '@solana/web3.js';
import * as fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const PROGRAM_ID = new Web3.PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa")
const PROGRAM_DATA_PUBLIC_KEY = new Web3.PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod")

async function sendSOL(connection: Web3.Connection, payer: Web3.Keypair, receiver: Web3.Keypair, amount: number) {
    const transaction = new Web3.Transaction();
    const payerPublicKey = payer.publicKey;
    const receiverPublicKey = receiver.publicKey;

    const sendSolInstruction = Web3.SystemProgram.transfer({
        fromPubkey: payerPublicKey,
        toPubkey: receiverPublicKey,
        lamports: Web3.LAMPORTS_PER_SOL * amount
    })
  
    transaction.add(sendSolInstruction)
    const transactionSignature = await Web3.sendAndConfirmTransaction(connection, transaction, [payer])
  
    console.log(
      `Transaction https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`
      )
}

async function initializeSignerKeypair(connection: Web3.Connection): Promise<Web3.Keypair> {
    if (!process.env.PRIVATE_KEY_SIGNER) {
      console.log('Generating new keypair... 🗝️');
      const signer = Web3.Keypair.generate();
  
      console.log('Creating .env file');
      fs.writeFileSync('.env', `PRIVATE_KEY_SIGNER=[${signer.secretKey.toString()}]`);

      await airdropSolIfNeeded(signer, connection);
  
      return signer;
    }
  
    const secret = JSON.parse(process.env.PRIVATE_KEY_SIGNER ?? '') as number[];
    const secretKey = Uint8Array.from(secret);
    const keypairFromSecret = Web3.Keypair.fromSecretKey(secretKey);

    await airdropSolIfNeeded(keypairFromSecret, connection);

    return keypairFromSecret;
}

async function initializeReceiverKeypair(connection: Web3.Connection): Promise<Web3.Keypair> {
    if (!process.env.PRIVATE_KEY_RECEIVER) {
        console.log('Generating new receiver keypair... 🗝️');
        const receiver = Web3.Keypair.generate();

        console.log('Updating .env file');
        let fileContent = fs.readFileSync('.env', 'utf8');

        fs.writeFileSync('.env', fileContent + '\n' + `PRIVATE_KEY_RECEIVER=[${receiver.secretKey.toString()}]`);

        return receiver;
    }

    const secret = JSON.parse(process.env.PRIVATE_KEY_RECEIVER ?? '') as number[];
    const secretKey = Uint8Array.from(secret);
    const keypairFromSecret = Web3.Keypair.fromSecretKey(secretKey);

    const balance = await connection.getBalance(keypairFromSecret.publicKey);
    console.log('Current receiver balance is', balance / Web3.LAMPORTS_PER_SOL, 'SOL');

    return keypairFromSecret;
}

async function airdropSolIfNeeded(signer: Web3.Keypair,connection: Web3.Connection) {
    const balance = await connection.getBalance(signer.publicKey);
    console.log('Current signer balance is', balance / Web3.LAMPORTS_PER_SOL, 'SOL');

    // 1 SOL should be enough for almost anything you wanna do
    if (balance / Web3.LAMPORTS_PER_SOL < 1) {
        // You can only get up to 2 SOL per request 
        console.log('Airdropping 1 SOL to signer');
        const airdropSignature = await connection.requestAirdrop(
            signer.publicKey,
            Web3.LAMPORTS_PER_SOL
        );

        const latestBlockhash = await connection.getLatestBlockhash();

        await connection.confirmTransaction({
            blockhash: latestBlockhash.blockhash,
            lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
            signature: airdropSignature,
        });
    }
}

async function main() {
    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'));
    const signer = await initializeSignerKeypair(connection);
    const receiver = await initializeReceiverKeypair(connection);

    console.log("Signer Public key:", signer.publicKey.toBase58());
    console.log("Receiver Public key:", receiver.publicKey.toBase58());

    const amount = 0.5;

    console.log(`Transferring ${amount} SOL from signer to receiver address...`);

    await sendSOL(connection, signer, receiver, amount);
}

main()
  .then(() => {
    console.log('Finished successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });