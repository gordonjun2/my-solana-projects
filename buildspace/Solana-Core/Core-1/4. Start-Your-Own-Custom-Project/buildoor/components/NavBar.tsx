import { FC } from "react"
import { HStack, Spacer } from "@chakra-ui/react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import styles from "../styles/Home.module.css"
import dynamic from 'next/dynamic';

const NavBar: FC = () => {
  const ButtonWrapper = dynamic(() =>
    import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton)
  );

  return (
    <HStack width="full" padding={4}>
      <Spacer />
      <ButtonWrapper />
    </HStack>
  )
}

export default NavBar
