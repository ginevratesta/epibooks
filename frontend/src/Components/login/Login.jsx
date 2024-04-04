import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3030/user/${email}`);
      const user = response.data;
      if (user && user.password === password) {
        navigate("/home");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("Error checking user");
      console.error("Error checking user:", error);
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  const handleGitHubLogin = () => {
    window.location.href = `${process.env.REACT_APP_SERVER_BASE_URL}/auth/github`;
  };

  return (
    <Container className="py-5">
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {error && <p className="text-danger">{error}</p>}
        <Button variant="primary" type="submit">
          Login
        </Button>
        <button
          type="button"
          className="button-github"
          onClick={handleGitHubLogin}
        >
          <img
            id="github-img"
            src="https://tse3.mm.bing.net/th?id=OIP.Sfgbqcg35rCru0YB-IQwxgHaD4&pid=Api&P=0&h=180"
            alt="github logo"
          />
          Git Hub
        </button>
      </Form>
    </Container>
  );
};

export default Login;
