use solana_program::{
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    msg,
    account_info::{next_account_info, AccountInfo},
    system_instruction,
    sysvar::{rent::Rent, Sysvar},
    program::{invoke_signed},
    borsh::try_from_slice_unchecked,
    program_error::ProgramError,
};
use std::convert::TryInto;
use borsh::BorshSerialize;
use crate::instruction::StudentIntroInstruction;
use crate::state::StudentIntroAccountState;
use crate::error::IntroError;

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8]
    ) -> ProgramResult {
        let instruction = StudentIntroInstruction::unpack(instruction_data)?;
        match instruction {
            StudentIntroInstruction::AddStudentIntro { name, message } => {
                add_student_intro(program_id, accounts, name, message)
            },
            // add UpdateStudentIntro to match against our new data structure
            StudentIntroInstruction::UpdateStudentIntro { name, message } => {
                // make call to update function that we'll define next
                update_student_intro(program_id, accounts, name, message)
            }
        }
    }

pub fn add_student_intro(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    name: String,
    message: String
    ) -> ProgramResult {
 
        msg!("Adding student introduction...");
        msg!("Name: {}", name);
        msg!("Message: {}", message);
        
        let account_info_iter = &mut accounts.iter();
        
        let initializer = next_account_info(account_info_iter)?;
        let pda_account = next_account_info(account_info_iter)?;
        let system_program = next_account_info(account_info_iter)?;
        
        // ensure that the initializer of a intro is also a signer on the transaction
        if !initializer.is_signer {
            msg!("Missing required signature");
            return Err(ProgramError::MissingRequiredSignature)
        }
        
        let (pda, bump_seed) = Pubkey::find_program_address(&[initializer.key.as_ref(), name.as_bytes().as_ref(),], program_id);
        
        // make sure the pda_account passed in by the user is the pda we expect
        if pda != *pda_account.key {
            msg!("Invalid seeds for PDA");
            return Err(ProgramError::InvalidArgument)
        }
          
        let account_len = 1000;
        
        // let’s also check that the content of the intro does not exceed the allocated space
        let total_len: usize = 1 + (4 + name.len()) + (4 + message.len());
        if total_len > 1000 {
            msg!("Data length is larger than 1000 bytes");
            return Err(IntroError::InvalidDataLength.into())
        }
        
        let rent = Rent::get()?;
        let rent_lamports = rent.minimum_balance(account_len);
        
        invoke_signed(
            &system_instruction::create_account(
                initializer.key,
                pda_account.key,
                rent_lamports,
                account_len.try_into().unwrap(),
                program_id,
            ),
            &[initializer.clone(), pda_account.clone(), system_program.clone()],
            &[&[initializer.key.as_ref(), name.as_bytes().as_ref(), &[bump_seed]]],
        )?;
        
        msg!("PDA created: {}", pda);
        
        msg!("unpacking state account");
        let mut account_data = try_from_slice_unchecked::<StudentIntroAccountState>(&pda_account.data.borrow()).unwrap();
        msg!("borrowed account data");
        
        account_data.name = name;
        account_data.message = message;
        account_data.is_initialized = true;
        
        msg!("serializing account");
        account_data.serialize(&mut &mut pda_account.data.borrow_mut()[..])?;
        msg!("state account serialized");
        
        Ok(())
}

pub fn update_student_intro(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    name: String,
    message: String
) -> ProgramResult {
    msg!("Updating student introduction...");

    // Get Account iterator
    let account_info_iter = &mut accounts.iter();

    // Get accounts
    let initializer = next_account_info(account_info_iter)?;
    let pda_account = next_account_info(account_info_iter)?;

    if pda_account.owner != program_id {
        return Err(ProgramError::IllegalOwner)
    }

    if !initializer.is_signer {
        msg!("Missing required signature");
        return Err(ProgramError::MissingRequiredSignature)
    }

    msg!("unpacking state account");
    let mut account_data = try_from_slice_unchecked::<StudentIntroAccountState>(&pda_account.data.borrow()).unwrap();
    msg!("borrowed account data");

    // Derive PDA and check that it matches client
    let (pda, _bump_seed) = Pubkey::find_program_address(&[initializer.key.as_ref(), account_data.name.as_bytes().as_ref(),], program_id);
    
    if pda != *pda_account.key {
        msg!("Invalid seeds for PDA");
        return Err(IntroError::InvalidPDA.into())
    }
    
    if !account_data.is_initialized {
        msg!("Account is not initialized");
        return Err(IntroError::UninitializedAccount.into());
    }
    
    let total_len: usize = 1 + (4 + account_data.name.len()) + (4 + message.len());
    if total_len > 1000 {
        msg!("Data length is larger than 1000 bytes");
        return Err(IntroError::InvalidDataLength.into())
    }

    account_data.message = message;
    
    account_data.serialize(&mut &mut pda_account.data.borrow_mut()[..])?;
		
	Ok(())
}

