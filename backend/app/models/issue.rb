class Issue < ApplicationRecord
  belongs_to :category
  has_many :comments

  validates :title, presence: true
  validates :zipcode, presence: true
  validates :votes, numericality: { only_integer: true }
  validates :description, presence: true
end
