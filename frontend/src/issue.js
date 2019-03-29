class Issue {
  constructor({id, title, location, votes, category_id, description, created_at, resolved, comments}) {
    this.id = id;
    this.title = title;
    this.location = location;
    this.votes = votes;
    this.categoryId = category_id;
    this.description = description;
    this.createdDate = created_at;
    this.resolved = resolved;
    this.comments = [];
    comments.forEach(comment => this.comments.push(new Comment(comment)));
    this.constructor.all.push(this);
  }

  get category() {
    return Category.findById(this.categoryId).title;
  }

  sortComments() {
    this.comments.sort((a, b) => {
      if (a.votes === b.votes) {
        return 0
      } else if (a.votes > b.votes) {
        return -1
      } else {
        return 1
      }
    });
  }

  toHTML() {
    const newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'twelve wide column');
    newDiv.setAttribute('data-id', this.id);
    newDiv.setAttribute('style', 'border-style: solid; border-radius: 5px; border-width: 1px; border-color: white; background-color: white; margin-top: 1em;');
    newDiv.innerHTML = 
      `<div class="ui grid">
        <div class="four wide column issue details" data-id="${this.id}">
          <div class="blue ui buttons">
            <button class="ui icon button issue downvote" data-id="${this.id}">
              <i class="arrow down icon" data-id="${this.id}"></i>
            </button>
            <button class="ui button issue details" data-id="${this.id}">
              ${this.votes} Votes
            </button>
            <button class="ui right icon button issue upvote" data-id="${this.id}">
              <i class="arrow up icon" data-id="${this.id}"></i>
            </button>
          </div>
        </div>
        <div class="nine wide column middle aligned issue details" data-id="${this.id}">
          <div class="column">
            <h3 class="issue details" data-id="${this.id}">${this.title}</h3>
          </div>
        </div>
        <div class="three wide right aligned column issue details" data-id="${this.id}" style="margin-top: 0.7em;">
          <span class="issue details" data-id="${this.id}">${this.comments.length} Comments</span>
        </div>
      </div>`;
    return newDiv;
  }

  static findById(id) {
    return Issue.all.find(issue => issue.id === id);
  }
}

Issue.all = [];
