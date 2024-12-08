import { User } from "firebase/auth";
import { firestore } from "./firebase/config";
import { doc, getDoc, DocumentReference } from "firebase/firestore";

const getCurrentDate = (date: Date): string => {
  const month: number = date.getMonth() + 1;
  const day: number = date.getDate();
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

const getUserData = async (user: User): Promise<UserDataReturn | null> => {
  const userDocRef = doc(firestore, "users", user.uid);
  const userDoc = await getDoc(userDocRef);

  if (!userDoc.exists()) {
    return null;
  }

  const userData = userDoc.data() as UserData;
  return { ...userData, userDocRef };
};
export { getCurrentDate, getUserData };
