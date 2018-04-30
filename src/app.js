import sass from './main.sass'; // eslint-disable-line no-unused-vars

const peopleDisplay = document.querySelector('ul[data-id="people-display"]'),
      addPersonBtn = document.querySelector('button[data-id="addPerson"]'),
      deletePersonBtn = document.querySelector('span[data-id="deletePerson"]'),
      editPersonBtn = document.querySelector('span[data-id="editPerson"]'),  
      input = document.querySelector('input');
/*
Recreate this inside of peopleDisplay
 <li>
      <span>Darrell</span>
      <span>x</span>
  </li>
*/

function buildElement () {
  const listElem = document.createElement('li'),
        spanName = document.createElement('span'),
        spanDelete = document.createElement('span'),
        spanEdit = document.createElement('span');

  spanName.innerHTML = input.value;
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
  peopleDisplay.appendChild(buildElement());
  input.value = '';
}

function deletePerson (e) {
  let li = e.target.parentNode;
  li.remove();
}

function editPerson (e) {
  let name = e.target.parentNode.children[0];
  deletePerson(e);
  input.value = name.innerHTML;
}

addPersonBtn.addEventListener('click', addPerson);
deletePersonBtn.addEventListener('click', deletePerson);
editPersonBtn.addEventListener('click', editPerson);