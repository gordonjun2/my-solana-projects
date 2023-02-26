use borsh::{BorshSerialize, BorshDeserialize};

#[derive(BorshSerialize, BorshDeserialize)]
pub struct StudentIntroAccountState {
    pub is_initialized: bool,
    pub name: String,
    pub message: String,
}