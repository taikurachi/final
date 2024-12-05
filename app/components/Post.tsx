import { FC } from "react";

interface PostProps {
  post: object;
}

const Post: FC<PostProps> = ({ post }) => {
  const time = post.createdAt.toDate().toLocaleDateString();
  console.log(time);
  return (
    <div>
      <p>user</p>
      <img src={post.imageURL} alt="" />
      <p>{time}</p>
      <p>{post.caption}</p>
    </div>
  );
};

export default Post;
