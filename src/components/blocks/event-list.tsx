import Button from "../fragments/button";

const EventList = () => {
  return (
    <div className="mt-2">
      <span>Belum ada event yang sedang berlangsung🥲</span>

      <div className="flex justify-center">
        <Button text="Lihat Semua Events" variant="outline" className="mt-4" />
      </div>
    </div>
  );
};

export default EventList;
