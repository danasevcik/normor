class Api::V1::IssuesController < ApplicationController
  def index
    @issues = Issue.all.sort { |issue| issue.votes }
    render json: @issues
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
end
