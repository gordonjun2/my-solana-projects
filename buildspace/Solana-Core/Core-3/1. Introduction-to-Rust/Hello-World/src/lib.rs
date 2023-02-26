use solana_program::{
    account_info::AccountInfo,
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    msg
};

entrypoint!(process_instruction);

pub fn process_instruction(
    //Arguments and their types
    _program_id: &Pubkey,
    _accounts: &[AccountInfo],
    _instruction_data: &[u8]
    // The return type (i.e. what data type the function returns)
) -> ProgramResult{
    msg!("Hello World!");
    // Return Ok() for success
    Ok(())
}