function addTask() {
    const input = document.getElementById('taskInput');
    const task = input.value.trim();
    if (task) {
        // Call backend API
        fetch('http://127.0.0.1:5000/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: task })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); // optional: log success
            input.value = '';
            getTasks(); // refresh task list
        })
        .catch(error => console.error('Error:', error));
    }
}

// Fetch tasks from backend
function getTasks() {
    fetch('http://127.0.0.1:5000/tasks')
    .then(response => response.json())
    .then(data => {
        const list = document.getElementById('taskList');
        list.innerHTML = '';
        data.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span style="text-decoration:${task.completed ? 'line-through' : 'none'}">${task.title}</span>
                <div>
                    <button onclick="toggleTask(${index})">✔</button>
                    <button onclick="deleteTask(${index})">✖</button>
                </div>
            `;
            list.appendChild(li);
        });
    });
}

// Toggle task
function toggleTask(index) {
    fetch(`http://127.0.0.1:5000/tasks/${index}`, { method: 'PUT' })
    .then(() => getTasks());
}

// Delete task
function deleteTask(index) {
    fetch(`http://127.0.0.1:5000/tasks/${index}`, { method: 'DELETE' })
    .then(() => getTasks());
}

// Load tasks on page load
window.onload = getTasks;