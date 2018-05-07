import sass from './main.sass'; // eslint-disable-line no-unused-vars
import {initialDB} from './db.js';

// TODO(Feature): finish this function. Expectation to grab the list of todos from the database and render that list.
(function initPeople() {
  const people = initialDB.getPeople();
  return (
    people.forEach(person => {
      peopleDisplay.appendChild(buildElement(person.name));
    })
  );

})();

/*
Recreate this inside of peopleDisplay
 <li>
      <span>Darrell</span>
      <span>x</span>
  </li>
*/
const peopleDisplay = document.querySelector('ul[data-id="people-display"]'),
      addPersonBtn = document.querySelector('button[data-id="addPerson"]'),
      input = document.querySelector('input');

function buildElement (name) {

  const listElem = document.createElement('li'),
        spanName = document.createElement('span'),
        spanDelete = document.createElement('span'),
        spanEdit = document.createElement('span');

  spanName.innerHTML = name;
  spanDelete.innerHTML = ' x';
  spanDelete.setAttribute('data-id','deletePerson');
  spanEdit.innerHTML = ' e';
  spanEdit.setAttribute('data-id', 'editPerson');
  spanDelete.addEventListener('click', deletePerson);
  spanEdit.addEventListener('click', editPerson);

  listElem.appendChild(spanName);
  listElem.appendChild(spanDelete);
  listElem.appendChild(spanEdit);
   

  return listElem;
}

function addPerson () {
  peopleDisplay.appendChild(buildElement(input.value));
  initialDB.addToDB(input.value);
  input.value = '';
}

function deletePerson (e) {
  const name = e.target.previousElementSibling.innerHTML;
  initialDB.deleteFromDB(name);
  let li = e.target.parentNode;
  li.remove();
}

function editPerson (e) {
  let name = e.target.parentNode.children[0];
  deletePerson(e);
  input.value = name.innerHTML;
}

addPersonBtn.addEventListener('click', addPerson);