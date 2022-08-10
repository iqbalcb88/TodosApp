const input = document.getElementById('todo-input');
const todoLists = document.getElementById('todo-items');
const add = document.getElementById('add-todo');

function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem('todoArr'));
}

function getInput() {
  return input.value;
}

function clearInput() {
  input.value = '';
}

function setToLocalStorage() {
  const localTodo = getFromLocalStorage();
  const inputTodo = getInput();
  clearInput();
  if (localTodo !== null) {
    localStorage.setItem('todoArr', JSON.stringify([...localTodo, inputTodo]));
    console.log('set item not null');
  } else {
    localStorage.setItem('todoArr', JSON.stringify([inputTodo]));
    console.log('set item null');
  }
}

function createTodoList() {
  if (input.value !== '') {
    setToLocalStorage();
  }
  const allTodo = getFromLocalStorage();
  todoLists.innerHTML = '';
  allTodo.forEach((todo, i) => {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = `<div class="draggable" id="draggable">
    <p>${todo}</p>
    <i id='delete-item' class="fas fa-delete-left"></i>
    </div>`;

    todoLists.append(li);
  });
}

add.addEventListener('click', createTodoList);

// draggable list

createTodoList();
