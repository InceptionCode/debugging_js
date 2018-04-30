import {expect} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';

const {JSDOM} = jsdom;

/* global describe it */
describe('demo test', ()=> {
  it('should pass', () => {
    expect(true).to.equal(true);
  });
});

describe('Demo App', ()=> {
  describe('Add A Person', ()=> {
    it('should add a list element (person)', (done)=>{
      const demo = fs.readFileSync('./src/demo.html', 'utf-8');
      const { document } = (new JSDOM(demo)).window;
      const peopleDisplay = document.querySelector('ul[data-id="people-display"]'),
            addPersonBtn = document.querySelector('button[data-id="addPerson"]'),
            input = document.querySelector('input');
      
      
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
  
        listElem.appendChild(spanName);
        listElem.appendChild(spanDelete);
        listElem.appendChild(spanEdit);
        
  
        return listElem;
      }
      function addPerson () {
        peopleDisplay.appendChild(buildElement());
        input.value = '';
      }
  
      addPersonBtn.addEventListener('click', addPerson);
      var event = document.createEvent('HTMLEvents');
      event.initEvent('click', true, false);
      addPersonBtn.dispatchEvent(event);
  
      expect(peopleDisplay.children.length).to.equal(2);
      expect(peopleDisplay.children[1].tagName).to.equal('LI');
      done();
    });
  });
  
  
  describe('Delete A Person', ()=> {
    it('Should delete a list element (person)', (done)=> {
      const demo = fs.readFileSync('./src/demo.html', 'utf-8');
      const { document } = (new JSDOM(demo)).window;
      const peopleDisplay = document.querySelector('ul[data-id="people-display"]'),
            deletePersonBtn = document.querySelector('span[data-id="deletePerson"]');
      
      function deletePerson (e) {
        let li = e.target.parentNode;
        li.remove();
      }
      
      deletePersonBtn.addEventListener('click', deletePerson);
      var event = document.createEvent('HTMLEvents');
      event.initEvent('click', true, false);
      deletePersonBtn.dispatchEvent(event);
  
      expect(peopleDisplay.children.length).to.equal(1);
      done();
    });
  });
});

