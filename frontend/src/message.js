class Message {
  
  constructor({content}) {
    this.content = content;
    this.constructor.all.push(this);
  }

}

Message.all = [];
