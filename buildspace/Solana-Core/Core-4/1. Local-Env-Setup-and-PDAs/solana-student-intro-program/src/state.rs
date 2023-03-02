use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    // We're bringing in Pubkey
    pubkey::Pubkey,
    program_pack::{IsInitialized, Sealed},
};

#[derive(BorshSerialize, BorshDeserialize)]
pub struct StudentInfo {
    // Two new fields added - discriminator and introducer
    pub discriminator: String,
    pub is_initialized: bool,
    pub introducer: Pubkey,
    pub name: String,
    pub msg: String,
}

// New struct for recording how many comments total
#[derive(BorshSerialize, BorshDeserialize)]
pub struct ReplyCounter {
    pub discriminator: String,
    pub is_initialized: bool,
    pub counter: u64,
}

// New struct for storing individual comments
#[derive(BorshSerialize, BorshDeserialize)]
pub struct Reply {
    pub discriminator: String,
    pub is_initialized: bool,
    pub intro: Pubkey,
    pub respondent: Pubkey,
    pub reply: String,
    pub count: u64,
}

impl IsInitialized for StudentInfo {
    fn is_initialized(&self) -> bool {
        self.is_initialized
    }
}

impl IsInitialized for ReplyCounter {
    fn is_initialized(&self) -> bool {
        self.is_initialized
    }
}

impl IsInitialized for Reply {
    fn is_initialized(&self) -> bool {
        self.is_initialized
    }
}

impl StudentInfo {
    pub const DISCRIMINATOR: &'static str = "intro";

    pub fn get_account_size(name: String, msg: String) -> usize {
                // 4 bytes to store the size of the subsequent dynamic data (string)
        return (4 + StudentInfo::DISCRIMINATOR.len())  
            + 1 // 1 byte for is_initialized (boolean)
            + 32 // 32 bytes for the introducer key size 
            + (4 + name.len()) // 4 bytes to store the size of the subsequent dynamic data (string)
            + (4 + msg.len()); // Same as above
    }
}

impl Reply {
    pub const DISCRIMINATOR: &'static str = "reply";

    pub fn get_account_size(reply: String) -> usize {
        return (4 + Reply::DISCRIMINATOR.len()) 
        + 1  // 1 byte for is_initialized (boolean)
        + 32 // 32 bytes for the student intro account key 
        + 32 // 32 bytes for the respondent key size
        + (4 + reply.len()) // 4 bytes to store the size of the subsequent dynamic data (string)
        + 8; // 8 bytes for the count (u64)
    }
}

impl ReplyCounter {
    pub const DISCRIMINATOR: &'static str = "counter";
    pub const SIZE: usize = (4 + ReplyCounter::DISCRIMINATOR.len()) + 1 + 8;
}

impl Sealed for ReplyCounter{}