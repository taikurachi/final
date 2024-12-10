import GalleryPage from "../components/gallery/GalleryPage";
import Header from "../components/utils/Header";
import { FC } from "react";

const Gallery: FC = () => {
  return (
    <div className="flex items-start">
      <Header />
      <GalleryPage />
    </div>
  );
};

export default Gallery;
