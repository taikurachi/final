"use client";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { storage, firestore } from "../../firebase/config.js";
import { useDropzone } from "react-dropzone";
import { FC, useState, useCallback, useEffect } from "react";
import { User } from "firebase/auth";
import Image from "next/image.js";
import { getCurrentDate, getUserData } from "@/app/utilsFn/utilsFn";
import Button from "@/app/components/utils/Button";
import { FirebaseError } from "firebase/app";

interface CreatePostFormProps {
  user: User;
}

const CreatePostForm: FC<CreatePostFormProps> = ({ user }) => {
  const [caption, setCaption] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [postCreated, setPostCreated] = useState(false);

  useEffect(() => {
    const checkPost = async () => {
      const postsRef = collection(firestore, "posts");
      const q = query(
        postsRef,
        where("userId", "==", user.uid),
        where("dateStr", "==", getCurrentDate(new Date()))
      );
      const querySnap = await getDocs(q);
      setPostCreated(!querySnap.empty ? true : false);
    };
    checkPost();
  }, [setPostCreated, user]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg(
        "File size is too large. Please upload a file smaller than 5mb."
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    setFile(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
      "image/gif": [],
    },
  });

  const uploadImage = async (file: File, userId: string) => {
    const storageRef = ref(storage, `posts/${userId}/${file.name}`);
    try {
      const snap = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snap.ref);
      console.log("file uploaded successfully", downloadURL);
      return downloadURL;
    } catch (e: unknown) {
      if (e instanceof FirebaseError) {
        console.error("error uploading file", e.message);
      }
      throw new Error("file upload failed");
    }
  };
  const createPost = async (
    userId: string,
    imageURL: string,
    caption: string
  ) => {
    try {
      const date: Date = new Date();
      await addDoc(collection(firestore, "posts"), {
        username: user.displayName,
        userId,
        imageURL,
        caption,
        createdAt: date,
        dateStr: getCurrentDate(date),
      });

      setPostCreated(true);
    } catch (e) {
      console.error("error creating a post", e.message);
    }
  };

  const updateUserData = async (user: User) => {
    if (user.isAnonymous) return;
    try {
      const res = await getUserData(user);
      if (res === null) return;
      const { points, streak, lastPostDate, userDocRef } = res;
      const currentDate = new Date();

      const timeDiff = lastPostDate
        ? currentDate.getTime() - lastPostDate.toDate().getTime()
        : 0;
      const dayDiff = timeDiff / (1000 * 3600 * 24);

      const newStreak =
        lastPostDate === null ? 1 : dayDiff <= 1 ? streak + 1 : 1;
      const newPoints =
        points +
        1 +
        (newStreak === 3 ? 3 : 0) +
        (newStreak === 10 ? 10 : 0) +
        (newStreak === 50 ? 20 : 0) +
        (newStreak === 100 ? 50 : 0);

      await updateDoc(userDocRef, {
        points: newPoints,
        streak: newStreak,
        lastPostDate: currentDate,
      });
      console.log("got here successfully");
    } catch (e) {
      console.error("error happened", e.message);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!preview) {
      setErrorMsg("Please select a file");
      return;
    }
    const userId = user.uid;
    try {
      const imageUrl = await uploadImage(file, userId);
      await createPost(userId, imageUrl, caption);
      await updateUserData(user);
    } catch (e) {
      console.error(e);
    }
  };
  return !postCreated ? (
    <section className="p-8 bg-white rounded-lg min-w-[360px]">
      <form
        className="flex flex-col gap-4 rounded-lg"
        onSubmit={handleCreatePost}
      >
        <h2 className="font-bold text-4xl">Create Post</h2>
        <div>
          <label htmlFor="caption">Caption: </label>
          <input
            className="w-full block p-2 border-black border rounded-lg mt-2"
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image upload">Upload Image: </label>
          <div {...getRootProps()} className="w-[220px]">
            <input {...getInputProps()} />
            {preview ? (
              <Image
                src={preview}
                alt="preview"
                width={300}
                height={300}
                layout="intrinsic"
                className="max-w-[300px] cursor-pointer mt-2"
              />
            ) : (
              <p
                className={`p-4 border border-dashed w-full ${
                  errorMsg
                    ? "border-red-500 text-red-500"
                    : "border-black text-black"
                } mt-2 cursor-pointer w-3/5 text-center flex flex-col justify-center items-center rounded-lg min-h-[112px]`}
              >
                <Image
                  src="/image-upload.svg"
                  width={30}
                  height={30}
                  alt="image upload icon"
                  style={{
                    filter:
                      errorMsg &&
                      "invert(23%) sepia(96%) saturate(7056%) hue-rotate(350deg) brightness(73%) contrast(120%)",
                  }}
                />
                {errorMsg ? (
                  <span>Please drag here or click on an image</span>
                ) : isDragActive ? (
                  <span>Drop the files here ...</span>
                ) : (
                  <span>Drag an image here, or click to add image</span>
                )}
              </p>
            )}
          </div>
        </div>
        <Button
          type="submit"
          className="bg-black text-white btn-hover w-fit pt-2 pb-2 pl-4 pr-4 rounded-lg mt-3"
        >
          Post
        </Button>
      </form>
    </section>
  ) : (
    <div className="p-8 bg-white md:rounded-lg min-w-[360px] h-[300px] rounded-tl-lg">
      <h2 className="font-bold text-4xl">Create Post</h2>
      <p className="mt-4">You already posted today. Come back tomorrow :)</p>
    </div>
  );
};

export default CreatePostForm;
