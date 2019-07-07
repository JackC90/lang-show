class TaskArticle < ApplicationRecord
  belongs_to :article
  belongs_to :task

  validates :article, uniqueness: { scope: :task }
end
