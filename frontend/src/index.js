const username = `USER ${Math.floor(Math.random() * 1000)}`
document.addEventListener('DOMContentLoaded', function() {
  const DOM = new Dom();
  DOM.addAllEventListeners();
  DOM.renderAllIssues();
  adapter.fetchCategories().then(categories => {
    categories.forEach(category => {
      new Category(category)
    })
    DOM.populateDropDown()
  })

  var cable = ActionCable.createConsumer('ws://localhost:3000/cable');

  cable.subscriptions.create({
    channel: 'ConversationsChannel'
  }, {
    received: (whatIsThis) => {

      console.log(whatIsThis.content)
      DOM.renderChatMessage(whatIsThis.content)
      // debugger
      new Message(whatIsThis)
    }
  });


});
