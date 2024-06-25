// backend/routes/tasks.js
const express = require('express');
const Task = require('../models/task');
const router = express.Router();

router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

router.post('/', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.send(task);
});

router.put('/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(task);
});

router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.send({ message: 'Task deleted' });
});

module.exports = router;
