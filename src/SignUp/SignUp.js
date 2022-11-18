import {
  Button,
  Heading,
  Input,
  Flex,
  Box,
  Center,
  Textarea,
  FormLabel,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUP } from "../firebase/firebase";
import { Link as ReachLink } from "react-router-dom";
import { useForm } from "react-hook-form";
const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [userName, setuserName] = useState("");

  const [bio, setBio] = useState("");
  const [profilePic, setPic] = useState(null);
  const [firstPass, setFirst] = useState("");
  const navigate = useNavigate();
  const emailChange = (e) => {
    setEmail(e.target.value);
  };
  const passwordChange = (e) => {
    setPassword(e.target.value);
  };
  const fullNamechange = (e) => {
    setFullName(e.target.value);
  };
  const userNamechange = (e) => {
    setuserName(e.target.value);
  };
  const bioChange = (e) => {
    setBio(e.target.value);
  };
  const picChange = (e) => {
    const file = e.target.files[0];

    setPic(file);
  };
  const firstChange = (e) => {
    setFirst(e.target.value);
  };
  const submit = async (e) => {
    try {
      await signUP(email, password, fullName, userName, bio, profilePic);
      navigate("/HomePage");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box bg="#41AEA9" padding="6% 0px" height="100%">
      <Center padding="0 10%" height="fit-content">
        <Flex
          boxShadow="md"
          p="2% 20px"
          flexDirection="column"
          gap="10px"
          bg="#252525"
          color="white"
          borderRadius="15px"
          height="100%"
        >
          <Center>
            <Heading>Sign UP</Heading>
          </Center>
          <Flex flexBasis="100%">
            <form onSubmit={handleSubmit(submit)}>
              <Flex flexDirection="column" gap="10px">
                <Input
                  isInvalid={errors.NameRequired}
                  errorBorderColor="red.300"
                  name="fullName"
                  placeholder="Full Name"
                  aria-label="full name"
                  value={fullName}
                  {...register("NameRequired", {
                    required: true,
                  })}
                  onChange={fullNamechange}
                />
                {errors.NameRequired && (
                  <span
                    style={{
                      color: "#dc2626",
                    }}
                  >
                    Name required
                  </span>
                )}
                <Input
                  name="email"
                  type="email"
                  isInvalid={errors.email}
                  errorBorderColor="red.300"
                  {...register("email", {
                    required: true,
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                  placeholder="Email"
                  aria-label="email"
                  value={email}
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
                  type="password"
                  name="password"
                  placeholder="Password"
                  aria-label="password"
                  {...register("password", {
                    required: true,
                    minLength: 8,
                  })}
                  value={firstPass}
                  onChange={firstChange}
                />
                {errors.password && (
                  <span
                    style={{
                      color: "#dc2626",
                    }}
                  >
                    Password must be at least 8 characters long
                  </span>
                )}
                <Input
                  type="password"
                  isInvalid={errors.confirmPassword}
                  errorBorderColor="red.300"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  aria-label="Confirm password"
                  {...register("confirmPassword", {
                    minLength: 8,
                  })}
                  value={password}
                  onChange={passwordChange}
                />
                {watch("confirmPassword") !== watch("password") &&
                getValues("confirmPassword") ? (
                  <p
                    style={{
                      color: "#dc2626",
                    }}
                  >
                    passwords don't match
                  </p>
                ) : null}
                <Input
                  isInvalid={errors.UserName}
                  errorBorderColor="red.300"
                  name="userName"
                  placeholder="@username"
                  aria-label="username"
                  value={userName}
                  {...register("UserName", {
                    required: true,
                    minLength: 3,
                    maxLength: 20,
                  })}
                  onChange={userNamechange}
                />
                {errors.UserName && (
                  <span
                    style={{
                      color: "#dc2626",
                    }}
                  >
                    Username must be between 3 and 20 characters
                  </span>
                )}
                <Textarea
                  name="bio"
                  height="130px"
                  resize="none"
                  {...register("bio", {
                    maxLength: 350,
                  })}
                  onChange={bioChange}
                  value={bio}
                  aria-label="Bio"
                  placeholder="Say something about yourself"
                ></Textarea>
                {errors.bio && (
                  <span
                    style={{
                      color: "#dc2626",
                    }}
                  >
                    Bio exceeds max allowed characters
                  </span>
                )}
                <FormLabel htmlFor="img" fontSize="1.1rem" fontWeight="bold">
                  Profile picture
                  <Input
                    id="img"
                    variant="unstyled"
                    type="file"
                    onChange={picChange}
                  />
                </FormLabel>
                <Button
                  type="submit"
                  onSubmit={(data) => {
                    console.log(data.target);
                  }}
                  bg="#000000"
                  _hover={{
                    backgroundColor: "#4b5563",
                  }}
                >
                  Sign UP
                </Button>
              </Flex>
            </form>
          </Flex>
          <Center marginTop="-10px">
            <Link
              marginLeft="1%"
              color="#F73D93"
              to="/"
              fontSize="1.15rem"
              fontWeight="bold"
              as={ReachLink}
            >
              Already have an account?
            </Link>
          </Center>
        </Flex>
      </Center>
    </Box>
  );
};
export default SignUp;
