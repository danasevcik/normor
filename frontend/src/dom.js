class Dom {
  constructor() {
    this.newIssueForm = document.querySelector('form.ui.form');
    this.newIssueSubmitButton = document.querySelector('div.ui.positive.right.labeled.icon.button');
    this.issues = document.querySelector('#allissues');
    this.issuesContainer = document.querySelector('div.ui.stackable.grid.container');
    this.rightMenu = document.querySelector('div.ui.right.fixed.vertical.menu');
    this.topMenu = document.querySelector('div.ui.top.menu');
    this.issueModal = document.getElementById('view-issue-modal');
    this.categoryDropdown = document.getElementById('issuecategory');
    // new comment form
  }

  addAllEventListeners() {
    console.log('adding listeners')
    this.newIssueSubmitButton.addEventListener('click', this.handleSubmit.bind(this))
    this.issuesContainer.addEventListener('click', this.handleIssuesContainer.bind(this));
    this.rightMenu.addEventListener('click', this.handleRightMenu.bind(this));
  }

  populateDropDown() {
    Category.all.forEach(category => {
      const newOption = document.createElement('option')
      newOption.innerText = category.title
      newOption.setAttribute('data-id', category.id)
      this.categoryDropdown.append(newOption)
    })
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
      $('#create-issue-modal').modal('hide');
    }).catch(error => {
      console.log('in the catch');
      const errorDiv = document.createElement('div')
      errorDiv.innerHTML = `
        <h1 class="header">That issue can not be posted.</h1>
      `
      this.newIssueForm.appendChild(errorDiv);
    });
  }

  // handle submit for new comment
  // send to adapter.createComment

  handleIssuesContainer(e) {
    console.log(e.target.className)
    let issueId = parseInt(e.target.dataset.id)
    switch(e.target.className) {
      case 'ui positive button':
        adapter.upvoteIssue(e.target.dataset.id)
          .then(issue =>
            e.target.parentNode.parentElement.firstElementChild.innerText = issue.votes
          );
        break;
      case 'ui button':
        adapter.downvoteIssue(e.target.dataset.id)
          .then(issue =>
            e.target.parentNode.parentElement.firstElementChild.innerText = issue.votes
          );
        break;
      case 'ui segment':
        this.renderIssueModal(issueId);
        break;
      case 'issue details':
        this.renderIssueModal(issueId);
        break;
      default:
        console.log(e.target.className);
    }
  }

  renderIssueModal(issueId) {
    const clickedIssue = Issue.findById(issueId);

    const clickedTitle = clickedIssue.title
    const clickedDescription = clickedIssue.description
    const clickedVotes = clickedIssue.votes
    const clickedDateReported = clickedIssue.createdDate.slice(0,10)
    const clickedStatus = (clickedIssue.resolved ? 'Resolved' : 'Not Resolved')
    const clickedZip = clickedIssue.zipcode
    // const clickedCategory = Category.all.find(category => {
    //   return category.id === clickedIssue.category_id
    // })
    // const clickedCategory =
    const clickedComments = clickedIssue.comments
    // debugger

    // console.log('clicked status', clickedStatus)
    // console.log('clicked votes',clickedVotes);
    // console.log('clicked category',clickedCategory);
    // console.log('clicked id',issueId)
    console.log('clicked comments',clickedComments)
    // console.log(clickedIssue)

    this.issueModal.innerHTML = ''
    this.issueModal.innerHTML = `
    <div class="header">Issue: ${clickedTitle}</div>
    <div class="scrolling content">
      <h2>Details</h2>
      <h3>Description</h3>
      <p>${clickedDescription}</p>
      <h3>Votes</h3>
      <p>${clickedVotes}</p>
      <h3>Category</h3>
      <p>${clickedIssue.category}</p>
      <h3>Date Reported</h3>
      <p>${clickedDateReported}</p>
      <h3>Status</h3>
      <p>${clickedStatus}</p>
      <h3>Comments</h3>
      ${clickedComments.map(comment => {
        return `<p>${comment.content}</p>`
      }).join('')}
      <p></p>
      <div class="actions">
        <div class="ui black deny button">
          Back
        </div>
        <div class="ui positive button">
          Add New Comment
          <i class="checkmark icon"></i>
        </div>
    `
    $('#view-issue-modal').modal('show');
  }

  handleRightMenu(e) {
    switch(e.target.innerText) {
      case 'Submit New Issue':
        $('#create-issue-modal').modal('show');
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
