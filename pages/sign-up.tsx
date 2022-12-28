import { VStack, Button, ButtonGroup, Heading } from "@chakra-ui/react";
import ToggleColorMode from "../src/components/ToggleCOlorMode";
import { Formik, Form } from "formik";
import TextField from "../src/components/TextField";
import { useRouter } from "next/router";
import axios from "axios";
import { formSchema } from "../utils/formSchema";

const SignUp = () => {
  const router = useRouter();

  const submitHandler = async (
    values: { username: string; password: string },
    actions: any
  ) => {
    console.log(values, actions);
    alert(JSON.stringify(values, null, 2));
    const vals = { ...values };
    actions.resetForm();
    try {
      const res = await axios.post("/api/auth/sign-up", { data: vals });
      console.log(res);
    } catch (error) {
      console.log(error);
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
