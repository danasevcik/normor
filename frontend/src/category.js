class Category {
  constructor({id, title}) {
    this.id = id;
    this.title = title;
    this.constructor.all.push(this);
  }

  static findById(categoryId) {
    return Category.all.find(category => category.id === categoryId);
  }
}

Category.all = [];