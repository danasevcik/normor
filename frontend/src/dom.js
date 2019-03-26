class Dom {
  constructor() {
    // this.form = document.querySelector('.ui.form')
    this.issues = document.querySelector('#allissues');
    this.issuesContainer = document.querySelector('div.ui.stackable.grid.container');
  }

  addAllEventListeners() {
    console.log('adding listeners')
    // this.form.addEventListener('submit', this.handleSubmit.bind(this))
    this.issuesContainer.addEventListener('click', this.handleVote.bind(this));
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('handling submit');

    const title = this.form.querySelector('#issuetitle').value
    const description = this.form.querySelector('#issuedescription').value
    const zipcode = this.form.querySelector('#issuezipcode').value
    const category = this.form.querySelector('#issuecategory').value

    this.form.querySelector('#issuetitle').value = ''
    this.form.querySelector('#issuedescription').value = ''
    this.form.querySelector('#issuezipcode').value = ''
    this.form.querySelector('#issuecategory').value = 'Category'

    adapter.createIssue({title: title, description: description, zipcode: zipcode, category:category})
    .then(response => {
      console.log(response)
      new Issue(response)
    }).catch(error => {
      console.log('in the catch');
      const errorDiv = document.createElement('div')
      errorDiv.innerHTML = `
        <h1 class="header">That issue can not be posted.</h1>
      `
      this.form.appendChild(errorDiv);
    })
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

  renderAllIssues() {
    console.log('Rendering all issues');
    adapter.fetchIssues()
      .then(issues => 
        issues.forEach(issue => this.issuesContainer.appendChild(new Issue(issue).toHTML()))
      );
  }
}
