class Api::V1::CommentsController < ApplicationController
  def index
    comments = Comment.order(votes: :desc)
    render json: comments
  end

  def create
    @comment = Comment.new(content: params[:content], votes: params[:votes], issue_id: params[:issue_id])

    if @comment.save
      render json: @comment
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def upvote
    comment = Comment.find(params[:id])

    comment.votes += 1
    comment.save

    render json: comment
  end

  def downvote
    comment = Comment.find(params[:id])

    comment.votes -= 1
    comment.save

    render json: comment
  end

end
