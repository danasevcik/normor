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
});
