import People from './People';
// TODO: Make sure editList feature works on back end.

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
  },
  editList: (currentName, newName) => {
    const selectedPerson = People.LIST.find(person => person.name === currentName);
    const editedPerson = Object.assign({name: newName, ...selectedPerson}, selectedPerson);
    const editedPeople = People.LIST.filter(person => person.name !== currentName);
    People.LIST = editedPeople;
    People.LIST.push(editedPerson);
  }
};