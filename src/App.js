import TodoForm from "./components/todo/Todoform";
import TodoList from "./components/todo/TodoList";
import "./App.css";
import React, { useState,useContext} from "react";
import { Route,Switch } from "react-router";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Navbar from "./components/UI/Navbar";
import Home from "./components/UI/Home";
import axios from "axios";
import {AuthContext} from './components/Context/AuthProvider';
function App() {
  //const host="https://localhost:3000";
  // const dummy_todos = [
  //   {
  //     id: 't1',
  //     checked: false,
  //     todo: 'eat'
  //   },
  //   {
  //     id: 't2',
  //     checked: false,
  //     todo: 'sleep'
  //   },
  //   {
  //     id: 't3',
  //     checked: false,
  //     todo: 'code'
  //   },
  //   {
  //     id: 't4',
  //     checked: false,
  //     todo: 'repeat'
  //   }
  // ]

  const [todos, setTodos] = useState([]);
  const {login}=useContext(AuthContext);
    if(login){
     async  function fetchData(){
        try {
          const data = await axios.get(`${process.env.REACT_APP_API_LINK}/api/todo/fetchtodo`);
        console.log(data);
        setTodos(data);
        } catch (error) {
          console.log(error);
        }
      }
        fetchData();
      
    }
  // {login && 
  //     fetchData= ()=> {
  //       const data = await axios.get(`${process.env.REACT_APP_API_LINK}/api/todo/fetchtodo`);
  //       console.log(data);
  //       setTodos(data);
  //     }
  //     fetchData();
  //  }
  

  const addTodoHandler = async (todo) => {
    await axios.post(`${process.env.REACT_APP_API_LINK}/api/todo/addtodo`, {
      todo,
    });
    setTodos((prevTodo) => {
      return [todo, ...prevTodo];
    });
  }

  const checkHandler = (id) => {
    let copy = [...todos].map((todo) => {
      todo.checked = todo.id === id ? !todo.checked : todo.checked;
      return todo;
    });
    axios.put(`${process.env.REACT_APP_API_LINK}/api/todo/updatetodo`, {
        copy,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setTodos(copy);
  }

  const deleteHandler = (id) => {
    axios.delete(`${process.env.REACT_APP_API_LINK}/api/todo/deletetodo/${id}`)  
      .then(res => {  
        console.log(res);  
        console.log(res.data);  
      })
    let copy = [...todos].filter((todo) => {
      return todo.id !== id;
    });
    setTodos(copy);
  }

  // const handleLogin=()=>{
  //   setLogin(true);
  // }

  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        {login && <Route path="/todo">
          <TodoForm onAddTodo={addTodoHandler} todos={todos} />
          <TodoList
            todos={todos}
            onCheck={checkHandler}
            onDelete={deleteHandler}
          />
        </Route>}
        {!login && <Route path="/" exact>
        <Home />
      </Route>}
        <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
          <Login/>
        </Route>
      <Route path="/logout">
        <Home />
      </Route>
      
      </Switch>
    </React.Fragment>
  );
}

export default App;
