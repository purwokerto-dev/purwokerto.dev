import { axiosInstance } from "@/lib/axiosInstance";
import { headers } from "next/headers"

async function rsvpLink(idUser: string, idEvent: string) {
  try {
    const res = await axiosInstance.get(
      `/api/rsvp?user=${idUser}&event=${idEvent}`, { headers: { cookie: headers().get('cookie') } }
    );

    if (res.status === 200) {
      return "Thank you for attending the event!";
    }
    console.log(res);
  } catch (error: any) {
    console.log(error.message);

    if (error.response.status === 400) {
      return "Event not found";
    }

    if (error.response.status === 403) {
      return "Access unauthorized";
    }
  }
}

export default async function StatusRSVPPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const data = await rsvpLink(searchParams.userId, searchParams.eventId);

  return <div className="container-base xl:px-52 mt-4 h-full">{data}</div>;
}
