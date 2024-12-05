"use client";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, firestore } from "../firebase/config.js";
import { FC, useState } from "react";
import { User } from "firebase/auth";

interface CreatePostFormProps {
  user: User;
}

const CreatePostForm: FC<CreatePostFormProps> = ({ user }) => {
  const [caption, setCaption] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [file, setFile] = useState(null);
  const uploadImage = async (file, userId) => {
    const storageRef = ref(storage, `posts/${userId}/${file.name}`);
    try {
      const snap = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snap.ref);
      console.log("file uploaded successfully", downloadURL);
      return downloadURL;
    } catch (e) {
      console.error("error uploading file", e.message);
      throw new Error("file upload failed");
    }
  };
  const createPost = async (userId, imageURL, caption) => {
    try {
      const postRef = await addDoc(collection(firestore, "posts"), {
        userId,
        imageURL,
        caption,
        createdAt: new Date(),
      });
      console.log("post created with id: ", postRef.id);
    } catch (e) {
      console.error("error creating a post", e.message);
    }
  };
  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleCreatePost = async () => {
    if (!file) {
      setErrorMsg("Please select a file");
      return;
    }
    const userId = user.uid;
    try {
      const imageUrl = await uploadImage(file, userId);
      await createPost(userId, imageUrl, caption);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="p-4 flex flex-col gap-4 border border-black rounded-lg m-10">
      <h2 className="font-bold text-4xl">Create Post</h2>
      <div>
        <label htmlFor="caption">Caption: </label>
        <input
          className="w-full block p-2 border-black border rounded-lg"
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="image upload">Upload Image: </label>
        <input type="file" onChange={handleFileChange} />
      </div>
      {errorMsg && <p className="text-red-600">{errorMsg}</p>}
      <button onClick={handleCreatePost} className="bg-green-400">
        Post
      </button>
    </div>
  );
};

export default CreatePostForm;
