const { Sequelize, Op } = require('sequelize');
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

const getAllListData = async (filterText) => {
  console.log('filterText: ', filterText);
  console.log('234234234', typeof filterText)
  // read data from be
  const users = await db.User.findAll();
  const todos = filterText && filterText.length ? await db.Todo.findAll({
    where: {
      text: {
        [Op.like]: '%' + filterText + '%'
      }
    }
  }) : await db.Todo.findAll();
  
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
  let filterText = req.query.filterText;
  const allData = await getAllListData(filterText && filterText.length ? filterText : null);
  res.json({ data: allData });
})

app.put("/toDoItem", async (req, res) => { // req contains userId, itemId, variant, order
  const { variant, userId, itemId, order } = req.body;
  // decrement todos in the previous list, which were ordered higher than the todo that was moved
  let previousTodos;
  await db.Todo.findAll({
    where: {
      userId
    }
  }).then((data) => {
    previousTodos = data.reduce((todoIds, todo) => {
      console.log('todo: ', todo);
      if (todo.dataValues.order > order) {
        return [...todoIds, todo.id];
      }
      return todoIds;
    }, []);
  });
  previousTodos.forEach(async (todoId) => {
    await db.Todo.decrement('order', {by: 1, where: {
      id: todoId
    }});
  })
  
  // increment todos in the subsequent list, which were ordered higher or equal to the todo that was added
  let subsequentTodos;
  let highestOrderTodoNewList = -1;
  await db.Todo.findAll({
    where: {
      userId: variant === 'left' ? userId - 1 : userId + 1
    }
  }).then((data) => {
    subsequentTodos = data.reduce((todoIds, todo) => {
      if (todo.dataValues.order > highestOrderTodoNewList) {
        highestOrderTodoNewList = todo.dataValues.order;
      }
      if (todo.dataValues.order >= order) {
        return [...todoIds, todo.dataValues.id];
      }
      return todoIds;
    }, []);
  });
  subsequentTodos.forEach(async (todoId) => {
    await db.Todo.increment('order', {by: 1, where: {
      id: todoId
    }});
  })
  // update the todo that moved, to belong to the new user, and have the correct order
  const newOrder = order > highestOrderTodoNewList ? highestOrderTodoNewList + 1 : order;
  await db.Todo.update({ userId: variant === 'left' ? userId - 1 : userId + 1 }, {
    where: {
      id: itemId
    }
  });
  await db.Todo.update({ order: newOrder }, {
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
