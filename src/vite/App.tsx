import React, { useEffect } from "react";
import "./App.css";
import "./index.css";
import { Link } from "react-router-dom";
import { ENVIRONMENT } from "@/constants/environment";

function App() {
  /* Testing purpose: to get the cookies from the server */
  useEffect(() => {
    fetch(`${ENVIRONMENT.GATHER_AUTH_URL}/auth/generate`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: "trandinh.hop@gmail.com" }),
    });
  }, []);

  return (
    <div className="App">
      <Link to="/about">About</Link>
    </div>
  );
}

export default App;
