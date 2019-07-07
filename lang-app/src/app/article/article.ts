import { Word } from '../word/word';

export class Article {
  constructor(
    public id?: number,
    public title?: string,
    public body?: string,
    public source_url?: string,
    public words?: Word[],
    public created_at?: string,
    public updated_at?: string
  ) {}
}
