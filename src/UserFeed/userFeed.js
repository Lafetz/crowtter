import { Flex } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { Post } from "./posts";

import { db } from "../firebase/firebase";
import {
  likePost,
  unlikePost,
  addComment,
  removeComment,
} from "../firebase/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export const UserFeed = (props) => {
  const user = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const profile = props.profile;

  useEffect(() => {
    const snapTest = () => {
      const q = query(collection(db, "posts"), orderBy("timeStamp", "desc"));

      onSnapshot(q, (x) => {
        const posts = [];
        x.docs.forEach((post) => {
          let postData = post.data();
          postData.postId = post.id;
          posts.push(postData);
        });
        setPosts(posts);
      });
    };
    snapTest();
  }, []);

  const addBtn = (userComment, userId, name, postId) => {
    const comment = {
      content: userComment,
      userId: userId,
      userName: name,
    };
    addComment(postId, comment);
  };
  return (
    <Flex
      borderTop="1px solid white"
      padding="5% 0 20px 10%"
      flexDirection="column"
      gap="25px"
      bg="#18181b"
    >
      {posts.map((post) => {
        return (
          <Post
            key={post.postId}
            addBtn={addBtn}
            removeComment={removeComment}
            post={post}
            user={user}
            profile={profile}
            unlikePost={unlikePost}
            likePost={likePost}
          />
        );
      })}
    </Flex>
  );
};
