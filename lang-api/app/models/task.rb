class Task < ApplicationRecord
  belongs_to :user

  has_many :items
  has_many :task_words
  has_many :words, through: :task_words

  has_many :task_articles
  has_many :articles, through: :task_articles

  enum status: [:active, :done, :overdue, :inactive]
end
