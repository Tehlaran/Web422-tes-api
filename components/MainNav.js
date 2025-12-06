// components/MainNav.js
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown
} from "react-bootstrap";

import {
  isAuthenticated,
  readToken,
  removeToken
} from "@/lib/authenticate";

import { useAtom } from "jotai";
import { favouritesAtom, searchHistoryAtom } from "@/store";

export default function MainNav() {
  const router = useRouter();

  const [, setFavouritesList] = useAtom(favouritesAtom);
  const [, setSearchHistory] = useAtom(searchHistoryAtom);

  const [user, setUser] = useState(null);

  // Update navbar when route changes or auth changes
  useEffect(() => {
    if (isAuthenticated()) {
      const token = readToken();
      setUser(token?.userName || null);
    } else {
      setUser(null);
    }
  }, [router.pathname]);

  const logout = () => {
    removeToken();
    setFavouritesList([]);
    setSearchHistory([]);
    setUser(null);
    router.push("/login");
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Link href="/" passHref legacyBehavior>
          <Navbar.Brand>My Books App</Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">

            {/* Home */}
            <Link href="/" passHref legacyBehavior>
              <Nav.Link active={router.pathname === "/"}>Home</Nav.Link>
            </Link>

            {/* Books Page (keep if you had it) */}
            <Link href="/books" passHref legacyBehavior>
              <Nav.Link active={router.pathname === "/books"}>Books</Nav.Link>
            </Link>

            {/* About Page (if you had it) */}
            <Link href="/about" passHref legacyBehavior>
              <Nav.Link active={router.pathname === "/about"}>About</Nav.Link>
            </Link>

            {/* Favourites */}
            <Link href="/favourites" passHref legacyBehavior>
              <Nav.Link active={router.pathname === "/favourites"}>
                Favourites
              </Nav.Link>
            </Link>
          </Nav>

          <Nav>
            {/* LOGGED OUT -> Show Login + Register */}
            {!user && (
              <>
                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link active={router.pathname === "/login"}>
                    Login
                  </Nav.Link>
                </Link>

                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link active={router.pathname === "/register"}>
                    Register
                  </Nav.Link>
                </Link>
              </>
            )}

            {/* LOGGED IN -> Show Username Dropdown */}
            {user && (
              <NavDropdown title={user} align="end">

                <Link href="/favourites" passHref legacyBehavior>
                  <NavDropdown.Item>Favourites</NavDropdown.Item>
                </Link>

                <NavDropdown.Divider />

                <NavDropdown.Item onClick={logout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
