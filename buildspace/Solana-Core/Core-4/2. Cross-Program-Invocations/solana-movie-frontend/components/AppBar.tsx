import { FC } from 'react'
import styles from '../styles/Home.module.css'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Image from 'next/image'
import dynamic from 'next/dynamic';

export const AppBar: FC = () => {
    const ButtonWrapper = dynamic(() =>
        import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton)
    );

    return (
        <div className={styles.AppHeader}>
            <Image src="/solanaLogo.png" height={30} width={200} />
            <span>Movie Reviews</span>
            <ButtonWrapper />
        </div>
    )
}