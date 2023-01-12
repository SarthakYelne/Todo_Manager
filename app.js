const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());

const { Todo } = require("./models")

app.get("/todos", (request, response) => {
  console.log("Todo list")
 })

app.post("/todos", async (request, response) => {
    console.log("Creating a todo", request.body)
    try{
        const todo = await Todo.addTodo({title : request.body.title, duedate : request.body.duedate, completed : false})
        return response.json(todo)
    } catch(error){
        console.log(error)
        return response.status(422).json(error)
    }
})

app.put("/todos/:id/markAsCompleted", async (request, response) => {
  console.log("We have to update a todo with ID:", request.params.id)
  const todo = await Todo.findByPK(request.params.id)

  try{
      const updatedTodo = await Todo.markAsCompleted()
      return response.json(updatedTodo)
    }catch(error){
        console.log(error)
        return response.status(422).json(error)        
    }
})

app.delete("/todos/:id", (request, response) => {
    console.log( "Delete a todo by ID: ", request.params.id)
})

module.exports = app;
