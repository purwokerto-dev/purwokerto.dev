import EventList from "../blocks/event-list";

const UpcomingEvents = () => {
  return (
    <div className="container-base mt-24 xl:px-28">
      <h2 className="text-4xl font-extrabold text-center ">
        Event Yang Akan Berlangsung
      </h2>
      <p className="text-center mt-1">
        Daftar dan ikuti event yang akan berlangsung
      </p>
      <EventList />
    </div>
  );
};

export default UpcomingEvents;
