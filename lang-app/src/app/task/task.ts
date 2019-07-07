import { Item } from './item';

export class Task {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public start_date?: string,
    public deadline?: string,
    public notes?: string,
    public status?: string,
    public language_id?: number,
    public items?: Item[],
    public created_at?: string,
    public updated_at?: string
  ) {}
}
