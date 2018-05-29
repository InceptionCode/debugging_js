import {expect} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';
import sinon from 'sinon';
import People from './store/People.js';
import DATABASE_API from './store/DatabaseApi.js';

const {JSDOM} = jsdom;

const MockDB_API = sinon.mock(DATABASE_API);
/* global describe it */

describe('Demo App', () => {
  describe('Add A Person', () => {
    it('should add a list element (person) and add person to DB', (done) => {
      const demo = fs.readFileSync('./src/demo-spec.html', 'utf-8');
      const { document } = (new JSDOM(demo)).window;
      const peopleDisplayList = document.querySelector('ul[data-id="people-display"]'),
            addPersonBtn = document.querySelector('button[data-id="addPerson"]');

      function buildListElem (name) {
        const listElem = document.createElement('li'),
              spanName = document.createElement('span'),
              spanDelete = document.createElement('span'),
              spanEdit = document.createElement('span');

        spanName.innerHTML = name;
        spanDelete.innerHTML = ' x';
        spanDelete.setAttribute('data-id','deletePerson');
        spanEdit.innerHTML = ' e';
        spanEdit.setAttribute('data-id', 'editPerson');

        listElem.appendChild(spanName);
        listElem.appendChild(spanDelete);
        listElem.appendChild(spanEdit);

        return listElem;
      }
      function addAndRenderPerson () {
        const listElem = buildListElem('jane');
        peopleDisplayList.appendChild(listElem);
        sinon.spy(DATABASE_API,'addToList');
        DATABASE_API.addToList('jane');
      }

      addPersonBtn.addEventListener('click', addAndRenderPerson);
      var event = document.createEvent('HTMLEvents');
      event.initEvent('click', true, false);
      addPersonBtn.dispatchEvent(event);

      // Expect DOM List
      expect(peopleDisplayList.children.length).to.equal(3);
      expect(peopleDisplayList.children[2].tagName).to.equal('LI');
      // Expect Database using sinon spy
      expect(DATABASE_API.addToList.callCount).to.equal(1);
      expect(People.LIST.length).to.equal(3);
      done();
    });
  });
  
  
  describe('Delete A Person', () => {
    it('Should delete a list element (person) and remove person from DB', (done) => {
      const demo = fs.readFileSync('./src/demo-spec.html', 'utf-8');
      const { document } = (new JSDOM(demo)).window;
      const peopleDisplayList = document.querySelector('ul[data-id="people-display"]'),
            deletePersonBtn = document.querySelector('span[data-id="deletePerson"]');

      MockDB_API.expects('deleteFromList').once()
        .withExactArgs('Darrell')
        .returns(People.LIST = [{id: 2, name:'kevin'}]);

      function deletePerson (e) {
        let li = e.target.parentNode;
        const name = li.children[0].innerHTML;
        DATABASE_API.deleteFromList(name);
        li.remove();
      }

      deletePersonBtn.addEventListener('click', deletePerson);
      var event = document.createEvent('HTMLEvents');
      event.initEvent('click', true, false);
      deletePersonBtn.dispatchEvent(event);

      // Expect Database using sinon mock
      MockDB_API.verify();
      expect(People.LIST.length).to.equal(1);
      // Expect DOM List
      expect(peopleDisplayList.children.length).to.equal(1);
      done();
    });
  });
});

