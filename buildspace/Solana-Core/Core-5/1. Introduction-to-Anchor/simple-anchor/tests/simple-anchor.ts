import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SimpleAnchor } from "../target/types/simple_anchor";

describe("simple-anchor", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SimpleAnchor as Program<SimpleAnchor>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
