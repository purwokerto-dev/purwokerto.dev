import Link from "next/link";
import { FC } from "react";

interface SocialPropsI {
  type: string;
  url: string;
}

const Social: FC<SocialPropsI> = ({ type, url }) => {
  return (
    <>
      <Link href={url} target="_blank">
        {type === "instagram" ? (
          <div className="group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="dark:text-gray-200 inline-block transition-300 group-hover:text-gray-800 dark:group-hover:text-white">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>

            <span className="dark:text-gray-200 ml-1 transition-300 group-hover:text-gray-800 dark:group-hover:text-white">
              @purwokerto.dev
            </span>
          </div>
        ) : null}
      </Link>
    </>
  );
};

export default Social;
