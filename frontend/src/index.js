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
    received: (whatIsThis) => { console.log(whatIsThis)}
  });


});
