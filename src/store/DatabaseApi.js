import People from './People';

export default {
  addToList: (name) => {
    const currentPeople = People.LIST.slice();
    const lastPersonID = currentPeople.pop().id;
    let newPerson = {
      id: lastPersonID + 1,
      name
    };
    People.LIST.push(newPerson);
  },
  deleteFromList: (name) => {
    const editedPeople = People.LIST.filter(person => person.name !== name);
    People.LIST = editedPeople;
  }
};