import { logout } from "../firebase/firebase";

import React from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
export const LeftPannel = (props) => {
  const { profile, profileImg } = props;

  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const signout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box bg="#252525" color="#5eead4">
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent marginTop="17%" color="#5eead4" bg="#252525">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Sign Out
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure?</AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                color="white"
                bg="#6930C3"
                _hover={{
                  backgroundColor: "#4b5563",
                }}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                color="white"
                _hover={{
                  backgroundColor: "#991b1b",
                }}
                bg="#dc2626"
                onClick={signout}
                ml={3}
              >
                Sign Out
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Box padding="30px 30%">
        <Box pos="fixed" margin="auto">
          <Flex flexDirection="column" gap="300px">
            <Box>
              <Link to="../userProfile">
                <Avatar bg="#497174" size="2xl" src={profileImg} />
                <Text
                  color="#5eead4"
                  fontSize="1.5rem"
                  fontWeight="bold"
                  width="max-content"
                  margin="15px auto"
                >
                  @{profile.userName}
                </Text>
              </Link>
            </Box>
            <Flex flexDirection="column" gap="20px">
              <Link to="../settings">
                <Button
                  _hover={{
                    backgroundColor: "#4b5563",
                  }}
                  bg="#6930C3"
                  color="white"
                  w="100px"
                >
                  settings
                </Button>
              </Link>

              <Button
                _hover={{
                  backgroundColor: "#4b5563",
                }}
                bg="#6930C3"
                color="white"
                w="100px"
                onClick={onOpen}
              >
                Signout
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};
