class Word < ApplicationRecord
  include Filterable
  include PgSearch

  belongs_to :language

  has_many :task_words
  has_many :tasks, through: :task_words

  has_many :user_words
  has_many :users, through: :user_words

  has_many :word_sentences
  has_many :sentences, through: :word_sentences

  has_many :article_words
  has_many :articles, through: :article_words

  # Filter scopes
  pg_search_scope :text, :against     => :text
  pg_search_scope :alt_text, :against => :alt_text
  pg_search_scope :pinyin, :against   => :pinyin
  pg_search_scope :meaning, :against  => :meaning
  pg_search_scope :note, :against     => :note
  scope :task_id,   -> (task_id) { joins(:task_words).where("task_id = ?", task_id) }
  scope :article_id,-> (article_id) { joins(:article_words).where("article_id = ?", article_id) }
end
