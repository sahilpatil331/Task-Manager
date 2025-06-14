function loadTasks() {
    fetch('/tasks')
      .then(res => res.json())
      .then(data => {
        const tbody = document.getElementById('taskList');
        tbody.innerHTML = '';
        data.forEach(t => {
          tbody.innerHTML += `
            <tr>
              <td>${t.id}</td>
              <td>${t.title}</td>
              <td>${t.description}</td>
              <td>${t.status}</td>
              <td>
                <button onclick="deleteTask(${t.id})">Delete</button>
              </td>
            </tr>
          `;
        });
      });
  }
  
  function addTask() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('desc').value;
    const status = document.getElementById('status').value;
  
    fetch('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, status })
    }).then(() => {
      loadTasks();
      document.getElementById('title').value = '';
      document.getElementById('desc').value = '';
    });
  }
  
  function deleteTask(id) {
    fetch('/tasks/' + id, { method: 'DELETE' })
      .then(loadTasks);
  }
  function getTaskById() {
    const id = document.getElementById('getId').value;
    fetch(`/tasks/${id}`)
      .then(res => res.json())
      .then(task => {
        document.getElementById('taskDetails').innerHTML = task
          ? `ID: ${task.id}<br>Title: ${task.title}<br>Description: ${task.description}<br>Status: ${task.status}`
          : 'Task not found';
      });
  }
  
  function updateTask() {
    const id = document.getElementById('updateId').value;
    const title = document.getElementById('updateTitle').value;
    const description = document.getElementById('updateDesc').value;
    const status = document.getElementById('updateStatus').value;
  
    fetch(`/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, status })
    }).then(() => {
      alert('Task Updated');
      loadTasks();
    });
  }
  
  loadTasks();
  