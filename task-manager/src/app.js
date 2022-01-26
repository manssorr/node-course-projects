const express = require('express');
const usersRouter = require('./routers/user.js');
const tasksRouter = require('./routers/task.js');
require('./db/mongoose.js');

const app = express();

app.use(express.json());
app.use(usersRouter)
app.use(tasksRouter)

module.exports = app