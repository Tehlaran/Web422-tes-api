
import Link from "next/link";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function MainNav() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className="fixed-top">
        <Container>
          <Navbar.Brand as={Link} href="/">Esther Nascimento</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/about">About</Nav.Link>
            <Nav.Link as={Link} href="/favourites">Favourites</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
