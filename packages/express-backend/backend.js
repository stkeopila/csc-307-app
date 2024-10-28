// backend.js
import express from "express";
import cors from "cors";
import userServices from "./user-services.js";
import mongoose from "mongoose";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// const findUserById = (id) => 
//   users["users_list"].find((user) => user.id === id);

// const findUserByNameAndJob = (name, job) => {
//   return users["users_list"].filter((user) => user.job === job && user.name == name);
// };

// const deleteUserById = (id) => {
//   const a = users["users_list"].filter((user) => user.id !== id);
//   users["users_list"] = a
//   return a
// }

// const findUserByName = (name) => {
//   return users["users_list"].filter(
//     (user) => user["name"] === name
//   );
// };

// const addUser = (user) => {
//   users["users_list"].push(user);
//   return user;
// }


//POST // creat and insert a new user
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userServices.addUser(userToAdd)
  .then((result) => {
    res.status(201).send(result);
  })
  .catch((error) => {
    res.status(400).send(error.message);
  });
});

//GET ID
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  userServices.findUserById(id)
  .then((result) => {
    res.send(result);})
  .catch((error) => {
    console.error(error);
    res.status(404).send("Resource not found haha.");
  });
});

//GET NAME AND JOB 
app.get("/users/:name/:id", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  userServices.findUserByName(name, job)
  .then((result) => {
    res.send({ users_list: result });
  })
  .catch((error) => {
    console.error(error);
    res.status(404).send("Resource not found");
  });
});

//DELETE ID
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  console.log("id", id);
  userServices.findByIdAndDelete(id)
  .then((result) => {
    res.status(204).send(result);
  })
  .catch((error) => {
    console.error(error);
    res.status(404).send("Resource not found");
  });
});


//GET NAME OR JOB
app.get("/users", (req, res) => {
  const name = req.params.name;
  const job = req.params.job;
  userServices.getUsers(name, job)
  .then((result) => {
    res.send({ users_list: result });
  })
  .catch((error) => {
    console.error(error);
    res.status(404).send("Can not find person with name or job");
  });
});


app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});