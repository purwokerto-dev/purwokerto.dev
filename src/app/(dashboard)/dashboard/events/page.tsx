import DeleteEvent from "@/components/blocks/delete-event";
import MapEvent from "@/components/blocks/map-event";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/fragments/tooltip";
import { axiosInstance } from "@/lib/axiosInstance";
import { formatDate } from "@/lib/formatDate";
import { Award, PencilIcon, ScanEye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function getEvents() {
  try {
    const res = await axiosInstance.get("/api/events");
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

type Event = {
  id: string;
  banner: string | null;
  title: string;
  place: string;
  quota: string;
  duration: number | null;
  map: string;
  fee: number | null;
  hidden: boolean;
  dateTime: string;
  description: string;
};

export default async function DashboardEventsPage() {
  const events = await getEvents();

  return (
    <div>
      <div className="flex flex-col">
        <div className="relative text-gray-500 focus-within:text-gray-900 mb-4">
          <h2 className="text-2xl font-bold dark:text-white">List Event</h2>
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
                      Quota
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left text-sm leading-6 font-semibold capitalize">
                      Place
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left text-sm leading-6 font-semibold capitalize">
                      Date Time
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left text-sm leading-6 font-semibold capitalize">
                      Duration
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left text-sm leading-6 font-semibold capitalize">
                      Description
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left text-sm leading-6 font-semibold capitalize">
                      Banner
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left text-sm leading-6 font-semibold capitalize">
                      Map
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left text-sm leading-6 font-semibold capitalize">
                      Fee
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left text-sm leading-6 font-semibold capitalize">
                      Hidden
                    </th>
                    <th
                      scope="col"
                      className="p-5 text-left text-sm leading-6 font-semibold capitalize rounded-tr-xl">
                      Action (On progress)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300 dark:divide-gray-600 dark:border dark:border-t-0 dark:border-gray-600">
                  {events.map((event: Event) => (
                    <tr
                      key={event?.id}
                      className="bg-white hover:bg-gray-50 dark:bg-gray-800">
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium ">
                        {event?.id}
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium">
                        {event?.title}
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium">
                        {event?.quota}
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium">
                        {event?.place}
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium">
                        {formatDate(event?.dateTime)}
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium truncate ...">
                        {event?.duration} Jam
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium">
                        {event?.description}
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium">
                        <Image
                          src={event.banner ? event.banner : ""}
                          width={100}
                          height={100}
                          alt={event.title}
                        />
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium">
                        <MapEvent value={event.map} height={100} width={200} />
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium">
                        {event?.fee}
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium">
                        {event?.hidden ? "TRUE" : "FALSE"}
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-1">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Link
                                  href={`/dashboard/events/eventregistrations?eventId=${event.id}`}>
                                  <ScanEye />
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>See Participant</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Link
                                  href={`/dashboard/events/eventbadges?eventId=${event.id}`}>
                                  <Award />
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>See Badge</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <PencilIcon />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Edit Event</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <DeleteEvent eventId={event.id} />
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
