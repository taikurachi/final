import { User } from "firebase/auth";
import { FC } from "react";
import CreatePostForm from "./CreatePostForm";
import Feed from "./Feed";
import UserProfile from "./UserProfile";
import Header from "../utils/Header";

interface MainPageProps {
  user: User;
}

const MainPage: FC<MainPageProps> = ({ user }) => {
  return (
    <div className="flex items-start sm:flex-row flex-col">
      <Header />
      <main className="flex justify-center items-center gap-4 flex-1 w-full">
        <div className="flex gap-4 md:flex-row flex-col w-full">
          <section className="p-8 bg-white h-[100dvh] md:min-w-[400px] ">
            <h2 className="text-4xl font-bold">Recent posts</h2>
            <Feed />
          </section>
          <div className="flex flex-col gap-4">
            <UserProfile user={user} />
            <CreatePostForm user={user} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
