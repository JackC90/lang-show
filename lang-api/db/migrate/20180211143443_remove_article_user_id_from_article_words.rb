class RemoveArticleUserIdFromArticleWords < ActiveRecord::Migration[5.0]
  def change
    remove_foreign_key :article_words, :article_users
    remove_column :article_words, :article_user_id
  end
end
