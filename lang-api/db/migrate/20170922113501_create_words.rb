class CreateWords < ActiveRecord::Migration[5.0]
  def change
    create_table :words do |t|
      t.string :text
      t.string :alt_text
      t.string :pinyin
      t.text :meaning
      t.text :note
      t.references :language, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
