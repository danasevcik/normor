class Comment {
  constructor({id, content, votes}) {
    this.id = id;
    this.content = content;
    this.votes = votes;
    this.constructor.all.push(this);
  }
}

Comment.all = [];