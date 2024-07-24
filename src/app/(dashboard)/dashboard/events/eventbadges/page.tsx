import { axiosInstance } from "@/lib/axiosInstance";
import { EyeIcon, PencilIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

async function getEventBadgesByEventId(eventId: string) {
  try {
    const res = await axiosInstance.get(`api/eventbadges?idEvent=${eventId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

type Badge = {
  id: string;
  img: string | null;
  title: string;
  description: string;
  ebBadge: any;
};

export default async function DashboardEventBadgesPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const badges = await getEventBadgesByEventId(searchParams.eventId);

  return (
    <div>
      <div className="flex flex-col">
        <div className="relative text-gray-500 focus-within:text-gray-900 mb-4">
          <h2 className="text-2xl font-bold dark:text-white">
            List Badges Event Id {searchParams.eventId}
          </h2>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden ">
              <table className=" min-w-full rounded-xl">
                <thead>
                  <tr className="bg-gray-50 dark:bg-primary dark:text-white">
                    <th
                      scope="col"
                      className="p-5 text-left text-sm leading-6 font-semibold capitalize rounded-tl-lg">
                      ID
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left text-sm leading-6 font-semibold capitalize">
                      Title
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left text-sm leading-6 font-semibold capitalize">
                      Image
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left text-sm leading-6 font-semibold capitalize">
                      Description
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left text-sm leading-6 font-semibold capitalize rounded-tr-xl">
                      Action (On progress)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300 dark:divide-gray-600 dark:border dark:border-t-0 dark:border-gray-600">
                  {badges.map((badge: Badge) => (
                    <tr
                      key={badge?.id}
                      className="bg-white hover:bg-gray-50 dark:bg-gray-800">
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium ">
                        {badge?.id}
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium">
                        {badge?.ebBadge?.title}
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium">
                        {badge?.ebBadge?.description}
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium">
                        <Image
                          src={
                            badge?.ebBadge?.img
                              ? badge?.ebBadge?.img.startsWith("/")
                                ? badge?.ebBadge?.img
                                : `/${badge?.ebBadge?.img}`
                              : ""
                          }
                          width={100}
                          height={100}
                          alt={badge?.ebBadge?.title}
                        />
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-1">
                          <button className="p-2  rounded-full  group transition-all duration-500  flex item-center">
                            <EyeIcon />
                          </button>
                          <button className="p-2  rounded-full  group transition-all duration-500  flex item-center">
                            <PencilIcon />
                          </button>
                          <button className="p-2 rounded-full  group transition-all duration-500  flex item-center">
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
