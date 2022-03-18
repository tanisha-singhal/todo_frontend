import axios from 'axios';
import React ,{useState,useContext} from 'react';
import classes from './Login.module.css';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import { AuthContext } from '../Context/AuthProvider';
const Login=(props)=>{
    const history = useHistory();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const {handleLoginState}=useContext(AuthContext);
    // const [login,setLogin]=useState(false);
    const loginHandler=async (e)=>{
        e.preventDefault();
        
        await axios.post(`${process.env.REACT_APP_API_LINK}/api/users/login`,{
             email,
             password
        })
        handleLoginState();
        history.push("/todo");
    }
    return <section className={classes.login}>
        {/* <h1>LOGIN</h1> */}
        {/* <form onSubmit={props.isLogin}>
            <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Your Email" required onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="********" required onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <div className={classes.actions}>
            <button type="submit" onClick={loginHandler}>LOGIN</button>
            </div>
            <div className='otherOption'>
                        <p>Don't have an account? </p>
                        
                            <Link to="/register" className="otherbtns">Register</Link>
                        
                        
            </div>
        </form> */}
        
                    <h1>LOGIN</h1>
                    
              

                <div className="loginBox">
                    <div className={classes.control}>
                        <div className={classes.entryText}>Email</div>
                        <input className="email input" type="email" name="Email" placeholder="Your Email" required="" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className={classes.control}>
                        <div className={classes.entryText}>Password</div>
                        <input className="password input" type="password" name="Password" placeholder="**********" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className={classes.actions} type="submit" onClick={loginHandler}>
                        Login
                    </button>
                    <div className='otherOption'>
                        <button className=" otherbtns" >
                        <p>Don't have an account? </p>
                            <Link to="/register" className="otherbtns">Register</Link>
                        </button>
                       
                    </div>
                </div>
           
        
       
        </section>
}
export default Login;