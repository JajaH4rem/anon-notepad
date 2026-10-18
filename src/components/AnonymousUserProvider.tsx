"use client";

import { useEffect } from "react";
import { ReactNode } from "react";

// accepts children props, which should be only something React can render/provide
export default function AnonymousUserProvider({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    async function initializeUser() {
      const existingId = localStorage.getItem("anonymousUserId");

      if (!existingId) {
        const response = await fetch("/api/anonymous-users", {
          method: "POST",
        });
        const data = await response.json();
        localStorage.setItem("anonymousUserId", data.id);
      }
    }

    initializeUser();
  }, []);

  return <>{children}</>;
}
