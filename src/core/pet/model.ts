class Pet {

    pet_id?: string;
    user_id?: string;
    name: string;
    specie: string;
    breed: string;
    birthdate: Date;
    chip_number: string;

    constructor(
        pet_id: string,
        user_id: string,
        name: string,
        specie: string,
        breed: string,
        birthdate: Date,
        chip_number: string
    ) {
        this.pet_id = pet_id;
        this.user_id = user_id;
        this.name = name;
        this.specie = specie;
        this.breed = breed;
        this.birthdate = birthdate;
        this.chip_number = chip_number;    
    }
}

export default Pet;