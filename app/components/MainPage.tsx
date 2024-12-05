import { User } from "firebase/auth";
import { FC, useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { firestore } from "@/app/firebase/config.js";
import Post from "./Post";
import CreatePostForm from "./CreatePostForm";
interface MainPageProps {
  user: User;
}

const MainPage: FC<MainPageProps> = ({ user }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnap = await getDocs(collection(firestore, "posts"));
        const postsArray = querySnap.docs.map((doc) => doc.data());
        console.log(postsArray);
        setPosts(postsArray);
      } catch (e) {
        console.error(e);
      }
    };
    fetchPosts();
  }, []);
  //   return <h1>hello {user.displayName || "guest user"}</h1>;
  return (
    <main>
      <section>
        <h2>Recent posts</h2>
        <div className="post-container">
          {posts.map((post, i) => (
            <Post post={post} key={i} />
          ))}
        </div>
      </section>
      <section>
        <CreatePostForm user={user} />
      </section>
    </main>
  );
};

export default MainPage;
