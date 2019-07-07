class Language < ApplicationRecord
  validates_uniqueness_of :name, scope: :code
end
