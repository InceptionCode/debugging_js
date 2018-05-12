import sass from './main.sass'; // eslint-disable-line no-unused-vars
import {initialDB} from './db.js';

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

initPeople(initialDB.getPeople());



function initPeople(people) {
  return people.forEach(person => {
    peopleDisplay.appendChild(buildListElem(person.name));
  });

}

function buildSpans(name, spanDelete, spanEdit, spanName) {
  spanName.innerHTML = name;
  spanDelete.innerHTML = ' x';
  spanDelete.setAttribute('data-id', 'deletePerson');
  spanEdit.innerHTML = ' e';
  spanEdit.setAttribute('data-id', 'editPerson');
  spanDelete.addEventListener('click', deletePerson);
  spanEdit.addEventListener('click', editPerson);
}

function buildListElem (name) {

  const listElem = document.createElement('li'),
        spanName = document.createElement('span'),
        spanDelete = document.createElement('span'),
        spanEdit = document.createElement('span');
  buildSpans(name, spanDelete, spanEdit, spanName);

  listElem.appendChild(spanName);
  listElem.appendChild(spanDelete);
  listElem.appendChild(spanEdit);
   

  return listElem;
}

function addPerson () {
  const name = input.value;
  peopleDisplay.appendChild(buildListElem(name));
  initialDB.addToDB(name);
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