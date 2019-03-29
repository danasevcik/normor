class MessagesController < ApplicationController
  def create
    ActionCable.server.broadcast('conversations_channel', {"content" => message_params[:text]})
    head :ok
  end

  private

  def message_params
    params.require(:message).permit(:text)
  end
end
