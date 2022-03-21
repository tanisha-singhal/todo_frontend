import React, { useState } from "react";
import axios from "axios";
import classes from "./Register.module.css";
import { useHistory } from "react-router-dom";
const Register = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const registerHandler = async () => {
    await axios
      .post(`${process.env.REACT_APP_API_LINK}/api/users/create`, {
        name: name,
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        history.push("/login");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <section className={classes.register}>
      
      <h1>REGISTER</h1>

      <div className="registerBox">
        <div className={classes.control}>
          <div className={classes.entryText}>Name</div>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required=""
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <div className={classes.entryText}>Email</div>
          <input
            type="email"
            name="Email"
            placeholder="Your Email"
            required=""
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <div className={classes.entryText}>Password</div>
          <input
            className="password input"
            type="password"
            name="Password"
            placeholder="**********"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className={classes.actions}
          type="submit"
          onClick={registerHandler}
        >
          Register
        </button>
      </div>
    </section>
  );
};
export default Register;
