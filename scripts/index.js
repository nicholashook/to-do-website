let tasks = JSON.parse(localStorage.getItem('taskData')) || {taskList: []};
displayTasks();

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
})

document.body.querySelector('.input-button')
  .addEventListener('click', () => {
    addTask();
  })

function addTask() {
  const newTask = document.querySelector('.input-bar').value;
  if (newTask) {
    tasks.taskList.push(newTask);
    document.querySelector('.input-bar').value = '';
    localStorage.setItem('taskData', JSON.stringify(tasks));
    displayTasks();
  }
}

function displayTasks() {
  let taskString = '';
  for (let i = 0; i < tasks.taskList.length; i++) {
    taskString += 
      `<div class='task-row'>
        <button class='delete-button'>
          ${tasks.taskList[i]}
        </button>
      </div>`;
  }
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
  localStorage.setItem('taskData', JSON.stringify(tasks));
  displayTasks();
}