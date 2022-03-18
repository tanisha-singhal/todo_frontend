import React,{useState} from "react";
import classes from './TodoForm.module.css';
const TodoForm=(props)=>{
    const [input,setInput]=useState('');
    const inputChangeHandler=(event)=>{
       
          setInput(event.target.value);
    }
    const submitHandler=(event)=>{
       event.preventDefault();
       const enteredTodo={
           id:Math.random().toString(),
           checked:false,
           todo:input
       };
       props.onAddTodo(enteredTodo);
       setInput('');
    }
    
    
return <React.Fragment>
    <h1 className={classes.heading}>TODO <span>LIST</span></h1>
    <form onSubmit={submitHandler} className={classes.form}>
        <input className={classes.input} id="todo" type="text" value={input} onChange={inputChangeHandler} placeholder="ADD TODO..."/>
        <button className={classes.button} type="submit">ADD</button>
    </form>
    
    </React.Fragment>
}
export default TodoForm;