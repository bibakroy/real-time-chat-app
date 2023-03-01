import { Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import ToggleColorMode from "../src/components/ToggleColorMode";
import withAuth from "../src/HOC/withAuth";
import { useRouter } from "next/router";
import { useUserContext } from "../src/context/UserContext";

const Home = () => {
  const { setUser } = useUserContext();
  const router = useRouter();

  return (
    <Flex height="100vh" width="100%">
      <ToggleColorMode />

      <Button
        pos="absolute"
        bottom="0"
        left="0"
        m="1rem"
        onClick={() => {
          localStorage.removeItem("token");
          router.push("/sign-in");
          setUser(null);
        }}
      >
        Logout
      </Button>

      <Grid templateColumns="repeat(10, 1fr)" height="100%" width="100%">
        <GridItem colSpan={3} borderRight="1px solid gray"></GridItem>
        <GridItem colSpan={7}></GridItem>
      </Grid>
    </Flex>
  );
};

export default withAuth(Home);
