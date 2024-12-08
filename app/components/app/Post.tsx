import { FC } from "react";
import Image from "next/image";
import { getCurrentDate } from "@/app/utilsFn";
interface PostProps {
  post: object;
}

const Post: FC<PostProps> = ({ post }) => {
  const createdTime: string = getCurrentDate(post.createdAt.toDate());


  return (
    <div className="p-4 bg-gray-200 rounded-lg snap-start select-none">
      <p className="font-bold">{post.username ?? "Guest user"}</p>

      <Image
        src={post.imageURL}
        width={400}
        height={300}
        alt="Post image"
        className="select-none pointer-events-none"
      />
      <p>{createdTime}</p>
      <p>{post.caption}</p>
    </div>
  );
};

export default Post;
