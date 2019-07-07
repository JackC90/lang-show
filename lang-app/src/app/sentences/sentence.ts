export class Sentence {
  constructor(
    public id?: number,
    public text?: string,
    public note?: string,
    public reference?: string,
    public source_url?: string,
    public created_at?: string,
    public updated_at?: string
  ) {}
}
