import React, { useState } from 'react';
import "./Login.css";
import Header from '../Header/Header';

const Login = ({ onClose }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(true);
  const [error, setError] = useState(""); // To handle error messages

  const login_url = `${window.location.origin}/djangoapp/login`;

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(login_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          password
        }),
      });

      const json = await res.json();
      if (json.status === "Authenticated") {
        sessionStorage.setItem('username', json.userName);
        setOpen(false);
        // Optionally redirect or update state here
      } else {
        setError("The user could not be authenticated."); // Set error message
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again."); // Handle any fetch errors
    }
  };

  // Redirect if the modal is closed
  if (!open) {
    window.location.href = "/";
  }

  return (
    <div>
      <Header />
      <div onClick={onClose}>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className='modalContainer'
        >
          <form className="login_panel" onSubmit={login}>
            <div>
              <span className="input_field">Username </span>
              <input 
                type="text" 
                name="username" 
                placeholder="Username" 
                className="input_field" 
                onChange={(e) => setUserName(e.target.value)} 
                required // Added required attribute for validation
              />
            </div>
            <div>
              <span className="input_field">Password </span>
              <input 
                name="psw" 
                type="password" 
                placeholder="Password" 
                className="input_field" 
                onChange={(e) => setPassword(e.target.value)} 
                required // Added required attribute for validation
              />            
            </div>
            {error && <p className="error_message">{error}</p>} {/* Display error message */}
            <div>
              <input className="action_button" type="submit" value="Login"/>
              <input className="action_button" type="button" value="Cancel" onClick={() => setOpen(false)}/>
            </div>
            <a className="loginlink" href="/register">Register Now</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
