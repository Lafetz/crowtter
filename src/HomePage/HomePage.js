import { Post } from "../Post/Post";
import { People } from "../People/People";
import { UserFeed } from "../UserFeed/userFeed";
import { LeftPannel } from "../leftPannel/LeftPannel";
import { Box, Grid } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { getUserProfile, pictureUrl } from "../firebase/firebase";
export const HomePage = () => {
  const user = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [Img, setImg] = useState("");

  useEffect(() => {
    const profileFun = async () => {
      const userDoc = await getUserProfile(user.uid);
      setProfile(userDoc);
      const url = await pictureUrl("profile", user.uid);
      setImg(url);
    };

    if (Object.keys(user).length !== 0) profileFun();
  }, [user]);
  return (
    <>
      {profile !== null && (
        <Grid
          gridTemplateColumns="300px 9fr 4fr"
          height="100%"
          overflow="auto"
          sx={{
            "&::-webkit-scrollbar": {
              width: "16px",
              borderRadius: "8px",
              backgroundColor: `#18181b`,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: `#6930C3`,
              borderRadius: "8px",
            },
          }}
        >
          <LeftPannel profile={profile} profileImg={Img} />
          <Grid bg="#18181b" padding="0 10%" gridTemplateRows="350px 5fr">
            <Post profile={profile} />
            <UserFeed profile={profile} />
          </Grid>
          <Box bg="#252525">
            <People id={user.uid} profile={profile} profileImg={Img} />
          </Box>
        </Grid>
      )}
    </>
  );
};
