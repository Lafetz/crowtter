import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { Link, useLocation } from "react-router-dom";
import { LeftPannel } from "../leftPannel/LeftPannel";
import { follow, unfollow, getUserPosts } from "../firebase/firebase.js";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Heading,
  Text,
} from "@chakra-ui/react";
import { db } from "../firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";

import { pictureUrl } from "../firebase/firebase.js";
export const UsersProfile = () => {
  const user = useContext(UserContext); //the account that logged in auth
  const location = useLocation();
  const { id, Userprofile, profileImg } = location.state; //the account that is being seen
  const [profile, setProfile] = useState({}); //the account that is being seen
  const [following, setFollwing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [Img, setImg] = useState("");

  useEffect(() => {
    const profileImg = async () => {
      if (profile.profilePic) {
        const url = await pictureUrl("profile", profile.userId);
        setImg(url);
      }
    };
    if (Object.keys(profile).length !== 0) {
      profileImg();
    }
  }, [profile]);

  useEffect(() => {
    const postFun = async () => {
      const postsdoc = await getUserPosts(id);
      setPosts(postsdoc);
    };
    postFun();
  }, [id]);

  useEffect(() => {
    const snapTest = () => {
      const colRef = doc(db, "users", id);
      onSnapshot(colRef, (x) => {
        const data = x.data();
        setProfile(data);
        setFollwing(data.followers.includes(user.uid));
      });
    };
    snapTest();
  }, [id, user.uid]);

  const followBtn = () => {
    follow(user.uid, id);
  };
  const unfollowBtn = () => {
    unfollow(user.uid, id);
  };
  return (
    <Grid height="100%" gridTemplateColumns="300px 1fr " fontSize="1.1rem">
      <LeftPannel profile={Userprofile} profileImg={profileImg} />
      <Flex flexDirection="column" height="100%" bg="#1c1917">
        <Flex
          boxShadow="md"
          color="#5eead4"
          flexDirection="column"
          gap="30px"
          padding="3%"
          bg="#262525"
          height="350px"
        >
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

          <Flex gap="15px">
            <Avatar size="xl" src={Img} />
            <Box padding="20px 0 0 0 ">
              <Text fontWeight="bold" fontSize="1.2rem">
                {profile.fullName}
              </Text>
              <Text>@{profile.userName}</Text>
            </Box>
            <Box padding="20px 0 0 0 ">
              {!following && (
                <Button
                  color="white"
                  bg="#6930C3"
                  _hover={{
                    backgroundColor: "#4b5563",
                  }}
                  onClick={followBtn}
                >
                  follow
                </Button>
              )}
              {following && (
                <Button
                  _hover={{
                    backgroundColor: "#991b1b",
                  }}
                  bg="#dc2626"
                  color="white"
                  onClick={unfollowBtn}
                >
                  unfollow
                </Button>
              )}
            </Box>
          </Flex>
          <Text>{profile.bio}</Text>
          {Object.keys(profile).length !== 0 && (
            <Flex gap="30px">
              <Text>{profile.following.length} following</Text>
              <Text>{profile.followers.length} followers</Text>
            </Flex>
          )}
        </Flex>
        <Box bg=" #1c1917" padding="1%">
          <Center>
            <Heading as="h3" color="#5eead4">
              posts
            </Heading>
          </Center>

          <Flex gap="20px" flexWrap="wrap" padding="3%" height="100%">
            {posts.map((post, i) => {
              return (
                <Box
                  key={i}
                  bg="#112D4E"
                  padding="10px"
                  borderRadius="10px"
                  color="white"
                  height="fit-content"
                  minH="100px"
                  minW="200px"
                >
                  {post.img && (
                    <Box maxW="300px">
                      <img
                        alt="post img"
                        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg"
                      />
                    </Box>
                  )}
                  <Text margin="30px 0 0 0">{post.content}</Text>
                </Box>
              );
            })}
          </Flex>
        </Box>
      </Flex>
    </Grid>
  );
};
