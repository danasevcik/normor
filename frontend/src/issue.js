class Issue {
  constructor({id, title, location, votes, category, description, createdDate, resolved}) {
    this.id = id;
    this.title = title;
    this.location = location;
    this.votes = votes;
    this.category = category;
    this.description = description;
    this.createdDate = createdDate;
    this.resolved = resolved;
    this.constructor.all.push(this);
  }

  toHTML() {
    const div = document.createElement('div')
    div.innerHTML =
    `<div class="sixteen wide column">
        <div class="ui horizontal segments">
            <div class="ui segment">
              <span style="font-weight: bold;">${this.votes}</span>
              <div class="ui buttons">
                <button data-id="${this.id}" class="ui button">Downvote</button>
                <div class="or"></div>
                <button data-id="${this.id}" class="ui positive button">Upvote</button>
              </div>
            </div>
            <div class="ui segment">
              <h2>${this.title}</h2>
            </div>
            <div class="ui segment">
              <a href="" data-id="${this.id}">Comments</a>
            </div>
        </div>
      </div>`;

    return div
  }

  render(domNode) {
    domNode.appendChild(this.toHTML())
  }

  static renderAll(domNode) {
    domNode.innerHTML = ''

    this.all.forEach(issue => {
      issue.render(domNode)
    })
  }

}

Issue.all = [];
