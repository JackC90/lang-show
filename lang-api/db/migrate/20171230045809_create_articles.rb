class CreateArticles < ActiveRecord::Migration[5.0]
  def change
    create_table :articles do |t|
      t.text :title,  			null: false, default: ""
      t.text :body,             null: false, default: ""
      t.text :url,              null: false, default: ""

      t.timestamps
    end
  end
end
