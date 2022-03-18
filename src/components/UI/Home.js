
import React from 'react'
import { NavLink } from 'react-router-dom';
import classes from './Home.module.css';
function Home() {
  return (
    <div>
        <h1 className={classes.heading}>Welcome to TodoList</h1>
        <div className={classes.btns}>
                <button className={classes.btn}>
                    <NavLink to="/login" className={classes.link}>Login</NavLink>
                </button>
                <button className={classes.btn}>
                    <NavLink to="/register" className={classes.link}>Register</NavLink>

                </button>
                </div>
    </div>
    
  )
}

export default Home