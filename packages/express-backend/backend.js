// backend.js
import express from "express";

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "peanut13213",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "idfasodbf1234",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "asdasd",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

app.use(express.json());

const findUserById = (id) => 
  users["users_list"].find((user) => user.id === id);

const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter((user) => user.job === job && user.name == name);
};

const deleteUserById = (id) =>
  users["users_list"].filter((user) => user.id !== id); 

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
}

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);

  console.log(users["users_list"]);
  res.send();
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found haha.");
  } 
  else {
    res.send(result);
  }
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  }
  else {
    res.send(users);
  }
  });

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  let result = deleteUserById(id);
  if (result === undefined) {
    res.status(404).send("Id not found haha");
  }
    res.send(result);
});

app.get("/users/:name/:job", (req, res) => {
  const name = req.params.name;
  const job = req.params.job;
  let result = findUserByNameAndJob(name, job);
  if (result === undefined) {
    res.status(404).send("Can not find person with same name and job");
  }
  else {
    res.send(result);
  }
});


app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});