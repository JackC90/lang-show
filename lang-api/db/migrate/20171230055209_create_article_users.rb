class CreateArticleUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :article_users do |t|
      t.references :article, foreign_key: true
      t.references :user, foreign_key: true
      t.boolean :is_owner

      t.timestamps
    end
  end
end
