import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../firebase/firebase";
import { PictureP } from "../UserFeed/avatar";
export const People = (props) => {
  const { id, profile, profileImg } = props;
  const [people, setPeople] = useState([]);
  useEffect(() => {
    const users = async () => {
      try {
        const ans = await getUsers(id);
        setPeople(ans);
      } catch (err) {
        console.log(err);
      }
    };
    if (id !== undefined) users();
  }, [id]);
  return (
    <Flex
      pos="fixed"
      flexDirection="column"
      gap="20px"
      padding="20px 20px 0 30px"
    >
      <Heading color="#5eead4" as="h2" size="lg">
        Who to follow
      </Heading>

      {people.map((person, i) => {
        return (
          <Box
            bg="#18181b"
            color="#5eead4"
            padding="15px"
            borderRadius="15px"
            _hover={{
              bg: "black",
            }}
            key={person.userId}
          >
            <Link
              key={i}
              to={"/profile/" + person.userName}
              state={{
                id: person.userId,
                Userprofile: profile,
                profileImg: profileImg,
              }}
            >
              <Grid gridTemplateColumns="1fr 5fr" gap="8px">
                <PictureP id={person.userId} />
                <div>
                  <Text fontWeight="bold">{person.fullName}</Text>
                  <Text>@{person.userName}</Text>
                </div>
              </Grid>
            </Link>
          </Box>
        );
      })}
    </Flex>
  );
};
