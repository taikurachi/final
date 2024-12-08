import { User } from "firebase/auth";
import { FC } from "react";
import CreatePostForm from "./CreatePostForm";
import Feed from "./Feed";
import UserProfile from "./UserProfile";

interface MainPageProps {
  user: User;
}

const MainPage: FC<MainPageProps> = ({ user }) => {
  // const [points, setPoints]

  return (
    <main className="flex justify-center items-center gap-4">
      <div className="flex gap-4">
        <section className="p-8 bg-white h-[100dvh] min-w-[400px]">
          <h2 className="text-4xl font-bold">Recent posts</h2>
          <Feed />
        </section>
        <div className="flex flex-col gap-4">
          <UserProfile user={user} />
          <CreatePostForm user={user} />
        </div>
      </div>
    </main>
  );
};

export default MainPage;
