const todoForm = document.getElementById('todo-form');
const todoInput = todoForm.querySelector('input');
const todoList = document.getElementById('todo-list');

const TODOES_KEY = 'todoes';
let todoes = [];

function savingTodo() {
  localStorage.setItem(TODOES_KEY, JSON.stringify(todoes));
}

function removeTodo(event) {
  const li = event.target.parentElement;
  li.remove();
  todoes = todoes.filter((item) => item.id !== parseInt(li.id));
  savingTodo();
}

function paintTodo(newTodoObj) {
  const li = document.createElement('li');
  li.id = newTodoObj.id;
  const span = document.createElement('span');
  span.innerText = newTodoObj.text;
  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'Delete';
  deleteBtn.addEventListener('click', removeTodo);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);
}

function handleSumbit(event) {
  event.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = '';
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  todoes.push(newTodoObj);
  paintTodo(newTodoObj);
  savingTodo();
}

todoForm.addEventListener('submit', handleSumbit);

const savedToDoes = localStorage.getItem(TODOES_KEY);

if (savedToDoes !== null) {
  const parsedTodes = JSON.parse(savedToDoes);
  todoes = parsedTodes;
  parsedTodes.forEach((item) => paintTodo(item));
}
