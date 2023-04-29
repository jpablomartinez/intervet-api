class BankAccount {
    bank_account_id?: string;
    user_id?: string;
    account_type!: string;
    account_number!: string;
    bank!: string;

    constructor(
        bank_account_id: string,
        user_id: string,
        account_type: string,
        account_number: string,
        bank: string
    ) {
        this.bank_account_id = bank_account_id;
        this.user_id = user_id;
        this.account_type = account_type;
        this.account_number = account_number;
        this.bank= bank;
    }
}

export default BankAccount;