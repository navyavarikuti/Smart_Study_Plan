const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add('task');
        if (task.completed) li.classList.add('completed');

        li.innerHTML = `
            <div>
                <span class="task-name">${task.name}</span><br>
                <span class="task-date">📅 ${task.date}</span>
            </div>
            <div>
                <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Done'}</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function addTask(e) {
    e.preventDefault();
    const taskName = taskInput.value.trim();
    const taskDate = dateInput.value;
    if (!taskName || !taskDate) return;

    tasks.push({ name: taskName, date: taskDate, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    dateInput.value = '';
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

taskForm.addEventListener('submit', addTask);

// Initial render
renderTasks();
