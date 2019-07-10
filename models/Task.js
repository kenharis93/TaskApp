const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  status: {
    type: Boolean
  }
});

module.exports = Task = mongoose.model('task', TaskSchema);
