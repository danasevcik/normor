const username = `user${Math.floor(Math.random() * 1000)}`;
let unreadMessages = 0;

document.addEventListener('DOMContentLoaded', function() {
  const DOM = new Dom();
  DOM.addAllEventListeners();
  DOM.renderAllIssues();
  adapter.fetchCategories().then(categories => {
    categories.forEach(category => new Category(category))
    DOM.populateDropDown()
  });

  const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
  cable.subscriptions.create({ channel: 'ConversationsChannel' }, {
    received: (msgAttributes) => {
      DOM.renderChatMessage(msgAttributes.content);
      new Message(msgAttributes);
    }
  });
});
