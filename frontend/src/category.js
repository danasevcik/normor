class Category {
  constructor({id, title}) {
    this.id = id;
    this.title = title;
    this.constructor.all.push(this);
  }
}

Category.all = [];