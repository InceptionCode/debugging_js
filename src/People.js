module.exports = {
  PEOPLE_LIST: {
    people: [
      {
        id: 1,
        name: 'Darrell'
      },
      {
        id: 2,
        name: 'Kevin'
      }
    ],
    getPeople: function() {
      return this.people;
    },
    addToList: function(name) {
      const currentPeople = this.people.slice();
      const lastPersonID = currentPeople.pop().id;
      let newPerson = {
        id: lastPersonID + 1,
        name
      };
      return this.people.push(newPerson);
    },
    deleteFromList: function(name) {
      const editedList = this.people.filter(person => person.name !== name);
      this.people = editedList;
    }
  }
};