import MapEvent from "@/components/blocks/map-event";
import { ModalRegisterEvent } from "@/components/blocks/modal-register-event";
import { axiosInstance } from "@/lib/axiosInstance";
import { formatDate } from "@/lib/formatDate";
import Image from "next/image";

async function getEventById(id: string) {
  try {
    const res = await axiosInstance.get(`/api/events/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function getEventBadgeById(idEvent: string) {
  try {
    const res = await axiosInstance.get(`/api/eventbadges?idEvent=${idEvent}`);

    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default async function EventById({
  params,
}: {
  params: { id: string };
}) {
  const event = await getEventById(params.id);
  const eventBadges = await getEventBadgeById(params.id);

  return (
    <div className="container-base xl:px-52 mt-4 h-full">
      <div className="rounded-xl overflow-hidden">
        <div>
          <Image
            width={800}
            height={800}
            alt={event?.title}
            className="object-cover h-96 w-full"
            src={event?.banner !== null ? event?.banner : "/img2.jpg"}
          />
        </div>
        <div className="py-4 md:py-8 text-gray-800">
          <h1 className="text-2xl md:text-4xl font-bold capitalize dark:text-white">
            {event?.title}
            <button className="relative w-[93px] ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-wiggle text-blue-800 dark:text-blue-300">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1={12} x2={12} y1={2} y2={15} />
              </svg>

              <div className="px-1 bg-blue-500 font-normal rounded-full text-center text-white text-sm absolute -top-2 -end-2">
                Share Event
                <div className="absolute top-0 start-0 rounded-full -z-10 animate-ping bg-blue-200 w-full h-full" />
              </div>
            </button>
          </h1>
          <div className="flex items-center gap-1 text-gray-600 dark:text-white mt-2">
            <CalendarIcon className="w-5 h-5" />
            <span>{formatDate(event?.dateTime)}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600 dark:text-white mt-2">
            <MapPinIcon className="w-5 h-5" />
            <span>{event?.place}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600 dark:text-white mt-2">
            <Fee className="w-5 h-5" />
            <span>
              {event?.fee === 0 || event?.fee === null
                ? "Gratis"
                : `Rp.${event?.fee?.toLocaleString("id")}`}
            </span>
          </div>
          <div className="text-gray-600 dark:text-white mt-2">
            <p className="text-xl">Event Badges</p>
            {eventBadges.map((eventBadge: any) => (
              <ul key={eventBadge.id}>
                <li>Title: {eventBadge.ebBadge.title}</li>
                <li>Description: {eventBadge.ebBadge.description}</li>
                <li>
                  Badge:{" "}
                  <Image
                    src={eventBadge.ebBadge.img}
                    alt={eventBadge.ebBadge.title}
                    width={200}
                    height={200}
                  />
                </li>
              </ul>
            ))}
          </div>
          <p className="text-base mt-4 dark:text-white">{event?.description}</p>
          <ModalRegisterEvent
            id={event.id}
            dateTime={event.dateTime}
            title={event.title}
            description={event.description}
            place={event.place}
          />
          <MapEvent value={event?.map} />
        </div>
      </div>
    </div>
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
function Fee(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx={12} cy={12} r={10} />
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
      <path d="M12 18V6" />
    </svg>
  );
}
