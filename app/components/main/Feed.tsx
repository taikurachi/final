import { FC, useEffect, useRef, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { firestore } from "@/app/firebase/config.js";
import Post from "./Post";

const Feed: FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [posts, setPosts] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const lastMousePosition = useRef<number>(0);
  const scrollTimeout = useRef<number | null>(null);

  const fetchPosts = async () => {
    try {
      const querySnap = await getDocs(collection(firestore, "posts"));
      const postsArray = querySnap.docs.map((doc) => doc.data());
      setPosts(postsArray);
    } catch (e) {
      console.error(e);
    }
  };
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsMouseDown(true);
    setStartY(e.pageY - (containerRef.current?.offsetTop || 0));
    setScrollTop(containerRef.current?.scrollTop || 0);
    lastMousePosition.current = e.pageY;
  };
  const handleMouseLeave = (e) => {
    setIsMouseDown(false);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const y = e.pageY - (containerRef.current?.offsetTop || 0);
    const distance = y - startY;
    if (scrollTimeout.current) {
      cancelAnimationFrame(scrollTimeout.current);
    }
    scrollTimeout.current = requestAnimationFrame(() => {
      const walk = distance * 1;
      if (containerRef.current) {
        containerRef.current.scrollTop = scrollTop - walk;
      }
      lastMousePosition.current = y;
    });
  };
  const handleMouseUp = () => {
    setIsMouseDown(false);
    if (scrollTimeout.current) {
      cancelAnimationFrame(scrollTimeout.current);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      className="post-container flex flex-col gap-6 mt-5 overflow-y-scroll scrollbar-none h-[calc(100dvh-130px)]"
    >
      {posts && posts.length > 0 ? (
        posts.map((post, i) => <Post post={post} key={i} />)
      ) : (
        <p>No recent posts. Check again soon.</p>
      )}
    </div>
  );
};

export default Feed;
