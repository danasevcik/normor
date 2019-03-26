class Comment < ApplicationRecord
  belongs_to :issue

  validates :content, presence: true
  validates :votes, numericality: { only_integer: true }
end
