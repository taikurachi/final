import { User } from "firebase/auth";
import { firestore } from "./firebase/config";
import { doc, getDoc } from "firebase/firestore";

const getCurrentDate = (date: Date): string => {
  const month: number = date.getMonth() + 1;
  const day: number = date.getDate();
  const year: number = date.getFullYear();

  return `${month}/${day}/${year}`;
};

const getUserData = async (user: User) => {
  const userDocRef = doc(firestore, "users", user.uid);
  const userDoc = await getDoc(userDocRef);
  if (!userDoc.exists()) {
    // console.error("user not found");
    console.log("user not found");
    return;
  }
  const userData = userDoc.data();
  let { points, streak, lastPostDate } = userData;
  return { points, streak, lastPostDate, userDocRef };
};
export { getCurrentDate, getUserData };
