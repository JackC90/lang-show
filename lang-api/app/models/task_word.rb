class TaskWord < ApplicationRecord
  belongs_to :task
  belongs_to :word
end
