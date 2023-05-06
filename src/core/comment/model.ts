class Comment {
    comment_id?: string;
    user_id?: string;
    vet_id?: string;
    comment: string;
    rating: number;

    constructor(
        comment_id: string,
        user_id: string,
        vet_id: string,
        comment: string,
        rating: number
    ) {
        this.comment_id = comment_id;
        this.user_id = user_id;
        this.vet_id = vet_id;
        this.comment = comment;
        this.rating = rating;
    }

}

export default Comment;