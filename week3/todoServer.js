const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors=require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const addTodo = (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const id = Math.floor(Math.random() * 100000);
  const newTodo={
    id: id,
    title: title,
    description: description,
  };  
  fs.readFile("todos.json", "utf-8", (err, data) => {
    const todos = JSON.parse(data);
    todos.push(newTodo);
 
    fs.writeFile("todos.json",JSON.stringify(todos),(err)=>{
        if (err) throw err;
        
        res.status(201).json(newTodo);

    })
  });

};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,"./index.html"));
});

app.get("/todos", (req, res) => {
  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    res.json(todos);
  });
});

app.get("/todos/:id", (req, res) => {
  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    const toDoId = req.params.id;
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id == toDoId) res.json(todos[i]);
    }
    res.status(404).send("Not Found");
  });
});

app.post("/todos", addTodo);

app.put("/todos/:id", (req, res) => {
    const toDoId = req.params.id;
    const newDesc = req.body.description;
    fs.readFile("todos.json", "utf-8", (err, data) => {
      if (err) throw err;
      const todos = JSON.parse(data);
  
      for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == toDoId) {
          todos[i].description = newDesc;
          fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
            if (err) throw err;
            res.send("Updated");
          });
          return;
        }
      }
      res.status(404).send("Not Found");
    });
  });
  
  app.delete("/todos/:id", (req, res) => {
    const toDoId = req.params.id;
    fs.readFile("todos.json", "utf-8", (err, data) => {
      if (err) throw err;
      let todos = JSON.parse(data);
  
      for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == toDoId) {
          const ID = todos[i].id;
          todos.splice(i, 1);
          fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
            if (err) throw err;
            res.send(`Todo with id-${ID} was deleted`);
          });
          return;
        }
      }
      res.status(404).send("Not Found");
    });
  });
  
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
