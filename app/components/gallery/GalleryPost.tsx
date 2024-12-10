import { FC } from "react";
import Image from "next/image";
interface Post {
  imageURL: string;
  caption: string;
  dateStr: string;
  id: string;
}
const GalleryPost: FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="flex flex-col bg-gray-200 p-4 rounded-lg" key={post.id}>
      <Image
        src={post.imageURL}
        alt={post.caption}
        width={300}
        height={200}
        className="mb-2"
      />
      <p>{post.caption}</p>
      <p className="font-bold">{post.dateStr}</p>
    </div>
  );
};

export default GalleryPost;
