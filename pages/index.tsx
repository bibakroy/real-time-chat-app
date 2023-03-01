import { Button } from "@chakra-ui/react";
import ToggleColorMode from "../src/components/ToggleColorMode";
import withAuth from "../src/HOC/withAuth";
import { useRouter } from "next/router";
import { useUserContext } from "../src/context/UserContext";

const Home = () => {
  const { setUser } = useUserContext();
  const router = useRouter();

  return (
    <div>
      <ToggleColorMode />
      <div>Home Page</div>
      <Button
        onClick={() => {
          localStorage.removeItem("token");
          router.push("/sign-in");
          setUser(null);
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default withAuth(Home);
