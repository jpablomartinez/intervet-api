class AnimalVet {
    animal_id?: string
    vet_id?: string
    
    constructor(
        animal_id: string,
        vet_id: string
    ) {
        this.animal_id = animal_id;
        this.vet_id = vet_id;
    }
}

export default AnimalVet;