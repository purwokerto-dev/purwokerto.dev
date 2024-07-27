import { axiosInstance } from "@/lib/axiosInstance";
import { headers } from "next/headers";

async function rsvpLink(idUser: string, idEvent: string) {
  try {
    const res = await axiosInstance.get(
      `/api/rsvp?user=${idUser}&event=${idEvent}`,
      { headers: { cookie: headers().get("cookie") } }
    );

    if (res.status === 200) {
      return "Thank you for attending the event!";
    }
  } catch (error: any) {
    console.log(error.message);

    if (error.response.status === 400) {
      const er: string = error.response.data.error
        ? error.response.data.error
        : "Event not found";
      return er;
    }

    if (error.response.status === 403) {
      return "RSVP Dilakukan pada saat dilokasi oleh panitia.";
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
