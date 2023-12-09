import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("Country/Region");
  const navigate = useNavigate();
  const countries = ["UK", "USA", "India" /* Add all the countries here */];

  const handleClose = () => {
    navigate("/"); //for close button(X)
  };

  const handleNameChange = (event) => {
    // console.log(event.target.value, setName);
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };
  const handleSignupClick = async () => {
    const apiUrl = "https://academics.newtonschool.co/api/v1/user/signup";
  
    const emailFormat = /^\S+@\S+\.\S+$/;
    if (!emailFormat.test(email)) {
      alert("Please enter a valid email address.");
      return; 
    }
    
    const requestBody = {
      name: name,
      email: email,
      password: password,
      appType: "music",
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          projectID: "f104bi07c490",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      console.log("Full API Response:", data);

      if (response.ok) {
        const token = data.token;
        if (token) {
        alert("signup successfully")
          navigate("/signin");
        
        } else {
          console.error("No token received from the API");
        }
      } else {
        if (
          data.message &&
          data.message.toLowerCase().includes("already exists")
        ) {
          alert("Account with this email already exists. Please sign in.");
        } else {
          console.error("API Error:", data.message || "Unknown error");
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "700px",
        boxShadow: "0px 0px 10px white",
        height: "600px",
        margin: "0 auto",
        fontFamily: "Arial",
        marginTop: "53px",
        position: "fixed",
        zIndex: 1000,
        background: "lightgray",
        top: "40%",
        left: "50%",
        borderRadius: "10px",
        transform: "translate(-50%, -50%)",
        overflow: "auto",
      }}
    >
      <button
        onClick={handleClose}
        style={{
          position: "absolute",
          top: "20px",
          left: "30px",
          border: "none",
          fontSize: "20px",
          cursor: "pointer",
          padding: "5px",
          color: "black",
          transition: "background .1s linear",
          backgroundColor: "lightgray",
          borderRadius: "50%",
          zIndex: 1,
        }}
      >
        X
      </button>
      <h1 style={{ marginBottom: "20px" }}>Create an Account</h1>
      <label style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Full Name"
          style={{
            width: "500px",
            height: "55px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "9px",
          }}
        />
      </label>
      <label style={{ marginBottom: "20px" }}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          style={{
            width: "500px",
            height: "55px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "9px",
          }}
        />
      </label>
      <label style={{ marginBottom: "20px" }}>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          style={{
            width: "500px",
            height: "55px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
          }}
        />
      </label>
      <label style={{ marginBottom: "20px" }}>
        <select
          value={selectedCountry}
          onChange={handleCountryChange}
          style={{
            width: "500px",
            height: "55px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
          }}
        >
          <option value="Country/Region" disabled>
            Select a Country/Region
          </option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </label>
      <Link to="/signin" style={{ marginBottom: "20px" }}>
        Already have an account? Sign In
      </Link>
      <button
        onClick={handleSignupClick}
        style={{
          backgroundColor: "#E75480",
          width: "300px",
          height: "45px",
          borderRadius: "9px",
          fontSize: "18px",
        }}
      >
        Sign Up
      </button>
    </div>
  );
};

export default Signup;
