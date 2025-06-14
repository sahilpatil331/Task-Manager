
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//-------------------------------------
app.get('/tasks', (req, res) => {                           // Get all tasks
  db.query('SELECT * FROM tasks', (err, result) => {
    if (err) return res.send(err);
    res.send(result);
  });
});

//----------------------------------------------
app.get('/tasks/:id', (req, res) => {                                                   // Get one task
  db.query('SELECT * FROM tasks WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.send(err);
    res.send(result[0]);
  });
});

//-----------------------------
app.post('/tasks', (req, res) => {                                                          // Create task
  const { title, description, status } = req.body;
  if (!title || !status) return res.status(400).send('Title and status required');
  if (!['Pending', 'In Progress', 'Completed'].includes(status)) return res.status(400).send('Invalid status');

  db.query('INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)', [title, description, status], (err, result) => {
    if (err) return res.send(err);
    res.send({ id: result.insertId });
  });
});

//--------------------------
app.put('/tasks/:id', (req, res) => {                                                                                  // Update task
  const { title, description, status } = req.body;
  db.query('UPDATE tasks SET title=?, description=?, status=? WHERE id=?', [title, description, status, req.params.id], (err) => {
    if (err) return res.send(err);
    res.send({ msg: 'Updated' });
  });
});

//------------------------
app.delete('/tasks/:id', (req, res) => {                                         // Delete task
  db.query('DELETE FROM tasks WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.send(err);
    res.send({ msg: 'Deleted' });
  });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
