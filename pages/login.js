// pages/login.js
import { useState } from "react";
import { useRouter } from "next/router";
import { Form, Button, Alert } from "react-bootstrap";
import { authenticateUser } from "../lib/authenticate";
import { useAtom } from "jotai";
import { favouritesAtom } from "../store";
import { getFavourites } from "../lib/userData";

export default function Login() {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  // Step 3: update favourites atom after login
  async function updateAtom() {
    setFavouritesList(await getFavourites());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setWarning("");

    try {
      // authenticate user (sets the token in localStorage)
      await authenticateUser(userName, password);

      // pull favourites from the API and update atom
      await updateAtom();

      // IMPORTANT: redirect to "/" (not /vehicles)
      router.push("/");
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <>
      <h1>Login</h1>

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

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </>
  );
}
