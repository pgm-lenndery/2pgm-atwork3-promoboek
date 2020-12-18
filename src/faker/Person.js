const { v4: uuidv4 } = require('uuid');

class Person {

  constructor({ firstName, lastName, avatar, projectImages  }) {
    this.id = uuidv4();
    this.firstName = firstName;
    this.lastName = lastName;
    this.avatar = avatar;
    this.projectImages = projectImages;
  }


}

module.exports = Person;