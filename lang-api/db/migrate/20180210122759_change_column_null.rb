class ChangeColumnNull < ActiveRecord::Migration[5.0]
  def change
    change_column_null :articles, :body, true
    change_column_null :articles, :source_url, true
  end
end
