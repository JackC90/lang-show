class CreateTaskWords < ActiveRecord::Migration[5.0]
  def change
    create_table :task_words do |t|
      t.references :task, foreign_key: true
      t.references :word, foreign_key: true

      t.timestamps
    end
  end
end
