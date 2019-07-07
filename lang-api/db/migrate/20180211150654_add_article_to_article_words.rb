class AddArticleToArticleWords < ActiveRecord::Migration[5.0]
  def change
    add_reference :article_words, :article, foreign_key: true
  end
end
