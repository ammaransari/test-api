const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let tasks = [
  { id: 1, title: 'Learn CI/CD', completed: false },
  { id: 2, title: 'Build Node.js API', completed: true }
];

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Get a single task
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send('Task not found');
  res.json(task);
});

// Create a task
app.post('/tasks', (req, res) => {
  const task = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: req.body.completed || false
  };
  tasks.push(task);
  res.status(201).json(task);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send('Task not found');

  task.title = req.body.title || task.title;
  task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;

  res.json(task);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).send('Task not found');

  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
