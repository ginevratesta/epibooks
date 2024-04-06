import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3030/user/${email}`);
      const user = response.data;
      if (!user) {
        setError("User not found");
        return;
      }
      setPassword(user.password);
      if (password !== user.password) {
        setError("Invalid password");
        return;
      }
      navigate("/home");
    } catch (error) {
      setError("Error checking user");
      console.error("Error checking user:", error);
    } finally {
      setPassword("");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");

    try {
      console.log(email, password);
      const response = await axios.post("http://localhost:3030/signup", {
        email,
        password,
      });
      console.log(response.data);
    } catch (error) {
      setError("Error registering user");
      console.error("Error registering user:", error);
    } finally {
      setEmail("");
      setPassword("");
      navigate("/home");
    }
  };

  const handleGitHubLogin = () => {
    window.location.href = `${process.env.REACT_APP_SERVER_BASE_URL}/auth/github`;
  };

  const handleSignUp = () => {
    setIsRegistered(false);
  };

  useEffect(() => {}, [isRegistered, email, password]);

  return (
    <Container className="py-5 text-center">
      <h2>{isRegistered ? "Login" : "Sign up"}</h2>
      <Form
        onSubmit={isRegistered ? handleSubmit : handleRegister}
        className="d-flex flex-column justify-content-around align-items-center"
      >
        <Form.Group controlId="email">
          <Form.Label className="mt-4">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label className="mt-4">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {error && <p className="text-danger">{error}</p>}
        <Button variant="primary" type="submit" className="mt-3">
         {isRegistered ? "Login" : "Sign up"}
        </Button>
        <button
          className="github w-25 my-5"
          type="button"
          onClick={handleGitHubLogin}
        >
          <img
            id="github-img"
            src="https://tse3.mm.bing.net/th?id=OIP.Sfgbqcg35rCru0YB-IQwxgHaD4&pid=Api&P=0&h=180"
            alt="github logo"
          />
          Login with GitHub
        </button>

        <p onClick={handleSignUp} style={{ cursor: "pointer" }}>Not a member yet? Sign up!</p>
      </Form>
    </Container>
  );
};

export default Login;
