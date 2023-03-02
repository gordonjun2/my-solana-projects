use crate::error::StudentIntroError;
use crate::instruction::IntroInstruction;
use crate::state::StudentInfo;
use crate::state::ReplyCounter;
use crate::state::Reply;
use borsh::BorshSerialize;
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    borsh::try_from_slice_unchecked,
    entrypoint::ProgramResult,
    msg,
    program::invoke_signed,
    program_error::ProgramError,
    program_pack::IsInitialized,
    pubkey::Pubkey,
    system_instruction,
    sysvar::{rent::Rent, Sysvar},
};
use std::convert::TryInto;

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let instruction = IntroInstruction::unpack(instruction_data)?;
    match instruction {
        IntroInstruction::InitUserInput { name, message } => {
            add_student_intro(program_id, accounts, name, message)
        },
        IntroInstruction::UpdateStudentIntro { name, message } => {
            update_student_intro(program_id, accounts, name, message)
        },
        IntroInstruction::AddReply { reply } => {
            add_reply(program_id, accounts, reply)
        }
    }
}

pub fn add_student_intro(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    name: String,
    message: String,
) -> ProgramResult {
    msg!("Adding student intro...");
    msg!("Name: {}", name);
    msg!("Message: {}", message);
    let account_info_iter = &mut accounts.iter();

    let initializer = next_account_info(account_info_iter)?;
    let user_account = next_account_info(account_info_iter)?;
    let system_program = next_account_info(account_info_iter)?;
    // New account to store reply count
    let pda_counter = next_account_info(account_info_iter)?;

    if !initializer.is_signer {
        msg!("Missing required signature");
        return Err(ProgramError::MissingRequiredSignature)
    }

    let (pda, bump_seed) = Pubkey::find_program_address(&[initializer.key.as_ref(), name.as_bytes().as_ref()], program_id);
    if pda != *user_account.key {
        msg!("Invalid seeds for PDA");
        return Err(StudentIntroError::InvalidPDA.into());
    }

    let account_len: usize = 1000;
    if StudentInfo::get_account_size(name.clone(), message.clone()) > account_len {
        msg!("Data length is larger than 1000 bytes");
        return Err(StudentIntroError::InvalidDataLength.into());
    }

    let rent = Rent::get()?;
    let rent_lamports = rent.minimum_balance(account_len);

    invoke_signed(
        &system_instruction::create_account(
            initializer.key,
            user_account.key,
            rent_lamports,
            account_len.try_into().unwrap(),
            program_id,
        ),
        &[
            initializer.clone(),
            user_account.clone(),
            system_program.clone(),
        ],
        &[&[initializer.key.as_ref(), name.as_bytes().as_ref(), &[bump_seed]]],
    )?;

    msg!("PDA created: {}", pda);

    msg!("unpacking state account");
    let mut account_data =
        try_from_slice_unchecked::<StudentInfo>(&user_account.data.borrow()).unwrap();
    msg!("borrowed account data");

    msg!("checking if account is already initialized");
    if account_data.is_initialized() {
        msg!("Account already initialized");
        return Err(ProgramError::AccountAlreadyInitialized);
    }

    account_data.discriminator = StudentInfo::DISCRIMINATOR.to_string();
    account_data.introducer = *initializer.key;
    account_data.name = name;
    account_data.msg = message;
    account_data.is_initialized = true;
    msg!("serializing account");
    account_data.serialize(&mut &mut user_account.data.borrow_mut()[..])?;
    msg!("state account serialized");

    msg!("Creating reply counter");
    let rent = Rent::get()?;
    let counter_rent_lamports = rent.minimum_balance(ReplyCounter::SIZE);
    
    // Deriving the address and validating that the correct seeds were passed in
    let (counter, counter_bump) =
        Pubkey::find_program_address(&[pda.as_ref(), "reply".as_ref()], program_id);
    if counter != *pda_counter.key {
        msg!("Invalid seeds for PDA");
        return Err(ProgramError::InvalidArgument);
    }
    
    // Creating the reply counter account
    invoke_signed(
        &system_instruction::create_account(
            initializer.key, // Rent payer 
            pda_counter.key, // Address who we're creating the account for
            counter_rent_lamports, // Amount of rent to put into the account
            ReplyCounter::SIZE.try_into().unwrap(), // Size of the account
            program_id,
        ),
        &[
            // List of accounts that will be read from/written to
            initializer.clone(),
            pda_counter.clone(),
            system_program.clone(),
        ],
        // Seeds for the PDA
        // PDA account 
        // The string "reply"
        &[&[pda.as_ref(), "reply".as_ref(), &[counter_bump]]],
    )?;
    msg!("Reply counter created");
    
    // Deserialize the newly created counter account
    let mut counter_data =
        try_from_slice_unchecked::<ReplyCounter>(&pda_counter.data.borrow()).unwrap();
    
    msg!("checking if counter account is already initialized");
    if counter_data.is_initialized() {
        msg!("Account already initialized");
        return Err(ProgramError::AccountAlreadyInitialized);
    }
    
    counter_data.discriminator = ReplyCounter::DISCRIMINATOR.to_string();
    counter_data.counter = 0;
    counter_data.is_initialized = true;
    msg!("reply count: {}", counter_data.counter);
    counter_data.serialize(&mut &mut pda_counter.data.borrow_mut()[..])?;
    
    msg!("Reply counter initialized");
    Ok(())
}

pub fn update_student_intro(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    name: String,
    message: String,
) -> ProgramResult {
    msg!("Updating student intro...");
    msg!("Name: {}", name);
    msg!("Message: {}", message);
    let account_info_iter = &mut accounts.iter();

    let initializer = next_account_info(account_info_iter)?;
    let user_account = next_account_info(account_info_iter)?;

    if user_account.owner != program_id {
        return Err(ProgramError::IllegalOwner)
      }
  
      if !initializer.is_signer {
          msg!("Missing required signature");
          return Err(ProgramError::MissingRequiredSignature)
      }

    msg!("unpacking state account");
    let mut account_data =
        try_from_slice_unchecked::<StudentInfo>(&user_account.data.borrow()).unwrap();
    msg!("borrowed account data");

    msg!("checking if account is initialized");
    if !account_data.is_initialized() {
        msg!("Account is not initialized");
        return Err(StudentIntroError::UninitializedAccount.into());
    }

    let (pda, _bump_seed) = Pubkey::find_program_address(&[initializer.key.as_ref(), account_data.name.as_bytes().as_ref()], program_id);
    if pda != *user_account.key {
        msg!("Invalid seeds for PDA");
        return Err(StudentIntroError::InvalidPDA.into());
    }

    let update_len: usize = 1 + (4 + message.len()) + account_data.name.len();
    if update_len > 1000 {
        msg!("Data length is larger than 1000 bytes");
        return Err(StudentIntroError::InvalidDataLength.into())
    }

    account_data.name = account_data.name;
    account_data.msg = message;
    msg!("serializing account");
    account_data.serialize(&mut &mut user_account.data.borrow_mut()[..])?;
    msg!("state account serialized");

    Ok(())
}

pub fn add_reply(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    reply: String
) -> ProgramResult {
    msg!("Adding Reply...");
    msg!("Reply: {}", reply);

    let account_info_iter = &mut accounts.iter();

    let respondent = next_account_info(account_info_iter)?;
    let pda_intro = next_account_info(account_info_iter)?;
    let pda_counter = next_account_info(account_info_iter)?;
    let pda_reply = next_account_info(account_info_iter)?;
    let system_program = next_account_info(account_info_iter)?;

    let mut counter_data = try_from_slice_unchecked::<ReplyCounter>(&pda_counter.data.borrow()).unwrap();

    let account_len = Reply::get_account_size(reply.clone());

    let rent = Rent::get()?;
    let rent_lamports = rent.minimum_balance(account_len);

    let (pda, bump_seed) = Pubkey::find_program_address(&[pda_intro.key.as_ref(), counter_data.counter.to_be_bytes().as_ref(),], program_id);
    if pda != *pda_reply.key {
        msg!("Invalid seeds for PDA");
        return Err(StudentIntroError::InvalidPDA.into())
    }

    invoke_signed(
        &system_instruction::create_account(
            respondent.key,
            pda_reply.key,
            rent_lamports,
            account_len.try_into().unwrap(),
            program_id,
        ),
        &[respondent.clone(), pda_reply.clone(), system_program.clone()],
        &[&[pda_intro.key.as_ref(), counter_data.counter.to_be_bytes().as_ref(), &[bump_seed]]],
    )?;

    msg!("Created Reply Account");

    let mut reply_data = try_from_slice_unchecked::<Reply>(&pda_reply.data.borrow()).unwrap();

    msg!("checking if reply account is already initialized");
    if reply_data.is_initialized() {
        msg!("Account already initialized");
        return Err(ProgramError::AccountAlreadyInitialized);
    }

    reply_data.discriminator = Reply::DISCRIMINATOR.to_string();
    reply_data.intro = *pda_intro.key;
    reply_data.respondent = *respondent.key;
    reply_data.reply = reply;
    reply_data.is_initialized = true;
    reply_data.serialize(&mut &mut pda_reply.data.borrow_mut()[..])?;

    msg!("Reply Count: {}", counter_data.counter);
    counter_data.counter += 1;
    counter_data.serialize(&mut &mut pda_counter.data.borrow_mut()[..])?;

    Ok(())
}
