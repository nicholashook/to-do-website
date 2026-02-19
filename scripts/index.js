let tasks = JSON.parse(localStorage.getItem('taskData')) || {taskList: [], size: 0};
displayTasks();

document.body.addEventListener('keydown', (event) => {
  const inputBar = document.body.querySelector('.input-bar');
  if (event.key === 'Enter') {
    addTask();
  } else if (event.key == 'Escape') {
    document.activeElement.blur();
    inputBar.value = '';
  } else if (document.activeElement !== inputBar) {
    inputBar.focus();
  } 
});

document.body.querySelector('.clear-all-button')
  .addEventListener('click', () => {
    tasks.taskList = [];
    tasks.size = 0;
    localStorage.setItem('taskData', JSON.stringify(tasks));
    displayTasks();
  })


document.body.querySelector('.input-button')
  .addEventListener('click', () => {
    addTask();
  });

function addTask() {
  const newTask = document.querySelector('.input-bar').value;
  if (newTask) {
    tasks.taskList.push(newTask);
    tasks.size++;
    document.querySelector('.input-bar').value = '';
    localStorage.setItem('taskData', JSON.stringify(tasks));
    displayTasks();
  }
}

function displayTasks() {
  let taskString = `<div class='task-column'>`;
  tasks.taskList.forEach( (taskItem, index) => {
    if (index % 7 === 0 && index !== 0) {
      taskString += `<div class='task-column'>`;
    }
    taskString += 
      `<div class='task-row'>
        <button class='delete-button'>
          ${taskItem}
        </button>
      </div>`;
    if ((index + 1) % 7 === 0 || index + 1 === tasks.taskList.length) {
      taskString += `</div>`;
      console.log(index)
    }
  });
  document.querySelector('.task-section').innerHTML = taskString;
  document.querySelectorAll('.delete-button')
    .forEach((element, index) => {
      element.addEventListener('click', () => {
        deleteTask(index);
      });
    });
}

function deleteTask(i) {
  tasks.taskList.splice(i, 1);
  tasks.size--;
  localStorage.setItem('taskData', JSON.stringify(tasks));
  displayTasks();
}