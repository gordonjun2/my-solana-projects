import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { expect } from "chai"
import { MovieReviewAnchor } from "../target/types/movie_review_anchor";

describe("movie-review-anchor", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)

  const program = anchor.workspace.MovieReviewAnchor as Program<MovieReviewAnchor>;

  const movie = {
    title: `Bibi & Pipi's Adventure v${Math.floor(Math.random() * 10000)}`,
    description:  "A cool story about Bibi and Pipi. Nuff said...",
    rating: 4,
  }

  const [movie_review_pda] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from(movie.title), provider.wallet.publicKey.toBuffer()],
    program.programId
  );

  it("Added a moview review!", async () => {
    // Add your test here.
    const tx = await program.methods
      .addMovieReview(movie.title, movie.description, movie.rating)
      .accounts({ movieReview: movie_review_pda, initializer: provider.wallet.publicKey, systemProgram: anchor.web3.SystemProgram.programId })
      .rpc()

    const account = await program.account.movieAccountState.fetch(movie_review_pda)
    expect(movie.title === account.title)
    expect(movie.rating === account.rating)
    expect(movie.description === account.description)
    expect(account.reviewer === provider.wallet.publicKey)
  });

  it("Updated a moview review!", async () => {
    // Add your test here.

    const newDescription = "The movie 'Bibi & Pipi Adventure' is a heartwarming tale of two blovers, \
                              Bibi and Pipi, who embark on a thrilling adventure together. The story begins \
                              with Bibi and Pipi, who are inseparable, always sticking by each other's side. \
                              They live in a world full of wonder and excitement, with many adventures waiting \
                              to be had."
    const newRating = 5

    const tx = await program.methods
      .updateMovieReview(movie.title, newDescription, newRating)
      .accounts({ movieReview: movie_review_pda, initializer: provider.wallet.publicKey, systemProgram: anchor.web3.SystemProgram.programId })
      .rpc()

    const account = await program.account.movieAccountState.fetch(movie_review_pda)
    expect(movie.title === account.title)
    expect(movie.rating === account.rating)
    expect(movie.description === account.description)
    expect(account.reviewer === provider.wallet.publicKey)
  });

  it("Closed a moview review!", async () => {
    // Add your test here.
    const tx = await program.methods
      .close()
      .accounts({ movieReview: movie_review_pda, reviewer: provider.wallet.publicKey })
      .rpc()
  });

});
