import { FC } from "react";
import Image from "next/image";
import { getCurrentDate } from "@/app/utilsFn/utilsFn";
import { Timestamp } from "firebase/firestore";
interface Post {
  username: string;
  imageURL: string | null;
  caption: string;
  createdAt: Timestamp;
}

interface PostProps {
  post: Post;
}

const Post: FC<PostProps> = ({
  post: { username, imageURL, caption, createdAt },
}) => {
  const createdTime: string = getCurrentDate(createdAt.toDate());
  if (!imageURL) {
    return <div>No image available</div>;
  }

  return (
    <div className="flex flex-col gap-3 p-4 bg-gray-200 rounded-lg snap-start select-none">
      <p className="font-bold">{username || "Guest user"}</p>
      <div className="relative aspect-[4/5] max-h-[600px] w-full bg-black">
        <Image
          src={imageURL}
          fill
          className="object-contain bg-black/5 text-white pointer-events-none"
          alt="Post image"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <p className="font-bold">{createdTime}</p>
      {caption && <p>{caption}</p>}
    </div>
  );
};

export default Post;
