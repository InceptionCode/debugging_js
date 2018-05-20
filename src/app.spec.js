import {expect} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';
import sinon from 'sinon';
import {PEOPLE_LIST} from './People.js';

const {JSDOM} = jsdom;

const MockInitialDB = sinon.mock(PEOPLE_LIST);
/* global describe it */

describe('Demo App', () => {
  describe('Add A Person', () => {
    it('should add a list element (person) and add person to DB', (done) => {
      const demo = fs.readFileSync('./src/demo-spec.html', 'utf-8');
      const { document } = (new JSDOM(demo)).window;
      const peopleDisplay = document.querySelector('ul[data-id="people-display"]'),
            addPersonBtn = document.querySelector('button[data-id="addPerson"]');

      
      function buildElement () {
        const listElem = document.createElement('li'),
              spanName = document.createElement('span'),
              spanDelete = document.createElement('span'),
              spanEdit = document.createElement('span');
  
        spanName.innerHTML = 'jane';
        spanDelete.innerHTML = ' x';
        spanDelete.setAttribute('data-id','deletePerson');
        spanEdit.innerHTML = ' e';
        spanEdit.setAttribute('data-id', 'editPerson');
  
        listElem.appendChild(spanName);
        listElem.appendChild(spanDelete);
        listElem.appendChild(spanEdit);
        
  
        return listElem;
      }
      function addPerson () {
        peopleDisplay.appendChild(buildElement());
        sinon.spy(PEOPLE_LIST,'addToList');
        PEOPLE_LIST.addToList('jane');
      }
  
      addPersonBtn.addEventListener('click', addPerson);
      var event = document.createEvent('HTMLEvents');
      event.initEvent('click', true, false);
      addPersonBtn.dispatchEvent(event);
      
      // Expect DOM List
      expect(peopleDisplay.children.length).to.equal(3);
      expect(peopleDisplay.children[2].tagName).to.equal('LI');
      // Expect Database using sinon spy
      expect(PEOPLE_LIST).to.have.property('people');
      expect(PEOPLE_LIST.addToList.callCount).to.equal(1);
      expect(PEOPLE_LIST.people.length).to.equal(3);
      done();
    });
  });
  
  
  describe('Delete A Person', () => {
    it('Should delete a list element (person) and remove person from DB', (done) => {
      const demo = fs.readFileSync('./src/demo-spec.html', 'utf-8');
      const { document } = (new JSDOM(demo)).window;
      const peopleDisplay = document.querySelector('ul[data-id="people-display"]'),
            deletePersonBtn = document.querySelector('span[data-id="deletePerson"]');

      MockInitialDB.expects('deleteFromList').once()
        .withExactArgs('Darrell')
        .returns(PEOPLE_LIST.people = [{id: 2, name: 'kevin'}]);

      function deletePerson (e) {
        const name = e.target.previousElementSibling.innerHTML;
        PEOPLE_LIST.deleteFromList(name);
        let li = e.target.parentNode;
        li.remove();
      }

      deletePersonBtn.addEventListener('click', deletePerson);
      var event = document.createEvent('HTMLEvents');
      event.initEvent('click', true, false);
      deletePersonBtn.dispatchEvent(event);

      // Expect Database using sinon mock
      MockInitialDB.verify();
      expect(PEOPLE_LIST.people.length).to.equal(1);
      // Expect DOM List
      expect(peopleDisplay.children.length).to.equal(1);
      done();
    });
  });
});

