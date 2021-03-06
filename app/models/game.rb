class Game < ApplicationRecord
  has_many :guides
  has_many :users, through: :guides
  validates :title, presence: true
  validates :game_system, presence: true
  validates :title, uniqueness: true

  def self.search(search)
    if search
      where('title LIKE ?', "%#{search}%")
    else
      all
    end
  end

  def self.most_popular_game
    left_joins(:guides).group(:id).order('COUNT(guides.id) DESC').first
  end
  


end
