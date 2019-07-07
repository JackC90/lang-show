class ChangeColumnName < ActiveRecord::Migration[5.0]
  def change
    rename_column :articles, :url, :source_url
  end
end
