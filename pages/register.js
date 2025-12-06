// pages/register.js
import { useState } from "react";
import { useRouter } from "next/router";
import { Form, Button, Alert } from "react-bootstrap";
import { registerUser } from "../lib/authenticate";

export default function Register() {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [warning, setWarning] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setWarning("");

    if (password !== password2) {
      setWarning("Passwords do not match");
      return;
    }

    try {
      // registerUser does NOT set the token
      await registerUser(userName, password, password2);

      // after successful registration, go to login page
      router.push("/login");
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <>
      <h1>Register</h1>

      {warning && (
        <Alert variant="danger">
          {warning}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="userName">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password2">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </>
  );
}
