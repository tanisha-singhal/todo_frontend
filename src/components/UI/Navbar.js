import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css';
const Navbar = () => {
    return <header className={classes.header}>
        <div className={classes.title}>
        <img className={classes.icon} src="https://img.icons8.com/material-outlined/45/ffffff/checked-checkbox.png" alt=""/>
        <h1 className={classes.logo}>TODO</h1>
        </div>
        <nav>
            <ul className={classes.list}>
                {/* <li>
                    <NavLink to="/login" className={classes.listItem}>Login</NavLink>
                </li>
                <li>
                    <NavLink to="/register" className={classes.listItem}>Register</NavLink>

                </li> */}
                <li>
                    <NavLink to="/logout" className={classes.listItem}>Logout</NavLink>
                </li>

            </ul>
        </nav>
    </header>
}
export default Navbar;