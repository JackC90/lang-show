class AddLanguageToTasks < ActiveRecord::Migration[5.0]
  def change
    add_reference :tasks, :language, foreign_key: true
  end
end
