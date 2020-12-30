const Person = require('./Person');
const fs = require('fs');
const faker = require('faker');
const { v4: uuidv4 } = require('uuid');

const generateData = () => {

  const fakeData = [];

  for(i = 0; i < 20; i++) {
  
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let avatar = faker.image.image();
    let projectImages = [
      {
        "imageId": uuidv4(),
        "image": faker.image.abstract(),
      },
      {
        "imageId": uuidv4(),
        "image": faker.image.abstract(),
      },
      {
        "imageId": uuidv4(),
        "image": faker.image.abstract(),
      },
    ];

    const fakePerson = new Person({ firstName: firstName, lastName: lastName, avatar: avatar, projectImages: projectImages  });

    fakeData.push(fakePerson);

  }

  return fakeData;
}

const writeData = () => {

  let data = generateData();

  let jsonData = JSON.stringify(data);

  fs.writeFile('./students.json', jsonData, (err) => {
    if(err) console.log('nieje mut');  
  })

}

const initFakeData = async () => {

  writeData();
  
  
}

initFakeData();