class VetService {
  vet_service_id?: string;
  vet_id?: string;
  name_service: string;
  price: number;

  constructor(
    vet_service_id: string,
    vet_id: string,
    name_service: string,
    price: number
  ) {
    this.vet_service_id = vet_service_id;
    this.vet_id = vet_id;
    this.name_service = name_service;
    this.price = price;
  }
}

export default VetService;
