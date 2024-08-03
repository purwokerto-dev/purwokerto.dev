import { fetchUsers } from "@/app/api/users/fetchUsers";
import MapEvent from "@/components/blocks/map-event";
import { axiosInstance } from "@/lib/axiosInstance";
import { formatDate } from "@/lib/formatDate";
import { EyeIcon, PencilIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

async function getUsers() {
  try {
    const res = await fetchUsers();
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

type Event = {
  id: string;
  name: string;
  email: string;
  image: string | null;
};

export default async function DashboardUsersPage() {
  const users = await getUsers();

  return (
    <div>
      <div className="flex flex-col">
        <div className="relative text-gray-500 focus-within:text-gray-900 mb-4">
          <h2 className="text-2xl font-bold dark:text-white">List User</h2>
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
                      Name
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left text-sm leading-6 font-semibold capitalize">
                      Email
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left text-sm leading-6 font-semibold capitalize">
                      Profile
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left text-sm leading-6 font-semibold capitalize rounded-tr-xl">
                      Action (On progress)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300 dark:divide-gray-600 dark:border dark:border-t-0 dark:border-gray-600">
                  {users?.map((event: Event) => (
                    <tr
                      key={event?.id}
                      className="bg-white hover:bg-gray-50 dark:bg-gray-800">
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium ">
                        {event?.id}
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium">
                        {event?.name}
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium">
                        {event?.email}
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium">
                        <Image
                          src={event.image ? event.image : ""}
                          width={100}
                          height={100}
                          alt={event.name}
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
