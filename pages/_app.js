// pages/_app.js
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import { Provider } from "jotai";
import RouteGuard from "@/components/RouteGuard";
import MainNav from "@/components/MainNav";
import { Container } from "react-bootstrap";

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <MainNav />
      <br />
      <Container>
        <RouteGuard>
          <Component {...pageProps} />
        </RouteGuard>
      </Container>
    </Provider>
  );
}
