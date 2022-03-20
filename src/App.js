import TodoForm from "./components/todo/Todoform";
import TodoList from "./components/todo/TodoList";
import "./App.css";
import React, { useState, useContext, useEffect } from "react";
import { Route, Switch } from "react-router";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Navbar from "./components/UI/Navbar";
import Home from "./components/UI/Home";
import axios from "axios";
import { AuthContext } from "./components/Context/AuthProvider";
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

  const [todos, setTodos] = useState([{}]);
  const { login } = useContext(AuthContext);
  useEffect(() => {
    if (login) {
      async function fetchData() {
        try {
          const data = await axios.get(
            `${process.env.REACT_APP_API_LINK}/api/todo/fetchtodo`,
            {
              headers: {
                "auth-token": localStorage.getItem("auth-token"),
              },
            }
          );
          console.log(data.data);
          setTodos(data.data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }
  }, [login]);

  const addTodoHandler = async (todo) => {
    let { data } = await axios.post(
      `${process.env.REACT_APP_API_LINK}/api/todo/addtodo`,
      { value: todo },
      {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      }
    );
    console.log(data);
    setTodos((prevTodo) => {
      return [data, ...prevTodo];
    });
   
  };

  const checkHandler = async (_id) => {
    console.log(_id);
    let x = todos.find((todo) => todo._id === _id);
    x.checked = !x.checked;
    let newTodos = todos.map((todo) => {
      if (todo._id === _id) {
        return {
          ...todo,
          checked: !todo.checked,
        };
      }
      return todo;
    });

    console.log(todos, newTodos);
    

    axios
      .put(
        `${process.env.REACT_APP_API_LINK}/api/todo/updatetodo/${_id}`,
        { updatedTodo: x },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data.element);
        setTodos(newTodos);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteHandler = (_id) => {
    axios
      .delete(`${process.env.REACT_APP_API_LINK}/api/todo/deletetodo/${_id}`, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
    let copy = [...todos].filter((todo) => {
      return todo._id !== _id;
    });
    setTodos(copy);
  };

  // const handleLogin=()=>{
  //   setLogin(true);
  // }

  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        {login && (
          <Route path="/todo">
            <TodoForm onAddTodo={addTodoHandler} todos={todos} />

            <TodoList
              todos={todos}
              onCheck={checkHandler}
              onDelete={deleteHandler}
            />
          </Route>
        )}
        {!login && (
          <Route path="/" exact>
            <Home />
          </Route>
        )}
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/logout">
          <Home />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
