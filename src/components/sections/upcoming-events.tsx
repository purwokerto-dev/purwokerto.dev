import Link from "next/link";
import EventList from "../blocks/event-list";
import { buttonVariant } from "../fragments/button";
import SectionHeader from "../templates/section-header";

const UpcomingEvents = () => {
  return (
    <SectionHeader
      className="mt-24"
      title="Event Yang Akan Berlangsung"
      description="Daftar dan ikuti event yang akan berlangsung">
      <EventList active={true} />
      <div className="flex justify-center">
        <Link href="/events" className={buttonVariant.outline}>
          Lihat Semua Events
        </Link>
      </div>
    </SectionHeader>
  );
};

export default UpcomingEvents;
