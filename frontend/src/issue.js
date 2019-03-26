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
    this.constructor.all.push(this);
    this.comments = []
    comments.forEach(comment => {
      this.comments.push(new Comment(comment))
    })
  }

  toHTML() {
    const newDiv = document.createElement('div');
    newDiv.innerHTML =
    `<div class="sixteen wide column">
        <div class="ui horizontal segments">
          <div class="ui segment" data-id="${this.id}">
            <span style="font-weight: bold;">${this.votes}</span>
            <div class="ui buttons">
              <button data-id="${this.id}" class="ui button">Downvote</button>
              <div class="or"></div>
              <button data-id="${this.id}" class="ui positive button">Upvote</button>
            </div>
          </div>
          <div class="ui segment" data-id="${this.id}">
            <h2 class="issue details" data-id="${this.id}">${this.title}</h2>
            <span class="issue details" data-id="${this.id}">${this.comments.length} Comments</span>
          </div>
        </div>
      </div>`;

    return newDiv;
  }

  get category() {
    return Category.findById(this.categoryId).title
  }

  static findById(id) {
    return Issue.all.find(issue => issue.id === id);
  }
}

Issue.all = [];
