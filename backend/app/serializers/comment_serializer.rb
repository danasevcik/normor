class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :votes
end