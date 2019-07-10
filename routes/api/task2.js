const express = require('express');
const uuidv4 = require('uuid/v4');

const router = express.Router();

let tasklist = [
  { id: 1, title: 'Task 1', description: ' Task 1 Description', status: false },
  { id: 2, title: 'Task 2', description: ' Task 2 Description', status: false },
  { id: 3, title: 'Task 3', description: ' Task 3 Description', status: false },
  { id: 4, title: 'Task 4', description: ' Task 4 Description', status: false }
];

// @route Get api/tasks
// @desc  Get all tasks
// @access Public

router.get('/', (req, res) => {
  try {
    res.json(tasklist);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('server error');
  }
});

// @route Get api/tasks/:id
// @desc  Get task by id
// @access Public

router.get('/:id', (req, res) => {
  try {
    const task = tasklist.find(tk => tk.id == req.params.id);
    if (!task) {
      return res.status(404).send(' task not found');
    }
    res.json(task);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('server error');
  }
});

// @route    POST api/tasks
// @desc     Create a task
// @access   Public
router.post('/', (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const task = {
      id: uuidv4(),
      title: title,
      description: description,
      status: false
    };

    tasklist.push(task);
    res.json(tasklist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/tasks/:id
// @desc     Delete a task
// @access   Private
router.delete('/:id', (req, res) => {
  try {
    const post = tasklist.find(obj => obj.id == req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    tasklist = tasklist.filter(function(obj) {
      return obj.id !== 1;
    });
    res.json(tasklist);
    // res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    PUT api/tasks
// @desc     Update a tasks
// @access   Private
router.put('/', (req, res) => {
  try {
    const title = req.body.title;
    const done = req.body.done;
    const id = req.body.id;
    tasklist = tasklist.filter(function(obj) {
      if (obj.id == id) {
        obj.title = title;
        obj.done = done;
      }
      //return obj;
    });

    res.json(tasklist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
