class WordSentence < ApplicationRecord
  belongs_to :word
  belongs_to :sentence
end
