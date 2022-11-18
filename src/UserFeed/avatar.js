import { Avatar } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { pictureUrl } from "../firebase/firebase";

export const PictureP = (props) => {
  const id = props.id;
  const [img, setImg] = useState("");
  useEffect(() => {
    const profileFun = async () => {
      const url = await pictureUrl("profile", id);
      setImg(url);
    };

    profileFun();
  }, [id]);
  return <Avatar src={img} />;
};
