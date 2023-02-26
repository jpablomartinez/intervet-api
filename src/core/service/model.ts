class Service {

    service_id?: string;
    name!: string;
    description!: string;

    constructor(
        service_id: string,
        name: string,
        description: string
    ){
        this.service_id = service_id;
        this.name = name;
        this.description = description;
    }
}

export default Service;