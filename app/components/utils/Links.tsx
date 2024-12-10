import { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface LinksProps {
  path: string;
  type: string;
  text: string;
}

const Links: FC<LinksProps> = ({ path, type, text }) => {
  const router = useRouter();
  const goTo = (path: string) => router.push(path);
  return (
    <li
      onClick={() => goTo(path)}
      className="font-bold cursor-pointer flex gap-4 items-center"
    >
      <Image
        src={`/${type}.svg`}
        width={30}
        height={30}
        alt={`${type} image`}
      />
      <span className="hidden lg:block">{text}</span>
    </li>
  );
};

export default Links;
