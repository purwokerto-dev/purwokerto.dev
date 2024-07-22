import { axiosInstance } from "@/lib/axiosInstance";
import { buttonVariant } from "../fragments/button";
import Image from "next/image";
import { formatDate } from "@/lib/formatDate";
import Link from "next/link";
import { getCurrentUser } from "@/lib/session";

async function getEventsRegistrationsUser(idUser: string) {
  try {
    const res = await axiosInstance.get(
      `/api/eventregistrations?idUser=${idUser}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
}

type Event = {
  id: string;
  banner: string | null;
  title: string;
  place: string;
  dateTime: string;
  description: string;
};

const EventRegistrationsUser = async () => {
  const session: any = await getCurrentUser();
  const events = await getEventsRegistrationsUser(session?.user?.id);

  return (
    <div className="mt-2">
      {events.length === 0 ? (
        <span>Belum ada event yang sedang berlangsung🥲</span>
      ) : (
        <div className="mt-10">
          {events.map((event: Event) => (
            <div key={event.id}>
              <Link href={`/my-events/${event.id}`}>rsvp</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventRegistrationsUser;

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
