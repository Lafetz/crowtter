import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  setDoc,
  arrayUnion,
  arrayRemove,
  doc,
  serverTimestamp,
  getDoc,
  updateDoc,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});
// const app = initializeApp({
//   apiKey: pr,
//   authDomain: "social-crow-1e798.firebaseapp.com",
//   projectId: "social-crow-1e798",
//   storageBucket: "social-crow-1e798.appspot.com",
//   messagingSenderId: "216449974867",
//   appId: "1:216449974867:web:19718cffc3aad1a7ed3ca6",
// });
export const auth = getAuth(app);
export const db = getFirestore(app);
const storage = getStorage(app);
const uploadPic = async (pic, folder, id) => {
  if (pic === null) {
    return;
  }

  const picRef = ref(storage, `images/${folder}/${id}`);

  uploadBytes(picRef, pic);
};
const createUserDatabase = async (Id, name, username, bio, pic) => {
  const data = {
    userId: Id,
    fullName: name,
    userName: username,
    profilePic: pic !== null,
    bio: bio,
    followers: [],
    following: [],
  };
  try {
    await setDoc(doc(db, "users", Id), data);
  } catch (err) {
    console.log(err);
  }
};
export const signUP = async (email, password, name, username, bio, pic) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    await createUserDatabase(user.user.uid, name, username, bio, pic);
    await uploadPic(pic, "profile", user.user.uid);
  } catch (err) {
    console.log(err.message);
  }
};
export const logout = () => {
  signOut(auth);
};
export const signIn = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
};
export const userAuth = async () => {
  onAuthStateChanged(auth, (user) => {
    console.log(user);
  });
};

export const post = async (data, pic) => {
  data.timeStamp = serverTimestamp();
  data.likedBy = [];
  data.comments = [];

  try {
    const h = await addDoc(collection(db, "posts"), data);
    await uploadPic(pic, "posts", h.id);
    console.log(h.id);
  } catch (err) {
    console.log(err);
  }
};
export const getUserProfile = async (id) => {
  const colRef = doc(db, "users", id);

  const user = await getDoc(colRef);
  return user.data();
};
export const getUsers = async (id) => {
  const colRef = collection(db, "users");
  const q = query(colRef, where("userId", "!=", id));
  const users = await getDocs(q);
  const userarr = [];
  users.docs.forEach((doc) => {
    userarr.push({ ...doc.data() });
  });
  return userarr;
};
//ownerId iis the one clicking on follow and unfollow
export const follow = async (ownerId, userId) => {
  const userRef = doc(db, "users", userId);

  const ownerRef = doc(db, "users", ownerId);

  try {
    await updateDoc(userRef, {
      followers: arrayUnion(ownerId),
    });
    await updateDoc(ownerRef, {
      following: arrayUnion(userId),
    });
  } catch (err) {
    console.log(err);
  }
};
export const unfollow = async (ownerId, userId) => {
  const userRef = doc(db, "users", userId);

  const ownerRef = doc(db, "users", ownerId);
  try {
    await updateDoc(userRef, {
      followers: arrayRemove(ownerId),
    });
    await updateDoc(ownerRef, {
      following: arrayRemove(userId),
    });
  } catch (err) {
    console.log(err);
  }
};
export const editProfile = async (id, name, userName, bio) => {
  const ref = doc(db, "users", id);
  try {
    await updateDoc(ref, {
      fullName: name,
      userName: userName,
      bio: bio,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getUserPosts = async (id) => {
  const q = query(
    collection(db, "posts"),
    where("userId", "==", id),
    orderBy("timeStamp", "desc")
  );
  const userPosts = await getDocs(q);
  const posts = [];
  userPosts.docs.forEach((post) => {
    posts.push(post.data());
  });
  return posts;
};
export const getAllPosts = async () => {
  const q = query(collection(db, "posts"), orderBy("timeStamp", "desc"));
  const userPosts = await getDocs(q);
  const posts = [];
  userPosts.docs.forEach((post) => {
    let postData = post.data();
    postData.postId = post.id;
    posts.push(postData);
  });

  return posts;
};
//ownerId iis the one clicking
export const likePost = async (ownerId, postId) => {
  const ref = doc(db, "posts", postId);
  try {
    await updateDoc(ref, {
      likedBy: arrayUnion(ownerId),
    });
  } catch (err) {
    console.log(err);
  }
};
export const unlikePost = async (ownerId, postId) => {
  const ref = doc(db, "posts", postId);
  try {
    await updateDoc(ref, {
      likedBy: arrayRemove(ownerId),
    });
  } catch (err) {
    console.log(err);
  }
};
export const addComment = async (postId, comment) => {
  const ref = doc(db, "posts", postId);
  try {
    await updateDoc(ref, {
      comments: arrayUnion(comment),
    });
  } catch (err) {
    console.log(err);
  }
};
export const removeComment = async (postId, comment) => {
  const ref = doc(db, "posts", postId);
  try {
    await updateDoc(ref, {
      comments: arrayRemove(comment),
    });
  } catch (err) {
    console.log(err);
  }
};
export const snapTest = () => {
  const q = query(collection(db, "posts"), orderBy("timeStamp", "desc"));
  const posts = [];
  onSnapshot(q, (x) => {
    x.docs.forEach((post) => {
      let postData = post.data();
      postData.postId = post.id;
      posts.push(postData);
    });
    console.log(posts);
  });
};
export const pictureUrl = async (folder, id) => {
  const url = await getDownloadURL(ref(storage, `images/${folder}/${id}`));
  return url;
};
