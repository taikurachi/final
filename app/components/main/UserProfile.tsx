import { User } from "firebase/auth";
import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { getUserData } from "../../utilsFn/utilsFn";
import { Timestamp } from "firebase/firestore";

interface UserProfileProps {
  user: User;
}

const UserProfile: FC<UserProfileProps> = ({ user }) => {
  const [userData, setUserData] = useState<{
    points: number;
    streak: number;
    lastPostDate: Timestamp | Date | null;
    userDocRef?: any;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData(user);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);
  if (loading) {
    return (
      <section className="p-8 flex flex-col gap-5 bg-white rounded-l-lg md:rounded-b-lg">
        <p>Loading...</p>
      </section>
    );
  }

  if (userData) {
    const { points, streak } = userData;

    return (
      <section className="p-8 flex flex-col gap-5 bg-white rounded-l-lg md:rounded-b-lg">
        <h2 className="text-4xl font-bold">
          {user.displayName || "Guest user"}
        </h2>
        <p className="flex items-center gap-2">
          <Image src="/fire.svg" alt="fire icon" width={20} height={20} />
          {`${streak} day streak`}
        </p>
        <p className="flex items-center gap-2">
          <Image src="/points.svg" alt="points icon" width={22} height={22} />
          {`${points} points`}
        </p>
      </section>
    );
  }
  return (
    <section className="p-8 flex flex-col gap-5 bg-white rounded-l-lg md:rounded-b-lg">
      <h2 className="text-4xl font-bold">Guest user</h2>
      <p>No user data found. Sign up to track user data.</p>
    </section>
  );
};

export default UserProfile;
