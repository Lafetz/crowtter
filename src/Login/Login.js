import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../firebase/firebase";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Input,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";
import style from "./Login.module.css";
import { useForm } from "react-hook-form";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logError, setlogError] = useState(false);
  const navigate = useNavigate();
  const emailChange = (e) => {
    setEmail(e.target.value);
  };
  const passwordChange = (e) => {
    setPassword(e.target.value);
  };
  const submit = async (e) => {
    const response = await signIn(email, password);
    if (response === null) {
      setlogError(true);
      return;
    }
    setlogError(false);
    navigate("/HomePage");
  };
  const testAccount = async () => {
    const emailt = "eren@gmail.com";
    const passwordt = "12345678";
    const response = await signIn(emailt, passwordt);
    if (response === null) {
      setlogError(true);
      return;
    }
    setlogError(false);
    navigate("/HomePage");
  };
  return (
    <>
      <Flex
        padding="0 0 40px 0"
        wrap="wrap"
        gap="7%"
        justify="center"
        bg="#41AEA9"
        height="100%"
      >
        <Flex
          gap="20px"
          padding="4%"
          direction="column"
          align="center"
          justify="center"
        >
          <Center>
            <Flex wrap="wrap" gap="5px" direction="column" justify="center">
              <Heading as="h1" size="4xl">
                crowtter
              </Heading>
              <Heading as="h2">join today!</Heading>
            </Flex>
          </Center>
          <Container width="90%">
            <img
              alt="website logo"
              src="https://firebasestorage.googleapis.com/v0/b/social-crow-1e798.appspot.com/o/images%2Fapp%2FFlying-American-Crow-PNG-Clipart.png?alt=media&token=3811338e-343d-4597-8684-ccf70515e1fe"
            />
          </Container>
        </Flex>

        <Flex
          margin="10px 10px 10px 10px"
          direction="column"
          align="center"
          justify="center"
          w="400px"
        >
          <Box
            w="90%"
            borderRadius="15px"
            padding="10% 3%"
            boxShadow="md"
            bg="#252525"
            color="white"
          >
            {logError && (
              <Center
                marginBottom="20px"
                fontSize="1.3rem"
                fontWeight="bold"
                color="#dc2626"
              >
                incorrect email or password
              </Center>
            )}
            <form className={style.form} onSubmit={handleSubmit(submit)}>
              <Input
                type="email"
                value={email}
                id="userEmail"
                placeholder="Email"
                aria-label="email"
                borderColor="#cbd5e1"
                errorBorderColor="red.300"
                isInvalid={errors.email}
                {...register("email", {
                  required: true,
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
                onChange={emailChange}
              />
              {errors.email && (
                <span
                  style={{
                    color: "#dc2626",
                  }}
                >
                  Correct Email needed
                </span>
              )}
              <Input
                isInvalid={errors.password}
                errorBorderColor="red.300"
                value={password}
                onChange={passwordChange}
                id="userPassword"
                placeholder="Password"
                aria-label="password"
                borderColor="#cbd5e1"
              />

              <Button
                type="input"
                bg="#000000"
                _hover={{
                  backgroundColor: "#4b5563",
                }}
              >
                Login
              </Button>
            </form>
            <Button
              _hover={{
                backgroundColor: "#4b5563",
              }}
              marginTop="20px"
              bg="black"
              width="100%"
              onClick={testAccount}
            >
              Test Account
            </Button>
            <Box marginTop="10px">
              New to crowtter?
              <Link
                marginLeft="1%"
                color="#F73D93"
                as={ReachLink}
                to="/signUP"
                fontSize="1.15rem"
                fontWeight="bold"
              >
                sign UP
              </Link>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};
export default Login;
