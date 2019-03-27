class ConversationsChannel < ApplicationCable::Channel
  def subscribed
    puts "WE ARE HERE" * 25
    stream_from "conversations_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
