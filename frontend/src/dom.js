class Dom {
  constructor() {
    this.topMenu = document.querySelector('div.ui.fixed.inverted.menu');
    this.newIssueForm = document.querySelector('form.ui.form');
    this.newIssueSubmitButton = document.querySelector('div.ui.positive.right.labeled.icon.button');
    this.issuesContainer = document.getElementById('issues-container');
    this.issueModal = document.getElementById('view-issue-modal');
    this.chatModal = document.getElementById('chat-modal');
    this.chatInput = document.getElementById('chat-input');
    this.chatContent = document.getElementById('chat-content');
    this.categoryDropdown = document.getElementById('issue-category');
  }

  addAllEventListeners() {
    this.topMenu.addEventListener('click', this.handleTopMenu.bind(this));
    this.newIssueSubmitButton.addEventListener('click', this.handleSubmit.bind(this))
    this.issuesContainer.addEventListener('click', this.handleIssuesContainer.bind(this));
    this.issueModal.addEventListener('click', this.handleIssueModalClick.bind(this));
    this.chatModal.addEventListener('click', this.handleSendMessage.bind(this));
  }

  populateDropDown() {
    Category.all.forEach(category => {
      const newOption = document.createElement('option');
      newOption.innerText = category.title;
      newOption.setAttribute('data-id', category.id);
      this.categoryDropdown.append(newOption);
    });
  }

  handleIssueModalClick(e) {
    console.log(e.target.tagName)
    switch(e.target.tagName) {
      case 'BUTTON':
        const commentContent = document.getElementById('comment-content').value
        adapter.createComment({votes: 0, content: commentContent, issue_id: parseInt(e.target.dataset.id)})
          .then(comment => {
            const thisIssue = Issue.findById(parseInt(e.target.dataset.id));
            thisIssue.comments.push(new Comment(comment));
            this.renderIssueModal(parseInt(e.target.dataset.id));

            const parentSpan = Array.from(document.querySelectorAll('span.issue.details')).find(span => span.dataset.id === e.target.dataset.id);
            parentSpan.innerText = `${thisIssue.comments.length} Comments`;
          });
        break;
      case 'I':
        if(e.target.className === 'arrow down icon') {
          console.log('down');
          console.log(e.target);
          adapter.downvoteComment(parseInt(e.target.dataset.id))
          .then(comment => {
            Comment.findById(comment.id).votes -= 1;
            e.target.parentNode.firstElementChild.innerText = `Votes: ${comment.votes}`
          });
        } else {
            console.log('up');
          adapter.upvoteComment(parseInt(e.target.dataset.id))
          .then(comment => {
            Comment.findById(comment.id).votes += 1;
            e.target.parentNode.firstElementChild.innerText = `Votes: ${comment.votes}`
          });
        }
        break;
      default:
        break;
    }
  }

  handleSubmit() {
    const title = this.newIssueForm.querySelector('#issue-title').value;
    const description = this.newIssueForm.querySelector('#issue-description').value;
    const zipcode = this.newIssueForm.querySelector('#issue-zipcode').value;
    const category = this.newIssueForm.querySelector('#issue-category').value;

    this.newIssueForm.querySelector('#issue-title').value = '';
    this.newIssueForm.querySelector('#issue-description').value = '';
    this.newIssueForm.querySelector('#issue-zipcode').value = '';
    this.newIssueForm.querySelector('#issue-category').value = 'Category';

    adapter.createIssue({ title: title, description: description, zipcode: zipcode, category:category })
      .then(attributes => {
        this.issuesContainer.appendChild(new Issue(attributes).toHTML());
        $('#create-issue-modal').modal('hide');
      }).catch(error => {
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = '<h1 class="header">That issue can not be posted.</h1>';
        this.newIssueForm.appendChild(errorDiv);
      });
  }

  handleIssuesContainer(e) {
    const issueId = parseInt(e.target.dataset.id);

    if (e.target.className === 'arrow up icon') {
      adapter.upvoteIssue(issueId)
        .then(issue => {
          const thisIssue = Issue.findById(issueId);
          thisIssue.votes += 1;
          this.renderIssueModal(issueId)
          e.target.parentElement.previousElementSibling.innerText = `${issue.votes} Votes`;
        });
    } else if (e.target.className === 'arrow down icon') {
      adapter.downvoteIssue(issueId)
        .then(issue => {
          const thisIssue = Issue.findById(issueId);
          thisIssue.votes -= 1;
          this.renderIssueModal(issueId)
          e.target.parentElement.nextElementSibling.innerText = `${issue.votes} Votes`
        });
    } else if (e.target.className.includes('issue upvote')) {
      adapter.upvoteIssue(issueId)
        .then(issue => {
          const thisIssue = Issue.findById(issueId);
          thisIssue.votes += 1;
          this.renderIssueModal(issueId)
          e.target.previousElementSibling.innerText = `${issue.votes} Votes`;
        });
    } else if (e.target.className.includes('issue downvote')) {
      adapter.downvoteIssue(issueId)
        .then(issue => {
          const thisIssue = Issue.findById(issueId);
          thisIssue.votes -= 1;
          this.renderIssueModal(issueId)
          e.target.nextElementSibling.innerText = `${issue.votes} Votes`
        });
    } else if (e.target.className.includes('issue details')) {
      this.renderIssueModal(issueId);
      $('#view-issue-modal').modal('show');
    } else {
      console.log('I dunno what to do at this point.');
    }
  }

  renderIssueModal(issueId) {
    const clickedIssue = Issue.findById(issueId);
    clickedIssue.sortComments();

    this.issueModal.innerHTML = ''
    this.issueModal.innerHTML = `
      <div class="header">${clickedIssue.title}</div>
      <div class="scrolling content">
        <h4>Description</h4>
        <p>${clickedIssue.description}</p>
        <h4>Votes</h4>
        <p>${clickedIssue.votes}</p>
        <h4>Category</h4>
        <p>${clickedIssue.category}</p>
        <h4>Date Reported</h4>
        <p>${new Date(clickedIssue.createdDate).toDateString()}</p>
        <h4>Status</h4>
        <p>${(clickedIssue.resolved ? 'Resolved' : 'Not Resolved')}</p>
        <h4 class="ui dividing header" style="margin-bottom: 2em;">Comments</h4>
        ${clickedIssue.comments.map(comment => {
          return `
          <div class='ui grid'>
            <div class="ui minimal comments">
              <div class="comment">
                <a class="avatar">
                  <i class="big user circle icon"></i>
                </a>
                <div class="content">
                  <div class="metadata">
                    <span class="date">Votes: ${comment.votes}</span>
                    <i class="arrow down icon" data-id="${comment.id}"></i>
                    <i class="arrow up icon" data-id="${comment.id}"></i>
                  </div>
                  <div class="text">
                    ${comment.content}
                  </div>
                </div>
              </div>
            </div>
          </div>
          `;
          // <div class="ui buttons">
          // <button data-id="${comment.id}" class="ui button">Downvote</button>
          // <div class="or"></div>
          // <button data-id="${comment.id}" class="ui positive button">Upvote</button>
          // </div>
        }).join('')}
          <p></p>
          <form class="ui form">
            <div class="field" style="margin-top: 2em;">
              <label>New Comment</label>
              <textarea id='comment-content' name="content" placeholder="Type Your Comment Here"></textarea>
            </div>
          </form>
        <p></p>
        <div class="actions">
          <div class="ui black deny button">
            Back
          </div>
          <button class="ui green right labeled icon button" data-id="${issueId}">Add New Comment <i class="checkmark icon"></i></button>
          <!-- <div class="ui positive button" data-id="${issueId}">
            Add New Comment <i class="checkmark icon"></i>
          </div> -->`;
  }

  handleTopMenu(e) {
    switch(e.target.innerText) {
      case 'Chat':
        this.renderChatMessage(`${username} has joined the chat.`);
        $('#chat-modal').modal('show');
        break;
      case 'Submit New Issue':
        $('#create-issue-modal').modal('show');
        break;
      case 'Refresh':
        this.renderAllIssues();
        break;
      // case 'Contact':
      //   $('#contact-modal').modal('show');
      //   break;
      case 'About':
        $('#about-modal').modal('show');
        break;
      default:
        break;
    }
  }

  handleSendMessage(e) {
    if (e.target.innerText === 'Send') {
      adapter.sendMessage({ text: `${username}: ${this.chatInput.value}` });
    }
  }

  // randomizePhotos(photos) {
  //   const randIndexNum = Math.floor(Math.random() * 13)
    // console.log(randIndexNum)
  //   const photo = photos[randIndexNum]
  //   console.log(photo)
  //   return photo
  // }

  renderChatMessage(str) {
    const newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'ui grid')
    newDiv.innerHTML = `
      <div class="ui minimal comments">
        <div class="comment">
          <a class="avatar">
            <i class="big user circle icon"></i>
          </a>
          <div class="content">

            <div class="text">
              ${str}
            </div>
          </div>
        </div>
      </div>`;
    this.chatContent.append(newDiv);
    this.chatInput.value = '';
  }

  renderAllIssues() {
    this.issuesContainer.innerHTML = '';
    adapter.fetchIssues()
      .then(issues => issues.forEach(issue =>
        this.issuesContainer.appendChild(new Issue(issue).toHTML())
      ));
  }
}
