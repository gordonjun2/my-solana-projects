import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as Web3 from '@solana/web3.js'
import { FC, useState } from 'react'
import styles from '../styles/Home.module.css'


export const SendSolForm: FC = () => {
    const [txSig, setTxSig] = useState('');
	const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();
    const link = () => {
        return txSig ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet` : ''
    }

    const sendSol = event => {
		if (!connection || !publicKey) { 
			alert("Please connect your wallet first lol")
			return
		}

        event.preventDefault()

        const transaction = new Web3.Transaction()
        const recipientPublicKey = new Web3.PublicKey(event.target.recipient.value)

        if (!Web3.PublicKey.isOnCurve(recipientPublicKey.toBytes())) {
			alert("Thats not a correct Solana Address lol")
			return
        }

        const sendSolInstruction = Web3.SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: recipientPublicKey,
            lamports: Web3.LAMPORTS_PER_SOL * event.target.amount.value
        })
      
        transaction.add(sendSolInstruction)
        sendTransaction(transaction, connection).then(transactionSignature => {
            setTxSig(transactionSignature)
            console.log(
                `Transaction https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`
                )
            console.log(`Send ${event.target.amount.value} SOL to ${event.target.recipient.value}`)
        })
    }

    return (
        <div>
            <form onSubmit={sendSol} className={styles.form}>
                <label htmlFor="amount">Amount (in SOL) to send:</label>
                <input id="amount" type="text" className={styles.formField} placeholder="e.g. 0.1" required />
                <br />
                <label htmlFor="recipient">Send SOL to:</label>
                <input id="recipient" type="text" className={styles.formField} placeholder="e.g. 4Zw1fXuYuJhWhu9KLEYMhiPEiqcpKd6akw3WRZCv84HA" required />
                <button type="submit" className={styles.formButton}>Send</button>
            </form>
            {
                txSig ?
                    <div>
                        <p>View your transaction on </p>
                        <a href={link()} target="_blank">Solana Explorer</a>
                    </div> :
                    null
            }
        </div>
    )
}