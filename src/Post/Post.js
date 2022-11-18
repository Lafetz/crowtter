import { UserContext } from "../Context/UserContext";
import { useContext, useState } from "react";
import { post } from "../firebase/firebase";
import {
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";

export const Post = (props) => {
  const [content, setContent] = useState("");
  const [img, setImg] = useState(null);
  const user = useContext(UserContext);
  const profile = props.profile;
  const inputChange = (e) => {
    setContent(e.target.value);
  };
  const fileChange = (e) => {
    const file = e.target.files[0];

    setImg(file);
  };
  const btnClick = () => {
    const userId = user.uid;
    const data = {
      userId: userId,
      userName: profile.fullName,
      content: content,
      img: img !== null,
    };
    post(data, img);
    setImg(null);
    setContent("");
  };
  return (
    <Flex flexDirection="column" gap="5px" p="1% 15% 1% 5%" color="#5eead4">
      <Heading>Home</Heading>
      <FormControl height="60%">
        <Textarea
          value={content}
          onChange={inputChange}
          placeholder="What's on your mind"
          resize="none"
          height="90%"
          marginBottom="2%"
        ></Textarea>
        <Flex justifyContent="space-around">
          <label htmlFor="inputTag">
            <Text fontWeight="bold"> Select Image</Text>
            <Input
              variant="unstyled"
              id="inputTag"
              type="file"
              onChange={fileChange}
            />
          </label>

          <Button
            colorScheme="#150050"
            variant="outline"
            _hover={{
              backgroundColor: "#6930C3",
              color: "white",
            }}
            size="lg"
            onClick={btnClick}
          >
            post
          </Button>
        </Flex>
      </FormControl>
    </Flex>
  );
};

// Id
// content
// img
// Timestamp
