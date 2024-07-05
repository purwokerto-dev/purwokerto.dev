import EventList from "../blocks/event-list";

const UpcomingEvents = () => {
  return (
    <div className="container-base mt-24 xl:px-28">
      <h2 className="text-3xl font-semibold">Event Yang Akan Berlangsung</h2>
      <EventList />
    </div>
  );
};

export default UpcomingEvents;
