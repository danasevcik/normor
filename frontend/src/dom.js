class Dom {
  constructor() {
    this.newIssueForm = document.querySelector('form.ui.form');
    this.newIssueSubmitButton = document.querySelector('div.ui.positive.right.labeled.icon.button');
    this.issues = document.querySelector('#allissues');
    this.issuesContainer = document.querySelector('div.ui.stackable.grid.container');
    this.rightMenu = document.querySelector('div.ui.right.fixed.vertical.menu');
    this.topMenu = document.querySelector('div.ui.top.menu');
  }

  addAllEventListeners() {
    console.log('adding listeners')
    this.newIssueSubmitButton.addEventListener('click', this.handleSubmit.bind(this))
    this.issuesContainer.addEventListener('click', this.handleVote.bind(this));
    this.rightMenu.addEventListener('click', this.handleRightMenu.bind(this));
  }

  handleSubmit() {
    console.log('handling submit');

    const title = this.newIssueForm.querySelector('#issuetitle').value
    const description = this.newIssueForm.querySelector('#issuedescription').value
    const zipcode = this.newIssueForm.querySelector('#issuezipcode').value
    const category = this.newIssueForm.querySelector('#issuecategory').value

    this.newIssueForm.querySelector('#issuetitle').value = ''
    this.newIssueForm.querySelector('#issuedescription').value = ''
    this.newIssueForm.querySelector('#issuezipcode').value = ''
    this.newIssueForm.querySelector('#issuecategory').value = 'Category'

    adapter.createIssue({title: title, description: description, zipcode: zipcode, category:category})
    .then(response => {
      console.log(response)
      this.issuesContainer.appendChild(new Issue(response).toHTML());
      $('.ui.modal').modal('hide');
    }).catch(error => {
      console.log('in the catch');
      const errorDiv = document.createElement('div')
      errorDiv.innerHTML = `
        <h1 class="header">That issue can not be posted.</h1>
      `
      this.newIssueForm.appendChild(errorDiv);
    });
  }

  handleVote(e) {
    switch(e.target.innerText) {
      case 'Upvote':
        adapter.upvoteIssue(e.target.dataset.id)
          .then(issue => 
            e.target.parentNode.parentElement.firstElementChild.innerText = issue.votes
          );
        break;
      case 'Downvote':
        adapter.downvoteIssue(e.target.dataset.id)
          .then(issue => 
            e.target.parentNode.parentElement.firstElementChild.innerText = issue.votes
          );
        break;
      default:
        console.log('click something else');
    }
  }

  handleRightMenu(e) {
    switch(e.target.innerText) {
      case 'Submit New Issue':
        $('.ui.modal').modal('show');
        // adapter.upvoteIssue(e.target.dataset.id)
        //   .then(issue => 
        //     e.target.parentNode.parentElement.firstElementChild.innerText = issue.votes
        //   );
        break;
      case 'Refresh':
        this.renderAllIssues();
        break;
      default:
        console.log('click something else');
    }
  }

  renderAllIssues() {
    console.log('Rendering all issues');
    this.issuesContainer.innerHTML = '';
    adapter.fetchIssues()
      .then(issues => 
        issues.forEach(issue => this.issuesContainer.appendChild(new Issue(issue).toHTML()))
      );
  }
}
