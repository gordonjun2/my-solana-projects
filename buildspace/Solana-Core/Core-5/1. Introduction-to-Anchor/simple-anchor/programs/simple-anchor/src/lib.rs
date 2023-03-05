use anchor_lang::prelude::*;

declare_id!("rqgvpVDngY4kGpcBVtqjsrzJYZZfp9wBsc4jNDdT6hU");

#[program]
pub mod simple_anchor {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
