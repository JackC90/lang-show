import { Sentence } from '../sentences/sentence';

export class Word {
  constructor(
    public id?: number,
    public text?: string,
    public pinyin?: string,
    public alt_text?: string,
    public meaning?: string,
    public note?: string,
    public language_id?: number,
    public task_id?: number,
    public sentences?: Sentence[],
    public created_at?: string,
    public updated_at?: string
  ) {}
}
