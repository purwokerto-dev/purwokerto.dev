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
          <div className="group flex gap-2 items-center">
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
        {type === "youtube" ? (
          <div className="group flex gap-2 items-center">
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
              <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
              <path d="m10 15 5-3-5-3z" />
            </svg>

            <span className="dark:text-gray-200 ml-1 transition-300 group-hover:text-gray-800 dark:group-hover:text-white">
              @purwokertodev
            </span>
          </div>
        ) : null}
        {type === "linkedin" ? (
          <div className="group flex gap-2 items-center">
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
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>

            <span className="dark:text-gray-200 ml-1 transition-300 group-hover:text-gray-800 dark:group-hover:text-white">
              Purwokerto.Dev
            </span>
          </div>
        ) : null}
      </Link>
    </>
  );
};

export default Social;
