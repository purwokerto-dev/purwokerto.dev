import RSVPButton from "@/components/blocks/RSVP-button";
import { axiosInstance } from "@/lib/axiosInstance";
import Image from "next/image";

async function getEventRegistartions(eventId: string) {
  try {
    const res = await axiosInstance.get(
      `/api/eventregistrations?idEvent=${eventId}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

type User = {
  id: string;
  name: string;
  email: string;
  image: string | null;
};

type Event = {
  erUser: User;
  rsvp_link: string;
};

export default async function EventRegistrationsPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const users = await getEventRegistartions(searchParams.eventId);

  return (
    <div>
      <div className="flex flex-col">
        <div className="relative text-gray-500 focus-within:text-gray-900 mb-4">
          <h2 className="text-2xl font-bold dark:text-white">
            List User Participant Event {searchParams.eventId}
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
                  {users.map((event: Event) => (
                    <tr
                      key={event?.erUser?.id}
                      className="bg-white hover:bg-gray-50 dark:bg-gray-800">
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium ">
                        {event?.erUser?.id}
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium">
                        {event?.erUser?.name}
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium">
                        {event?.erUser?.email}
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium">
                        <Image
                          src={event.erUser?.image ? event.erUser?.image : ""}
                          width={100}
                          height={100}
                          alt={event.erUser?.name}
                        />
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-1">
                          <RSVPButton
                            userId={event?.erUser?.id}
                            eventId={searchParams.eventId}
                          />
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
