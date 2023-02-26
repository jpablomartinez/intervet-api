class AttentionArea {
  attention_area_id?: string;
  vet_id!: string;
  region!: string;
  commune!: string;

  constructor(
    attention_area_id: string,
    vet_id: string,
    region: string,
    commune: string
  ) {
    this.attention_area_id = attention_area_id;
    this.vet_id = vet_id;
    this.region = region;
    this.commune = commune;
  }
}

export default AttentionArea;
