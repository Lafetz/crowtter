import { Avatar, Button, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Comments } from "./comments";
import { pictureUrl } from "../firebase/firebase";
export const Post = (props) => {
  const { addBtn, removeComment, post, user, profile, unlikePost, likePost } =
    props;
  const [Img, setImg] = useState("");
  const [ImgProfile, setImgProfile] = useState("");

  useEffect(() => {
    const imgFun = async () => {
      const url = await pictureUrl("posts", post.postId);

      setImg(url);
    };
    if (post.img) imgFun();
  }, [post]);
  useEffect(() => {
    const Pfun = async () => {
      const Profileurl = await pictureUrl("profile", post.userId);
      setImgProfile(Profileurl);
    };
    Pfun();
  }, [post]);
  return (
    <Flex
      minH="100px"
      flexDirection="column"
      justifyContent="center"
      gap="20px"
      padding="5%"
      bg="#252525"
      boxShadow="md"
      fontSize="1.1rem"
      borderRadius="15px"
      color="#5eead4"
      width="80%"
    >
      <Flex gap="2%">
        <Avatar src={ImgProfile} />
        <Text fontSize="1.19rem">{post.userName}</Text>
      </Flex>

      {post.img && <img alt="post img" src={Img} />}

      <Text fontFamily="roboto" fontSize="1.1rem">
        {post.content}
        {post.likedBy.length > 1 && (
          <span fontSize="1rem">{post.likedBy.length} people liked this</span>
        )}
      </Text>

      {post.likedBy.includes(user.uid) && (
        <Button
          color="white"
          bg="#6930C3"
          onClick={() => {
            unlikePost(user.uid, post.postId);
          }}
          _hover={{
            backgroundColor: "#dc2626",
          }}
        >
          unlike
        </Button>
      )}
      {!post.likedBy.includes(user.uid) && (
        <Button
          _hover={{
            backgroundColor: "#3F72AF",
          }}
          color="white"
          bg="#6930C3"
          onClick={() => {
            likePost(user.uid, post.postId);
          }}
        >
          like
        </Button>
      )}

      <Comments
        addBtn={addBtn}
        removeComment={removeComment}
        post={post}
        user={user}
        profile={profile}
      />
    </Flex>
  );
};
