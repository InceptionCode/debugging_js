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

addPersonBtn.addEventListener('click', addAndRenderPerson);

function addAndRenderPerson () {
  const name = input.value;
  const listElem = buildListElem(name);
  peopleDisplayList.appendChild(listElem);
  DATABASE_API.addToList(name);
  input.value = '';
}

function buildListElem (name) {
  const listElem = document.createElement('li');
  const children = {
    name,
    spanName: document.createElement('span'),
    spanDelete: document.createElement('span'),
    spanEdit: document.createElement('span')
  };

  const {spanName, spanDelete, spanEdit} = buildChildElems(children);

  listElem.appendChild(spanName);
  listElem.appendChild(spanDelete);
  listElem.appendChild(spanEdit);

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

  return {
    spanName,
    spanDelete,
    spanEdit
  };
}

function deletePerson (e) {
  let li = e.target.parentNode;
  const name = li.children[0].innerHTML;
  DATABASE_API.deleteFromList(name);
  li.remove();
}

function editPerson (e) {
  let name = e.target.parentNode.children[0];
  deletePerson(e);
  input.value = name.innerHTML;
}