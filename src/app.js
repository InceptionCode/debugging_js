import sass from './main.sass'; // eslint-disable-line no-unused-vars
import {LIST} from './store/People.js';
import DATABASE_API from './store/DatabaseApi.js';


const peopleDisplayList = document.querySelector('ul[data-id="people-display"]'),
      addPersonBtn = document.querySelector('button[data-id="addPerson"]'),
      input = document.querySelector('input');

renderInitialPeople(LIST);

function renderInitialPeople(people) {
  people.forEach(person => {
    const listElem = buildListElem(person.name);
    peopleDisplayList.appendChild(listElem);
  });
}

function buildListElem (name) {
  const listElem = document.createElement('li');
  const childElems = {
    name,
    spanName: document.createElement('span'),
    spanDelete: document.createElement('span'),
    spanEdit: document.createElement('span')
  };

  buildChildElems(childElems);

  listElem.appendChild(childElems.spanName);
  listElem.appendChild(childElems.spanDelete);
  listElem.appendChild(childElems.spanEdit);

  return listElem;
}

function buildChildElems({name, spanDelete, spanEdit, spanName}) {
  spanName.innerHTML = name;
  spanDelete.innerHTML = ' x';
  spanDelete.setAttribute('data-id', 'deletePerson');
  spanEdit.innerHTML = ' e';
  spanEdit.setAttribute('data-id', 'editPerson');
  spanDelete.addEventListener('click', deletePerson);
  spanEdit.addEventListener('click', editPerson);
}

addPersonBtn.addEventListener('click', addAndRenderPerson);

function addAndRenderPerson () {
  const name = input.value;
  const listElem = buildListElem(name);
  peopleDisplayList.appendChild(listElem);
  DATABASE_API.addToList(name);
  input.value = '';
}

function deletePerson (e) {
  const name = e.target.previousElementSibling.innerHTML;
  DATABASE_API.deleteFromList(name);
  let li = e.target.parentNode;
  li.remove();
}

// TODO: Finish editing feature
function editPerson (e) {
  let name = e.target.parentNode.children[0];
  deletePerson(e);
  input.value = name.innerHTML;
}