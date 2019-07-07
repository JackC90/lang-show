class CreateSentences < ActiveRecord::Migration[5.0]
  def change
    create_table :sentences do |t|
      t.text :text
      t.text :source_url
      t.text :reference
      t.text :note

      t.timestamps
    end
  end
end
