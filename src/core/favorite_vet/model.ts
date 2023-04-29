class FavoriteVet {
    user_id?: string;
    vet_id?: string;

    constructor(
        user_id: string,
        vet_id: string
    ){
        this.user_id = user_id;
        this.vet_id = vet_id;
    }

}

export default FavoriteVet;