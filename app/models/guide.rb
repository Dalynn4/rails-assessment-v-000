class Guide < ApplicationRecord
  belongs_to :user
  belongs_to :game
  validates :title, presence: true
  validates :title, uniqueness: true



end
