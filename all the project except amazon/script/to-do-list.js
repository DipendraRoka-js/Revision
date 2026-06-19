const todoList = [];

showTodoList();

function showTodoList() {
  let todoHtml = '';

  todoList.forEach((todoObject) => {
    const { name, date } = todoObject;

    const html = `
      <div class="todo-item">
        <div>${name}</div>
        <div>${date}</div>
        <button class="delete-btn del-button">
          Delete
        </button>
      </div>
    `;

    todoHtml += html;
  });

  document.querySelector('.todo-list').innerHTML = todoHtml;

  document.querySelectorAll('.del-button').forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      todoList.splice(index, 1);
      showTodoList();
    });
  });
}

function addTodo() {
  const todoInput = document.querySelector('.input');
  const dateInput = document.querySelector('.date-input');

  const todo = todoInput.value;
  const date = dateInput.value;

  todoList.push({
    name: todo,
    date: date
  });

  todoInput.value = '';
  dateInput.value = '';
  showTodoList();
}

document.querySelector('.add-to-list').addEventListener('click', () => {
  addTodo();
});