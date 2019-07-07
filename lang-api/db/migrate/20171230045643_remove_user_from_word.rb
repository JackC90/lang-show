class RemoveUserFromWord < ActiveRecord::Migration[5.0]
  def change
    remove_reference :words, :user, foreign_key: true
  end
end
