class ProductProofEvent < ApplicationRecord
  validates :label, presence: true
  validates :message, presence: true
end
