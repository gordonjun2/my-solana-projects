import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { expect } from "chai"
import { SimpleCounterAnchor } from "../target/types/simple_counter_anchor";

describe("simple-counter-anchor", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)

  const program = anchor.workspace.SimpleCounterAnchor as Program<SimpleCounterAnchor>;

  const counter = anchor.web3.Keypair.generate()

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods
      .initialize()
      .accounts({ counter: counter.publicKey, user: provider.wallet.publicKey, systemProgram: anchor.web3.SystemProgram.programId })
      .signers([counter])
      .rpc()

    const account = await program.account["counter"].fetch(counter.publicKey)
    expect(account.count.toNumber() === 0)
  });

  it("Increment count!", async () => {
    // Add your test here.
    const tx = await program.methods
      .increment()
      .accounts({ counter: counter.publicKey, user: provider.wallet.publicKey })
      .rpc()

    const account = await program.account["counter"].fetch(counter.publicKey)
    expect(account.count.toNumber() === 1)
  });

  it("Decrement count!", async () => {
    // Add your test here.
    const tx = await program.methods
      .decrement()
      .accounts({ counter: counter.publicKey, user: provider.wallet.publicKey })
      .rpc()

    const account = await program.account["counter"].fetch(counter.publicKey)
    expect(account.count.toNumber() === 0)
  });
});
