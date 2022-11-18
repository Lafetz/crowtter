import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { getUserProfile } from "../firebase/firebase";
import { LeftPannel } from "../leftPannel/LeftPannel";
import { pictureUrl } from "../firebase/firebase";
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
import { getUserPosts } from "../firebase/firebase";
import { Link } from "react-router-dom";
export const ProfileOwner = () => {
  const user = useContext(UserContext); //user.uid
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const [Img, setImg] = useState("");
  useEffect(() => {
    const profileFun = async () => {
      const profileDoc = await getUserProfile(user.uid);
      setProfile(profileDoc);
      if (profileDoc.profilePic) {
        const url = await pictureUrl("profile", user.uid);
        setImg(url);
      }
    };
    if (Object.keys(user).length !== 0) {
      profileFun();
    }
  }, [user]);
  useEffect(() => {
    const postsFun = async () => {
      const postsDoc = await getUserPosts(user.uid);
      setPosts(postsDoc);
    };
    postsFun();
  }, [user.uid]);
  return (
    <Grid height="100%" gridTemplateColumns="300px 1fr " fontSize="1.1rem">
      <LeftPannel profile={profile} profileImg={Img} />
      <Box>
        <Flex
          flexDirection="column"
          gap="30px"
          padding="3%"
          boxShadow="md"
          color="#5eead4"
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
          </Flex>
          <Text>{profile.bio}</Text>
          {Object.keys(profile).length !== 0 && (
            <Flex gap="30px">
              <Text>{profile.following.length} following</Text>
              <Text>{profile.followers.length} followers</Text>
            </Flex>
          )}
        </Flex>
        <Box height="max-content" bg="#1c1917" padding="1%">
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
                  bg="#252525"
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
      </Box>
    </Grid>
  );
};
