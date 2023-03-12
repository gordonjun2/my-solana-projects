import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { AnchorNftStaking } from "../target/types/anchor_nft_staking";
import { setupNft } from "./utils/setupNft"
import { PROGRAM_ID as METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata"
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token"
import * as web3 from "@solana/web3.js"
import { expect } from "chai"

describe("anchor-nft-staking", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const program = anchor.workspace.AnchorNftStaking as Program<AnchorNftStaking>;

  const wallet = anchor.workspace.AnchorNftStaking.provider.wallet

  let delegatedAuthPda: anchor.web3.PublicKey
  let stakeStatePda: anchor.web3.PublicKey
  let nft: any
  let mintAuth: anchor.web3.PublicKey
  let mint: anchor.web3.PublicKey
  let tokenAddress: anchor.web3.PublicKey

  before(async () => {
    ;({ nft, delegatedAuthPda, stakeStatePda, mint, mintAuth, tokenAddress } =
      await setupNft(program, wallet.payer))
  })

  it("Stakes", async () => {
    // Add your test here.
    await program.methods
      .stake()
      .accounts({
        user: wallet.publicKey,
        nftTokenAccount: nft.tokenAddress,
        nftMint: nft.mintAddress,
        nftEdition: nft.masterEditionAddress,
        stakeState: stakeStatePda,
        programAuthority: delegatedAuthPda,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: web3.SystemProgram.programId,
        metadataProgram: METADATA_PROGRAM_ID,
      })
      .rpc()

    const account = await program.account.userStakeInfo.fetch(stakeStatePda)
    expect(account.stakeState === "Staked")

  })

  it("Redeems", async () => {
    await program.methods
      .redeem()
      .accounts({
        user: wallet.publicKey,
        nftTokenAccount: nft.tokenAddress,
        stakeState: stakeStatePda,
        stakeMint: mint,
        stakeAuthority: mintAuth,
        userStakeAta: tokenAddress,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: web3.SystemProgram.programId,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY
      })
      .rpc()

    const account = await program.account.userStakeInfo.fetch(stakeStatePda)
    expect(account.stakeState === "Unstaked")

  })

  it("Unstakes", async () => {
    await program.methods
      .unstake()
      .accounts({
        user: wallet.publicKey,
        nftTokenAccount: nft.tokenAddress,
        nftMint: nft.mintAddress,
        nftEdition: nft.masterEditionAddress,
        stakeState: stakeStatePda,
        programAuthority: delegatedAuthPda,
        stakeMint: mint,
        stakeAuthority: mintAuth,
        userStakeAta: tokenAddress,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: web3.SystemProgram.programId,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        metadataProgram: METADATA_PROGRAM_ID
      })
      .rpc()

    const account = await program.account.userStakeInfo.fetch(stakeStatePda)
    expect(account.stakeState === "Unstaked")

  })

});
