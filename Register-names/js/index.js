'use strict'

let globalNames = ['Olívia', 'Amanda', 'Iasmim', 'Sandra', 'Fernando'];
let inputName = null;
let currentIndex = null;
let isEditing = false;

window.addEventListener('load', () => {
  inputName = document.querySelector('#inputName');

  preventFormSubmit();
  activateInput();
  render();
});

const preventFormSubmit = () => {
  const handleFormSubmit = e => {
    e.preventDefault();
  }
  let form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

const activateInput = () => {
  const insertName = newName => globalNames = [...globalNames, newName];
  const updateName = newName => globalNames[currentIndex] = newName;
  const handleTyping = e => {
    let hasText = !!event.target.value && event.target.value.trim() !== '';

    if (!hasText) clearInput();

    if (event.key === 'Enter') {
      isEditing ? updateName(event.target.value) : insertName(event.target.value);
      render();
      isEditing = false;
      clearInput();
    }
  }
  inputName.addEventListener('keyup', handleTyping);
  inputName.focus();
}

const render = () => {
  const createDeleteButton = index => {
    const deleteName = () => {
      globalNames = globalNames.filter((_, i) => i !== index)
      render();
    }
    let button = document.createElement('button');
    button.classList.add('deleteButton');
    button.textContent = 'x';
    button.addEventListener('click', deleteName);
    return button;
  }
  const createSpan = (name, i) => {
    const editItem = () => {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }
    let span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;
    span.addEventListener('click', editItem);

    return span;
  }
  let divNames = document.querySelector('#names');
  divNames.innerHTML = '';

  let ul = document.createElement('ul');

  globalNames.map((currentName, i) => {
    let li = document.createElement('li');
    let button = createDeleteButton(i);
    let span = createSpan(currentName, i);
    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  })

  divNames.appendChild(ul);
  clearInput();
}

const clearInput = () => {
  inputName.value = '';
  inputName.focus();
}

