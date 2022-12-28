import { VStack, Button, ButtonGroup, Heading } from "@chakra-ui/react";
import ToggleColorMode from "../src/components/ToggleCOlorMode";
import { Formik, Form } from "formik";
import * as yup from "yup";
import TextField from "../src/components/TextField";
import { useRouter } from "next/router";

const SignUp = () => {
  const router = useRouter();

  return (
    <div>
      <ToggleColorMode />
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={yup.object({
          username: yup.string().required("Username is required"),
          password: yup.string().required("Password is required"),
        })}
        onSubmit={(values, actions) => {
          alert(JSON.stringify(values, null, 2));
          actions.resetForm();
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
          <Heading>Sign Up</Heading>
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
              Create Account
            </Button>
            <Button
              onClick={() => {
                router.push("/sign-in");
              }}
            >
              Sign In
            </Button>
          </ButtonGroup>
        </VStack>
      </Formik>
    </div>
  );
};

export default SignUp;
