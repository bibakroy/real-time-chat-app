/* eslint-disable react/display-name */
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useCallback } from "react";
import { useUserContext } from "../context/UserContext";

const withAuth = (WrappedComponent: NextPage<any, any>) => {
  return (props: any) => {
    const router = useRouter();
    const { loading, user } = useUserContext();

    const redirect = useCallback(
      (route: string, currentRoute: string) => {
        if (route !== currentRoute) {
          router.push(route);
        }
      },
      [router]
    );

    useEffect(() => {
      const pathname = router.pathname;
      if (!user) {
        if (pathname === "/sign-up") {
          return redirect("/sign-up", pathname);
        } else {
          return redirect("/sign-in", pathname);
        }
      } else {
        if (pathname === "/sign-in") {
          return redirect("/", pathname);
        }
        if (pathname === "/sign-up") {
          return redirect("/", pathname);
        }
      }
    }, [router, user, redirect]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
