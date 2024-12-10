"use client";
import { auth, firestore } from "@/app/firebase/config";
import { FC, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getUserPosts } from "@/app/utilsFn/utilsFn";
import GalleryPost from "./GalleryPost";

interface Post {
  id: string;
  imageURL: string;
  caption: string;
  dateStr: string;
}

const Gallery: FC = () => {
  const [user, loading] = useAuthState(auth);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const userPosts = await getUserPosts(user.uid);
        if (userPosts.length === 0) {
          setError("No posts found");
          return;
        }
        setPosts(userPosts);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error fetching posts");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  if (isLoading) {
    return (
      <main className="flex justify-center items-center gap-4 flex-1">
        <div className="flex flex-col gap-6 p-8 bg-white h-[100dvh] w-full">
          <h2 className="text-4xl font-bold">My gallery</h2>
          <p>Loading posts...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex justify-center items-center gap-4 flex-1">
        <div className="flex flex-col gap-6 p-8 bg-white h-[100dvh] w-full">
          <h2 className="text-4xl font-bold">My gallery</h2>
          <div className="text-red-500">Error: {error}</div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex justify-center items-center gap-4 flex-1">
      <div className="p-8 bg-white h-[100dvh] w-full">
        <h2 className="text-4xl font-bold">My gallery</h2>
        <div className="mt-8 grid grid-cols-4 gap-8">
          {posts.map((post) => (
            <GalleryPost key={post.id} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Gallery;
