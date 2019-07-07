class Sentence < ApplicationRecord
  include Filterable
  has_many :word_sentences
  has_many :words, through: :word_sentences
end
