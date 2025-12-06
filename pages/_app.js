import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { SWRConfig } from "swr";

const fetcher = async (...args) => {
  const res = await fetch(...args);
  if (!res.ok) {
    const err = new Error(`Request failed: ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
};

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}
