class Users {
  constructor() {
    this.users = [];
  }
  addUser(id, name, room) {
    const user = {
      id,
      name,
      room
    };
    this.users.push(user);
    return user;
  }
  removeUser(id) {
    const thisUser = this.getUser(id);
    if (thisUser) {
      this.users = this.users.filter(user => user.id !== id);
    }
    return thisUser;
  }
  getUser(id) {
    const users = this.users.filter(user => user.id === id);
    return users[0];
  }
  getUserList(room) {
    const users = this.users.filter(user => user.room === room);
    const namesArray = users.map(user => user.name);
    return namesArray;
  }
}

module.exports = {
  Users
};
