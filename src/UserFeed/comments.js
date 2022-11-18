import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { PictureP } from "./avatar";
export const Comments = (props) => {
  const { addBtn, removeComment, post, user, profile } = props;
  const [userComment, setComment] = useState("");
  const inputChange = (e) => {
    setComment(e.target.value);
  };
  return (
    <Flex
      flexDirection="column"
      width=" 100%"
      borderTop="solid white 1px"
      gap="20px"
    >
      <form>
        <Flex marginTop="20px" justifyContent="space-around">
          <Input
            border="1px solid black"
            width=" 60%"
            value={userComment}
            onChange={inputChange}
          />
          <Button
            _hover={{
              backgroundColor: "#3F72AF",
            }}
            color="white"
            bg="#6930C3"
            onClick={(e) => {
              e.preventDefault();

              addBtn(userComment, user.uid, profile.userName, post.postId);
              setComment("");
            }}
          >
            add comment
          </Button>
        </Flex>
      </form>
      <Flex gap="15px" flexDirection="column">
        {post.comments.map((comment, i) => {
          return (
            <Box
              padding="10px 10px 5px 15px"
              color="#5eead4"
              boxShadow="md"
              bg="#18181b"
              key={i}
              borderRadius="5px"
            >
              {comment.userId === user.uid && (
                <>
                  <Flex justifyContent="space-between">
                    <Flex gap="5%">
                      <PictureP id={comment.userId} />
                      <Text fontWeight="bold">@{comment.userName}</Text>
                    </Flex>
                    <Button
                      color="white"
                      bg="#6930C3"
                      onClick={() => {
                        removeComment(post.postId, comment);
                      }}
                      _hover={{
                        backgroundColor: "#dc2626",
                      }}
                    >
                      remove
                    </Button>
                  </Flex>

                  <Text padding="10px 0 0 0" fontSize="1.2rem">
                    {comment.content}
                  </Text>
                </>
              )}
              {comment.userId !== user.uid && (
                <>
                  <Flex justifyContent="space-between">
                    <Flex gap="8%">
                      <PictureP id={comment.userId} />
                      <Text fontWeight="bold">@{comment.userName}</Text>
                    </Flex>
                  </Flex>

                  <Text padding="10px 0 0 0" fontSize="1.2rem">
                    {comment.content}
                  </Text>
                </>
              )}
            </Box>
          );
        })}
      </Flex>
    </Flex>
  );
};
