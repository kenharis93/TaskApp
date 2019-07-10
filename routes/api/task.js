const express = require('express');
const config = require('config');
const Task = require('../../models/Task');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

const router = express.Router();

// @route    POST api/tasks
// @desc     Create a task
// @access   Public
router.post('/', auth, async (req, res) => {
  try {
    const newTask = new Task({
      user: req.user.id,
      title: req.body.title,
      description: req.body.description,
      status: req.body.status
    });
    const Task2 = await newTask.save();
    res.send(Task2);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route Get api/tasks
// @desc  Get all tasks
// @access Public
router.get('/all', async (req, res) => {
  try {
    const Tasks2 = await Task.find();
    res.send(Tasks2);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route Get api/tasks
// @desc  Get all tasks
// @access Public
router.get('/', auth, async (req, res) => {
  try {
    const Tasks2 = await Task.find({ user: req.user.id });
    res.send(Tasks2);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route Get api/tasks/:id
// @desc  Get task by id
// @access Public
router.get('/:id', auth, async (req, res) => {
  try {
    const Tasks2 = await Task.findOne({
      user: req.user.id,
      _id: req.params.id
    });
    if (!Tasks2) {
      return res.status(404).send('No task found');
    }
    res.send(Tasks2);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route    PUT api/tasks
// @desc     Update a tasks
// @access   Private
router.put('/', auth, async (req, res) => {
  try {
    let Tasks2 = await Task.findOne({
      user: req.user.id,
      _id: req.body.id
    });

    if (!Tasks2) {
      return res.status(404).send('Task not found');
    }

    // Update
    const { id, title, description, status } = req.body;
    Tasks2 = await Task.findOneAndUpdate(
      { _id: id },
      { description: description, title: title, status: status }
    );

    // Tasks2.description = req.body.description;
    // Tasks2.title = req.body.title;
    // Tasks2.status = req.body.status;
    // await Tasks2.save();
    res.send(Tasks2);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route    DELETE api/tasks/:id
// @desc     Delete a task
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove task

    //await Task.findByIdAndRemove({ _id: req.body.id });
    await Task.findOneAndRemove({ user: req.user.id, _id: req.body.id });

    res.json({ msg: 'Task deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
