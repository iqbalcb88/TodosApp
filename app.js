const input = document.getElementById('todo-input');
const todoLists = document.getElementById('todo-items');
const add = document.getElementById('add-todo');
const listItems = [];

function getInput() {
  if (input.value.trim() !== '') {
    return input.value;
  }
}

function clearInput() {
  input.value = '';
}

function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem('todoArr'));
}

function setToLocalStorage(localTodo) {
  const inputTodo = getInput();
  clearInput();
  if (localTodo !== null) {
    localStorage.setItem('todoArr', JSON.stringify([...localTodo, inputTodo]));
    // console.log('set item not null');
  } else {
    localStorage.setItem('todoArr', JSON.stringify([inputTodo]));
    // console.log('set item null');
  }
}

function removeItemFromLocalStorage(index) {
  // console.log(index);
  const localTodo = getFromLocalStorage();
  console.log(localTodo, index);
  localTodo.splice(index, 1);
  localStorage.removeItem('todoArr');
  const newArr = localTodo.filter((e) => e != '').filter((e) => e != null);
  // console.log(newArr);
  newArr.length > 0 && setToLocalStorage(newArr);
}

function createTodoList() {
  const localTodo = getFromLocalStorage();
  if (input.value !== '') {
    setToLocalStorage(localTodo);
  }

  const allTodo = getFromLocalStorage();
  todoLists.innerHTML = '';

  if (allTodo === null) return;

  allTodo
    .filter((e, i) => {
      console.log(e, i);
      if (e === null) {
        removeItemFromLocalStorage(i);
      }
      return e;
    })
    .forEach((todo, i) => {
      if (todo.trim() === '') {
        return;
      }
      const li = document.createElement('li');
      li.classList.add('todo-item');
      li.setAttribute('data', i);
      li.innerHTML = `<div class="draggable" id="draggable" draggable='true'>
    <p>${todo}</p>
    <button data-index=${i} id='remove' class='remove'>
    X
    </button>
    </div>`;
      listItems.push(li);
      const removeBtn = li.querySelector('button');
      removeBtn.addEventListener('click', removeTodo);
      todoLists.append(li);
    });

  dragEvent();
}

function dragEvent() {
  const draggable = document.querySelectorAll('.draggable');
  const todoListItems = document.querySelectorAll('.todo-items li');
  // console.log(draggable, todoListItems);

  draggable.forEach((dragEl) => {
    dragEl.addEventListener('dragstart', dragStart);
  });

  todoListItems.forEach((liEl) => {
    liEl.addEventListener('dragover', dragOver);
    liEl.addEventListener('dragenter', dragEnter);
    liEl.addEventListener('drop', drop);
  });
}

let startIndex;
function dragStart() {
  startIndex = +this.parentElement.getAttribute('data');
  console.log(startIndex);
}

function dragOver(e) {
  console.log('over');
  e.preventDefault();
}
function dragEnter(e) {
  e.preventDefault();
  console.log('enter');
}

function drop(e) {
  console.log('drop');
}

function removeTodo() {
  let index = this.getAttribute('data-index');

  this.parentElement.remove();
  removeItemFromLocalStorage(index);
  createTodoList();
}

add.addEventListener('click', createTodoList);

// draggable list

createTodoList();
