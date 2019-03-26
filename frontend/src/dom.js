class Dom {
  constructor() {
    // this.form = document.querySelector('.ui.form')
    this.issues = document.querySelector('#allissues')
    this.issuesContainer = document.querySelector('div.ui.stackable.grid.container');
    console.log('form')
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('handling submit')

    const title = this.form.querySelector('#issuetitle').value
    const description = this.form.querySelector('#issuedescription').value
    const zipcode = this.form.querySelector('#issuezipcode').value
    const category = this.form.querySelector('#issuecategory').value

    this.form.querySelector('#issuetitle').value = ''
    this.form.querySelector('#issuedescription').value = ''
    this.form.querySelector('#issuezipcode').value = ''
    this.form.querySelector('#issuecategory').value = 'Category'

    issueAdapter.create({title: title, description: description, zipcode: zipcode, category:category})
    .then(response => {
      console.log(response)
      new Issue(response)
    }).catch(error => {
      console.log('in the catch');
      const errorDiv = document.createElement('div')
      errorDiv.innerHTML = `
        <h1 class="header">That issue can not be posted.</h1>
      `
      this.form.appendChild(errorDiv)
    })
  }

  seeAllIssues(e) {
    e.preventDefault()
    console.log('handling all issues')
    issueAdapter.fetch()
    .then(issues => {
      issues.forEach(issue => {
        new Issue(issue)
      })
      Issue.renderAll(this.issuesContainer);
    })
  }

  handleVote(e) {
    switch(e.target.innerText) {
      case 'Upvote':
        issueAdapter.upvote({id: e.target.dataset.id})
        .then(issue => {
          // debugger
          // console.log(issue)
          e.target.parentNode.parentElement.firstElementChild.innerText = issue.votes
        })
        // debugger
        break;
      case 'Downvote':
        const issueId = e.target.dataset.id
        break;
      default:
        console.log('click something else')
    }
    // console.log(e.target)
    // if (e.target.innerText === 'Downvote') {
    //   console.log('down')
    //   console.log(this)
    //
    //
    // } else if (e.target.innerText === 'Upvote') {
    //
    // }
  }

  addAllEventListeners() {
    console.log('adding listeners')
    // this.form.addEventListener('submit', this.handleSubmit.bind(this))
    this.issues.addEventListener('click', this.seeAllIssues.bind(this))
    this.issuesContainer.addEventListener('click', this.handleVote.bind(this))
  }

}
