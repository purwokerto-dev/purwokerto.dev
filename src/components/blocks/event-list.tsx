import { buttonVariant } from "../fragments/button";
import Image from "next/image";
import { formatDate } from "@/lib/formatDate";
import Link from "next/link";
import { fetchEvents } from "@/app/api/events/fetchEvents";
import { Event } from '@prisma/client';

async function getEvents(active: boolean) {
  try {
    const res = await fetchEvents(5, active);
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

const EventList = async ({ active }: { active: boolean }) => {
  const events = await getEvents(active);

  return (
    <div className="mt-2">
      {events && events.length === 0 ? (
        <span className="mb-4 block text-center font-bold">
          Belum ada event yang sedang berlangsung🥲
        </span>
      ) : (
        <div className="mt-10">
          {events && events.map((event: Event) => (
            <div
              key={event.id}
              className="mx-auto mb-6 bg-gradient-to-br from-white to-gray-100 dark:from-primary dark:to-[#141f2a] rounded-lg border dark:border-gray-600 overflow-hidden w-full flex flex-col md:flex-row md:items-start">
              <div className="basis-2/5">
                <Image
                  width={500}
                  height={500}
                  alt={event?.title}
                  className="object-cover h-full"
                  src={event?.banner !== null ? event?.banner : "/img2.jpg"}
                />
              </div>
              <div className="basis-3/5 px-4 pt-4 pb-6">
                <h3 className="text-2xl capitalize font-semibold">
                  {event?.title}
                </h3>
                <div className="flex items-center gap-1 text-gray-600 dark:text-white mt-2">
                  <MapPinIcon className="w-5 h-5" />
                  <span>{event?.place}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600 dark:text-white mt-2">
                  <CalendarIcon className="w-5 h-5" />
                  <span>{formatDate(event?.dateTime)}</span>
                </div>
                <p className="mt-2 mb-8 text-slate-600 dark:text-white">
                  {event?.description}
                </p>
                <div>
                  <Link
                    href={`/events/${event?.id}`}
                    className={buttonVariant.bg}>
                    Detail Event
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;

function MapPinIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}
