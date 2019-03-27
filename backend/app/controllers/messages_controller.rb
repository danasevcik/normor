class MessagesController < ApplicationController

  def create
    ActionCable.server.broadcast('conversations_channel', {"content" => message_params[:text]})
    # render json: {name: 'dana'}
    head :ok
    # message = Message.new(message_params)
    # conversation = Conversation.find(message_params[:conversation_id])
    # if message.save
    #   serialized_data = ActiveModelSerializers::Adapter::Json.new(
    #     MessageSerializer.new(message)
    #   ).serializable_hash
    #   MessagesChannel.broadcast_to conversation, serialized_data
    #   head :ok
    # end
  end

  # def create
  #   message = Message.new(message_params)
  #   conversation = Conversation.find(message_params[:conversation_id])
  #   if message.save
  #     serialized_data = ActiveModelSerializers::Adapter::Json.new(
  #       MessageSerializer.new(message)
  #     ).serializable_hash
  #     MessagesChannel.broadcast_to conversation, serialized_data
  #     head :ok
  #   end
  # end

  def index
    # MessagesChannel.broadcast_to "conversation_channel", {"hi": "alex"}
    ActionCable.server.broadcast('conversations_channel', {"hi" => "bye" })
    render json: {name: 'dana'}
  end

  private

  def message_params
    params.require(:message).permit(:text)
  end

  # def message_params
  #   params.require(:message).permit(:text, :conversation_id)
  # end
end
