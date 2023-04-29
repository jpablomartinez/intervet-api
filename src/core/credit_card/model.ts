class CreditCard {
    credit_card_id?: string;
    user_id?: string;
    number: string;
    expiration_date: string;
    code: string;
    propietary_name: string;
    other_name: string;

    constructor(
        credit_card_id: string,
        user_id: string,
        number: string,
        expiration_date: string,
        code: string,
        propietary_name: string,
        other_name: string
    ) {
        this.credit_card_id = credit_card_id;
        this.user_id = user_id;
        this.number = number;
        this.expiration_date = expiration_date;
        this.code = code;
        this.propietary_name = propietary_name;
        this.other_name = other_name
    }
}

export default CreditCard;