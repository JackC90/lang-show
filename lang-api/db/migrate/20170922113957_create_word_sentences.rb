class CreateWordSentences < ActiveRecord::Migration[5.0]
  def change
    create_table :word_sentences do |t|
      t.references :word, foreign_key: true
      t.references :sentence, foreign_key: true

      t.timestamps
    end
  end
end
