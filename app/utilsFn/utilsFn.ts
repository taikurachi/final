import { User } from "firebase/auth";
import { firestore } from "../firebase/config";
import {
  doc,
  getDoc,
  DocumentReference,
  query,
  where,
  orderBy,
  collection,
  getDocs,
} from "firebase/firestore";

const getCurrentDate = (date: Date): string => {
  const month: number = date.getMonth() + 1;
  const day = String(date.getDate()).padStart(2, "0");
  const year: number = date.getFullYear();

  return `${month}/${day}/${year}`;
};

interface UserData {
  points: number;
  streak: number;
  lastPostDate: string;
}

interface UserDataReturn extends UserData {
  userDocRef: DocumentReference;
}

const getUserPosts = async (userId: string) => {
  const postsRef = collection(firestore, "posts");
  const q = query(
    postsRef,
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

const getUserData = async (user: User): Promise<UserDataReturn | null> => {
  try {
    const userDocRef = doc(firestore, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      return null;
    }

    const userData = userDoc.data() as UserData;
    return { ...userData, userDocRef };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
export { getCurrentDate, getUserData, getUserPosts };
