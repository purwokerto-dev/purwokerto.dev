import { axiosInstance } from "@/lib/axiosInstance";

async function getEvents() {
  try {
    const res = await axiosInstance.get("/api/events?limit=5&open=true");
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

export default async function DashboardEventsPage() {
  const events = await getEvents();

  return (
    <div>
      {events.map((event: Event) => (
        <div key={event.id}>
          {JSON.stringify(event)}
          <br />
          <button>Edit</button>
          <button>Delete</button>
        </div>
      ))}
    </div>
  );
}
