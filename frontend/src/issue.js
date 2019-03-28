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
    newDiv.setAttribute('class', 'twelve wide column');
    newDiv.setAttribute('data-id', this.id);
    newDiv.setAttribute('style', 'border-style: solid; border-radius: 5px; border-width: 1px; background-color: white; margin-top: 2em;');
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
              <h2 class="issue details" data-id="${this.id}">${this.title}</h2>
            </div>
          </div>
          <div class="three wide column middle aligned issue details" data-id="${this.id}">
            <span class="issue details" data-id="${this.id}">${this.comments.length} Comments</span>
          </div>
        </div>`;
    // `<div class="four wide column" data-id="${this.id}">
    //     <div class="column"><i class="arrow up icon"></i></div>
    //     <div class="center aligned row" style="font-weight: bold; text-align: center">${this.votes}</div>
    //     <div class="column"><i class="arrow down icon"></i></div>
    //   </div>
    //   <div class="twelve wide column" data-id="${this.id}">
    //     <h2 class="issue details" data-id="${this.id}">${this.title}</h2>
    //     <span class="issue details" data-id="${this.id}">${this.comments.length} Comments</span>
    //   </div>`;

    return newDiv;
  }

            //   <div class="ui buttons">
            //   <button data-id="${this.id}" class="ui button">Downvote</button>
            //   <div class="or"></div>
            //   <button data-id="${this.id}" class="ui positive button">Upvote</button>
            // </div>

  get category() {
    return Category.findById(this.categoryId).title
  }

  static findById(id) {
    return Issue.all.find(issue => issue.id === id);
  }
}

Issue.all = [];
