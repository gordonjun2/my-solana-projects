import * as web3 from '@solana/web3.js'
import * as borsh from '@project-serum/borsh'
import * as fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()
import {
    TOKEN_PROGRAM_ID,
    getAssociatedTokenAddress,
    createAssociatedTokenAccountInstruction,
    getOrCreateAssociatedTokenAccount
} from "@solana/spl-token"

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

const studentIntroLayout = borsh.struct([
    borsh.u8('variant'),
    borsh.str('name'),
    borsh.str('message'),
])

const studentIntroReplyLayout = borsh.struct([
    borsh.u8('variant'),
    borsh.str('reply'),
])

const studentIntroReplyCounterSchema = borsh.struct([
    borsh.str("discriminator"),
    borsh.bool("isInitialized"),
    borsh.u8("counter"),
  ])

async function sendTestStudentIntro(signer: web3.Keypair, programId: web3.PublicKey, connection: web3.Connection) {
    let buffer = Buffer.alloc(1000)
    const studentName = 'Blanket Bear'
    studentIntroLayout.encode(
        {
            variant: 0,
            name: studentName,
            message: 'I am learning Solana development!' 
        },
        buffer
    )

    buffer = buffer.slice(0, studentIntroLayout.getSpan(buffer))

    const [user_account_pda] = await web3.PublicKey.findProgramAddress(
        [signer.publicKey.toBuffer()],
        programId
    )

    console.log("User Account PDA is:", user_account_pda.toBase58())

    const [reply_counter_pda] = await web3.PublicKey.findProgramAddress(
        [user_account_pda.toBuffer(), Buffer.from('reply')],
        programId
    )

    console.log("Reply Counter PDA is:", reply_counter_pda.toBase58())

    const [token_mint_pda] = await web3.PublicKey.findProgramAddress(
        [Buffer.from('token_mint')],
        programId
    )

    console.log("Token Mint PDA is:", token_mint_pda.toBase58())

    const [token_mint_auth_pda] = await web3.PublicKey.findProgramAddress(
        [Buffer.from('token_auth')],
        programId
    )

    console.log("Token Mint Authentication PDA is:", token_mint_auth_pda.toBase58())

    let user_ata_pda = await getAssociatedTokenAddress(token_mint_pda, signer.publicKey)
    const ataAccount = await connection.getAccountInfo(user_ata_pda)

    if (!ataAccount) {

        const tokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            signer,
            token_mint_pda,
            signer.publicKey,
            false,
            "finalized",
            {
                skipPreflight: true,
                commitment: "finalized"
            }
        )

        user_ata_pda = tokenAccount.address

    }

    console.log("User ATA PDA is:", user_ata_pda.toBase58())

    let transaction = new web3.Transaction()
    
    const add_intro_instruction = new web3.TransactionInstruction({
        programId: programId,
        data: buffer,
        keys: [
            {
                pubkey: signer.publicKey,
                isSigner: true,
                isWritable: false
            },
            {
                pubkey: user_account_pda,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: reply_counter_pda,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: token_mint_pda,
                isSigner: false,
                isWritable: true,
            },
            {
                pubkey: token_mint_auth_pda,
                isSigner: false,
                isWritable: false,
            },
            {
                pubkey: user_ata_pda,
                isSigner: false,
                isWritable: true,
            },
            {
                pubkey: web3.SystemProgram.programId,
                isSigner: false,
                isWritable: false
            },
            {
                pubkey: TOKEN_PROGRAM_ID,
                isSigner: false,
                isWritable: false,
            },
        ]
    })

    transaction.add(add_intro_instruction)

    buffer = Buffer.alloc(1000)
    studentIntroLayout.encode(
        {
            variant: 1,
            name: studentName,
            message: 'I am learning Solana development and I blove Pickle Penguin!' 
        },
        buffer
    )

    buffer = buffer.slice(0, studentIntroLayout.getSpan(buffer))

    const update_intro_instruction = new web3.TransactionInstruction({
        programId: programId,
        data: buffer,
        keys: [
            {
                pubkey: signer.publicKey,
                isSigner: true,
                isWritable: false
            },
            {
                pubkey: user_account_pda,
                isSigner: false,
                isWritable: true
            }
        ]
    })

    transaction.add(update_intro_instruction)

    let tx = await web3.sendAndConfirmTransaction(connection, transaction, [signer])
    console.log(`https://explorer.solana.com/tx/${tx}?cluster=devnet`)

    transaction = new web3.Transaction()

    buffer = Buffer.alloc(1000)
    studentIntroReplyLayout.encode(
        {
            variant: 2,
            reply: 'That is so cool...'
        },
        buffer
    )

    buffer = buffer.slice(0, studentIntroReplyLayout.getSpan(buffer))

    const reply_counter_account = await connection.getAccountInfo(reply_counter_pda)
    let commentCount = studentIntroReplyCounterSchema.decode(reply_counter_account?.data).counter

    const [reply_pda] = await web3.PublicKey.findProgramAddress(
        [user_account_pda.toBuffer(), Buffer.from([commentCount])],
        programId
    )

    console.log("Reply PDA is:", reply_pda.toBase58())

    const add_reply_instruction = new web3.TransactionInstruction({
        programId: programId,
        data: buffer,
        keys: [
            {
                pubkey: signer.publicKey,
                isSigner: true,
                isWritable: false
            },
            {
                pubkey: user_account_pda,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: reply_counter_pda,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: reply_pda,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: token_mint_pda,
                isSigner: false,
                isWritable: true,
            },
            {
                pubkey: token_mint_auth_pda,
                isSigner: false,
                isWritable: false,
            },
            {
                pubkey: user_ata_pda,
                isSigner: false,
                isWritable: true,
            },
            {
                pubkey: web3.SystemProgram.programId,
                isSigner: false,
                isWritable: false
            },
            {
                pubkey: TOKEN_PROGRAM_ID,
                isSigner: false,
                isWritable: false,
            },
        ]
    })

    transaction.add(add_reply_instruction)

    tx = await web3.sendAndConfirmTransaction(connection, transaction, [signer])
    console.log(`https://explorer.solana.com/tx/${tx}?cluster=devnet`)
}

async function main() {
    const signer = initializeSignerKeypair()
    
    const connection = new web3.Connection('http://127.0.0.1:8899')
    await airdropSolIfNeeded(signer, connection)
    
    const studentIntroProgramId = new web3.PublicKey('GuV33Mtjq2n63jUP4roHU3xx4JmMfjxD4ZYYJybvgN6b')
    await sendTestStudentIntro(signer, studentIntroProgramId, connection)
}

main().then(() => {
    console.log('Finished successfully')
    process.exit(0)
}).catch(error => {
    console.log(error)
    process.exit(1)
})