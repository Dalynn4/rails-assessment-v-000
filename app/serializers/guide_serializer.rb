class GuideSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :user_id, :game_id
end
