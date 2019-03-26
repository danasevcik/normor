class Category < ApplicationRecord
  has_many :issues

  validates :title, presence: true
end
