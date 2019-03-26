class Api::V1::IssuesController < ApplicationController
  def index
    issues = Issue.order(votes: :desc)

    render json: issues
  end

  def show
    issue = Issue.find(params[:id])
    render json: issue
  end

  def create
    @category = Category.find_or_create_by(title: params[:category])
    @issue = Issue.new(title: params[:title], description: params[:description], zipcode: params[:zipcode], category_id: @category.id, votes: 0, resolved: false)

    if @issue.save
      render json: @issue
    else
      render json: @issue.errors.full_messages, status: 422
    end
  end

  def upvote
    issue = Issue.find(params[:id])

    issue.votes += 1
    issue.save

    render json: issue
  end

  def downvote
    issue = Issue.find(params[:id])

    issue.votes -= 1
    issue.save

    render json: issue
  end
end
