  const todoList = [];

  showTodoList();


  function showTodoList() {
  let todoHtml = '';
  for (let i = 0; i < todoList.length; i++) {
    const todoObject= todoList[i];
    const {name , date }= todoObject;
   const html = `
  <div class="todo-item">
    <div>${name}</div>
    <div>${date}</div>
    <button class="delete-btn"
      onClick="todoList.splice(${i},1); showTodoList();">
      Delete
    </button>
  </div>
`;
    todoHtml += html;
  }
  document.querySelector('.todo-list').innerHTML = todoHtml;  
  }



  function addTodo(){
    const todolist = document.querySelector('.input');
    const dateInput = document.querySelector('.date-input');
    const todo = todolist.value;
    const date = dateInput.value;
    todoList.push({ name: todo, date: date });
    showTodoList();
  }
