const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());

const { Todo } = require("./models")

// Set EJS as view engine
app.set ("view engine", "ejs");

app.get("/", (request, response) => {
   response.render('index');
});

// eslint-disable-next-line no-unused-vars
app.get("/todos", (request, response) => {
   console.log ("Todo list", request.body);
});

  
  app.get("/todos", async function (_request, response) {
    console.log("Processing list of all Todos ...");
    try {
      const todos = await Todo.getAllTodos();
      return response.json(todos);
    } catch (error) {
      console.log(error);
      return response.status(422).json(error);
    }
  });
  
  app.get("/todos/:id", async function (request, response) {
    try {
      const todo = await Todo.findByPk(request.params.id);
      return response.json(todo);
    } catch (error) {
      console.log(error);
      return response.status(422).json(error);
    }
  });

 app.post("/todos", async function (request, response) {
    try {
      const todo = await Todo.addTodo(request.body);
      return response.json(todo);
    } catch (error) {
      console.log(error);
      return response.status(422).json(error);
    }
  });

app.put("/todos/:id/markAsCompleted", async function (request, response) {
    const todo = await Todo.findByPk(request.params.id);
    try {
      const updatedTodo = await todo.markAsCompleted();
      return response.json(updatedTodo);
    } catch (error) {
      console.log(error);
      return response.status(422).json(error);
    }
  });

app.delete("/todos/:id", async function (request, response) {
    try {
      const todo = await Todo.findByPk(request.params.id);
      if (todo) {
        await todo.delete();
        return response.json(true);
      } else {
        return response.json(false);
      }
    } catch (error) {
      console.log(error);
      return response.status(422).json(false);
    }
  });

module.exports = app;
