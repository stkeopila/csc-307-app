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

function getUsers(name, job) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = userModel.find();
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  }
  return promise;
}

function findUserById(id) {
  return userModel.findById(id);
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}
function findUserByName(name) {
  return userModel.find({ name: name });
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd)
    .then(() => res.send())
    .catch((error) => res.status(400).send(error));
  // console.log(users["users_list"]);
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  findUserById(id)
    .then((result) => {
      if (result === undefined) {
        res.status(404).send("Resource not found haha.");
      } 
      else {
        res.send(result);
      }
    })
    .catch((error) => res.status(400).send(error));
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  getUsers(name)
    .then((result) => res.send({ users_list: result}))
    .catch((error) => res.status(400).send(error));
  // if (name != undefined) {
  //   let result = findUserByName(name);
  //   result = { users_list: result };
  //   res.send(result);
  // }
  // else {
  //   res.send(users);
  // }
  });

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  findUserById(id)
    .then((result) => {
      if (result === undefined) {
        res.status(404).send("Id not found haha");
      }
      else {
        res.send(result);
      }
    })
    .catch((error) => res.status(400).send(error));
});
  // if (result === undefined) {
  //   res.status(404).send("Id not found haha");
  // }
  //   res.send(result);

app.get("/users/:name/:job", (req, res) => {
  const name = req.params.name;
  const job = req.params.job;
  userModel.find({ name: name, job: job })
    .then((result) => {  
    if (result === undefined) {
      res.status(404).send("Can not find person with same name and job");
    }
    else {
      res.send(result);
    }})
    .catch((error) => res.status(404).send(error));
  }
);


app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
};