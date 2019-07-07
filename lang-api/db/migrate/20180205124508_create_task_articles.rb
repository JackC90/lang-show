class CreateTaskArticles < ActiveRecord::Migration[5.0]
  def change
    create_table :task_articles do |t|
      t.references :article, foreign_key: true
      t.references :task, foreign_key: true

      t.timestamps
    end
  end
end
