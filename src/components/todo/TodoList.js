import React from 'react';
import Card from '../UI/Card';
import classes from './TodoList.module.css';
import Delete from '@material-ui/icons/Delete';
const TodoList = (props) => {
    return <Card className={classes.body}>
        <ul>
            {props.todos.map((todo) => (
                <span className={classes.line}>
                    <li id={todo.id} key={todo.id} style={{ textDecoration: todo.checked ? "line-through" : "none" }} className={classes.item} onClick={props.onCheck.bind(null, todo.id)}>{todo.todo} </li>
                    <Delete className={classes.delete} onClick={() => props.onDelete(todo.id)} />
                </span>
            ))}
        </ul>
    </Card>
}
export default TodoList;