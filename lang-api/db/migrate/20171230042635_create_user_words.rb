class CreateUserWords < ActiveRecord::Migration[5.0]
  def change
    create_table :user_words do |t|
      t.references :user, foreign_key: true
      t.references :word, foreign_key: true
      t.boolean :is_owner

      t.timestamps
    end
  end
end
