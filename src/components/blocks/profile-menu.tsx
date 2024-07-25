import { signOut } from "next-auth/react";
import Image from "next/image";
import { FC, useState } from "react";
import Separator from "../fragments/separator";
import Link from "next/link";
import { axiosInstance } from "@/lib/axiosInstance";

interface ProfileMenuPropsI {
  name: string;
  profileImg: string;
  isAdmin: boolean;
  isDashboard?: boolean;
}

const ProfileMenu: FC<ProfileMenuPropsI> = ({
  name,
  profileImg,
  isAdmin,
  isDashboard = false,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className="relative flex">
      <button
        onClick={() => setShowProfileMenu(!showProfileMenu)}
        className="w-10 h-10 rounded-full overflow-hidden active:border-2 active:border-gray-800 transition">
        <Image src={profileImg} alt="img" width={200} height={200} />
      </button>
      {showProfileMenu ? (
        <div className="bg-white/90 dark:bg-primary/90 rounded-xl w-56 absolute top-14 right-0 border dark:border-gray-600 shadow-lg flex flex-col overflow-hidden">
          <div className="flex flex-col">
            <div className="px-3 group py-3 cursor-pointer flex items-center gap-2">
              <Image
                src={profileImg}
                alt="img"
                width={200}
                height={200}
                className="w-10 h-10 rounded-full border"
              />
              <p className="font-semibold group-hover:underline">{name}</p>
            </div>
            <div className="px-3 group py-3 cursor-pointer">
              <Link href="/my-events" className="group-hover:underline">My Events</Link>
            </div>
            <div className="px-3 group py-3 cursor-pointer">
              <Link href="/my-badges" className="group-hover:underline">My Badges</Link>
            </div>

            {isAdmin ? (
              isDashboard ? (
                <>
                  <Separator />
                  <Link href="/" className="px-3 group py-4 cursor-pointer">
                    <p className="group-hover:underline">Homepage</p>
                  </Link>
                </>
              ) : (
                <>
                  <Separator />
                  <Link
                    href="/dashboard"
                    className="px-3 group py-4 cursor-pointer">
                    <p className="group-hover:underline">Dashboard Admin</p>
                  </Link>
                </>
              )
            ) : null}
            <Separator />
            <button
              onClick={async () => {
                await signOut();
                await axiosInstance.get(
                  `/api/httpcookies?op=logout`
                );
                window.location.href = '/';
              }}
              className="py-2 flex gap-2 items-center justify-center transition hover:bg-red-500 hover:text-white font-semibold m-2 rounded-lg">
              Keluar
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-log-out">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1={21} x2={9} y1={12} y2={12} />
              </svg>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileMenu;
