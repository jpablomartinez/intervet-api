
class AboutVet {
    about_vet_id?: string;
    vet_id?: string;
    professional_title!: string;
    professional_title_url!: string;
    university!: string;
    experience_years!: number;
    about_me!: string;
    
    constructor(
        about_vet_id: string,
        vet_id: string,
        professional_title: string,
        professional_title_url: string,
        university: string,
        experience_years: number,
        about_me: string
    ) {
        this.about_vet_id = about_vet_id;
        this.vet_id = vet_id;
        this.professional_title = professional_title;
        this.professional_title_url = professional_title_url;
        this.university = university;
        this.experience_years = experience_years;
        this.about_me = about_me;
    }
}

export default AboutVet;