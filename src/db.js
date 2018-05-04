module.exports = {
  initialDB: {
    people: [
      {
        id: 1,
        name: 'Darrell'
      }
    ],
    addToDB: function(name) {
      const currentPeople = this.people.slice();
      const lastPersonID = currentPeople.pop().id;
      let newPerson = {
        id: lastPersonID + 1,
        name
      };
      return this.people.push(newPerson);
    },
    deleteFromDB: function(name) {
      const editedList = this.people.filter(person => person.name !== name);
      this.people = editedList;
    }
  }
};