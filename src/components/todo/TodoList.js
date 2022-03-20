import React, { useEffect } from "react";
import Card from "../UI/Card";
import classes from "./TodoList.module.css";
import Delete from "@material-ui/icons/Delete";
import axios from "axios";
const TodoList = (props) => {
  useEffect(() => {
    async function fetchData() {
      try {
         await axios.get(
          `${process.env.REACT_APP_API_LINK}/api/todo/fetchtodo`,
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
        
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
 
  return (
    <Card className={classes.body}>
      <ul>
        {props.todos.map((todo) => (
          <span key={todo._id} className={classes.line}>
            <li
              style={{ textDecoration: todo.checked ? "line-through" : "none" }}
              className={classes.item}
              onClick={() => props.onCheck(todo._id)}
            >
              {todo.value}
            </li>
            <Delete
              className={classes.delete}
              onClick={() => props.onDelete(todo._id)}
            />
          </span>
        ))}
      </ul>
    </Card>
  );
};
export default TodoList;
