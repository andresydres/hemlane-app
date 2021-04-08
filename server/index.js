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

const getAllListData = async () => {
  // read data from be
  const users = await db.User.findAll();
  const todos = await db.Todo.findAll();
  const allData = {};
  users.forEach((user) => {
    const id = user.dataValues.id;
    allData[id] = {...user.dataValues, todos: []};
  });
  todos.forEach((todo) => {
    const userId = todo.dataValues.userId;
    allData[userId].todos.push(todo.dataValues);
  });
  return allData;
};

app.get("/toDoData", async (req, res) => {
  // read data from be
  const allData = await getAllListData();
  res.json({ data: allData });
})

app.put("/toDoItem", async (req, res) => { // req contains userId, itemId, variant, order, subsequentTodos
  const { variant, userId, itemId, subsequentTodos } = req.body;
  // TODO: handle moving items behind new item, back one
  // (the following code doesnt work as intended)
  subsequentTodos.forEach((todoId) => {
    db.Todo.increment('order', {by: 1,
      where: {
        id: todoId,
      }
    });
  })
  
  await db.Todo.update({ userId: variant === 'left' ? userId - 1 : userId + 1 }, {
    where: {
      id: itemId
    }
  });
  const allData = await getAllListData();
  res.json({ data: allData });
})

app.post("/toDoItem", async (req, res) => { // req contains userId, text, order
  const { userId, text, order } = req.body;
  console.log('req.body: ', req.body);
  console.log('userId, todoText, order: ', userId, text, order);
  await db.Todo.create({userId, text, order, createdAt: Date.now(), updatedAt: Date.now()});
  const allData = await getAllListData();
  res.json({ data: allData });
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
