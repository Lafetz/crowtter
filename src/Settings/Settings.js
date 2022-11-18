import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Grid,
  Input,
  Textarea,
} from "@chakra-ui/react";

import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { getUserProfile, editProfile, pictureUrl } from "../firebase/firebase";
import { LeftPannel } from "../leftPannel/LeftPannel";
export const Settings = () => {
  const user = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const [Img, setImg] = useState("");
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const profileImg = async () => {
      if (profile.profilePic) {
        const url = await pictureUrl("profile", profile.userId);
        setImg(url);
      }
    };
    profileImg();
  }, [profile]);
  useEffect(() => {
    const profileFun = async () => {
      const profileDoc = await getUserProfile(user.uid);
      setProfile(profileDoc);
      setBio(profileDoc.bio);
      setUserName(profileDoc.userName);
      setName(profileDoc.fullName);
    };
    profileFun();
  }, [user]);
  const edit = (e) => {
    e.preventDefault();
    editProfile(user.uid, name, userName, bio);
  };
  return (
    <Grid gridTemplateColumns="300px 1fr" height="100%" bg="#18181b">
      <LeftPannel profile={profile} profileImg={Img} />
      <Box padding="3% 0 0 0">
        <Center>
          <Link to="/Homepage">
            <Button
              width="fit-content"
              color="white"
              bg="#6930C3"
              _hover={{
                backgroundColor: "#4b5563",
              }}
            >
              back
            </Button>
          </Link>
        </Center>
        <FormControl>
          <Center>
            <Flex
              paddingTop="10%"
              flexDirection="column"
              width="50%"
              gap="30px"
            >
              <Input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                variant="flushed"
                color="white"
              />
              <Input
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                variant="flushed"
                color="white"
              />
              <Textarea
                color="white"
                value={bio}
                height="200px"
                resize="none"
                onChange={(e) => {
                  setBio(e.target.value);
                }}
              ></Textarea>
              <Button
                onClick={edit}
                color="white"
                bg="#6930C3"
                _hover={{
                  backgroundColor: "#4b5563",
                }}
              >
                Edit
              </Button>
            </Flex>
          </Center>
        </FormControl>
      </Box>
    </Grid>
  );
};
