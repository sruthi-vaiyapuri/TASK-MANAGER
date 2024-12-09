const API_URL = 'http://localhost:5000/api/tasks';

async function fetchTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    const taskContainer = document.getElementById('tasks');
    taskContainer.innerHTML = tasks.map(task => `
        <div>
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Assigned To: ${task.assignedTo}</p>
            <p>Deadline: ${new Date(task.deadline).toDateString()}</p>
            <p>Status: ${task.completed ? 'Completed' : 'Pending'}</p>
            <button onclick="deleteTask('${task._id}')">Delete</button>
        </div>
    `).join('');
}

async function createTask() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const assignedTo = document.getElementById('assignedTo').value;
    const deadline = document.getElementById('deadline').value;

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, assignedTo, deadline }),
    });

    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTasks();
}

fetchTasks();
