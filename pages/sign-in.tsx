import { VStack, Button, ButtonGroup, Heading, Text } from "@chakra-ui/react";
import ToggleColorMode from "../src/components/ToggleColorMode";
import { Formik, Form } from "formik";
import TextField from "../src/components/TextField";
import { useRouter } from "next/router";
import { formSchema } from "../utils/formSchema";
import axios from "axios";
import withAuth from "../src/HOC/withAuth";
import { useUserContext } from "../src/context/UserContext";
import jwt from "jsonwebtoken";
import { UserType } from "../src/types";
import { useState } from "react";

const SignIn = () => {
  const [error, setError] = useState(null);
  const { setUser } = useUserContext();
  const router = useRouter();

  const submitHandler = async (
    values: { username: string; password: string },
    actions: any
  ) => {
    console.log(values, actions);
    const vals = { ...values };
    actions.resetForm();
    try {
      const res = await axios.post("/api/auth/sign-in", { data: vals });
      console.log(res);
      localStorage.setItem("token", res.data.token);
      const user = jwt.decode(res.data.token);
      const { username, id } = user as UserType;
      setUser({ username, id });
      router.push("/");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <ToggleColorMode />
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={formSchema}
        onSubmit={(values, actions) => {
          submitHandler(values, actions);
        }}
      >
        <VStack
          as={Form}
          w={{ base: "90%", md: "500px" }}
          m="auto"
          justify="center"
          h="100vh"
          spacing="1rem"
        >
          <Heading>Sign In</Heading>
          <Text as="p" color="red.500">
            {error}
          </Text>
          <TextField
            name="username"
            placeholder="Enter username"
            autoComplete="off"
            label="Username"
          />

          <TextField
            name="password"
            placeholder="Enter password"
            autoComplete="off"
            label="Password"
            type="password"
          />
          <ButtonGroup>
            <Button colorScheme="teal" type="submit">
              Sign In
            </Button>
            <Button
              onClick={() => {
                router.push("/sign-up");
              }}
            >
              Create Account
            </Button>
          </ButtonGroup>
        </VStack>
      </Formik>
    </div>
  );
};

export default withAuth(SignIn);
