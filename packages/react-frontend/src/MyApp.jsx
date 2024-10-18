// src/MyApp.jsx
import React, {useState, useEffect} from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(id) {
    const promise = fetch("http://localhost:8000/users/" + id, {
      method: 'DELETE'
    })
    return promise
  }

  function removeUser(id) {
    removeOneCharacter(id)
    setCharacters(prevCharacters => prevCharacters.filter(prev => prev._id !== id))
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function updateList(person) { 
    postUser(person)
      .then(res => {return res.json()})
      .then(createdUser =>  {setCharacters([...characters, createdUser])})
      .catch((error) => {
        console.log(error);
      })
  }
  
  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    })
    return promise
  }

  useEffect(() => {
    fetchUsers () 
    .then((res) => res.json())
    .then((json) => setCharacters(json["users_list"]))
    .catch((error) => { console.log(error); });
  }, [] );

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeUser}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;