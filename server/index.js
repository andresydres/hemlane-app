const { Sequelize } = require('sequelize');
// const sequelize = new Sequelize('postgres://tcrazoopokwzaw:5b4a49edab226dd33018dffd9fd5ba9c849e4aaa6f0a070cf4617cf6de716cce@ec2-54-211-176-156.compute-1.amazonaws.com:5432/d3jo2vrr5v1tqm')
const sequelize = new Sequelize('hemlane_db', 'dresother', '', {
  host: 'localhost',
  dialect: 'postgres'
});

const express = require("express");
const db = require('./models/index.js');

// support parsing of application/json type post data

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json()); 

app.get("/hello", async (req, res) => res.json({ data: 'hi' }))

app.get("/toDoData", async (req, res) => {
  // read data from be
  const users = await db.User.findAll();
  console.log('users', users);
  const todos = await db.Todo.findAll();
  res.json({ data: {users, todos} });
})

app.put("/toDoItem", (req, res) => { // req contains userName, todoText, itemId, order
  // read data from be
  // res.json({ data: data });
})

app.post("/toDoItem", async (req, res) => { // req contains userId, todoText, order
  const { userId, todoText, order } = req.body;
  const newItem = await db.Todos.create({userId, todoText, order});
  res.json({data: newItem})
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
