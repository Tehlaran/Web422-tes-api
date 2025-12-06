// components/RouteGuard.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isAuthenticated } from "@/lib/authenticate";

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Check auth on initial load
    authCheck(router.pathname);

    // Re-run on route change
    const handleRouteChange = (url) => {
      authCheck(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  function authCheck(url) {
    const path = url.split("?")[0];

    // Protected routes (you can add more later)
    const protectedRoutes = ["/favourites"];

    if (protectedRoutes.includes(path) && !isAuthenticated()) {
      setAuthorized(false);
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }

  return authorized && children;
}
