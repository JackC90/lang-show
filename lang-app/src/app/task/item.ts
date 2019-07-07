export class Item {
  constructor(
    public id?: number,
    public description?: string,
    public is_done?: boolean,
    public task_id?: number,
    public created_at?: string,
    public updated_at?: string
  ) {}
}
