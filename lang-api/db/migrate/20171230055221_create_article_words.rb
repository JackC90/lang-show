class CreateArticleWords < ActiveRecord::Migration[5.0]
  def change
    create_table :article_words do |t|
      t.references :article_user, foreign_key: true
      t.references :word, foreign_key: true
      t.integer :encounter_no

      t.timestamps
    end
  end
end
