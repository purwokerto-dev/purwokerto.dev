import EventList from "@/components/blocks/event-list";
import SectionHeader from "@/components/templates/section-header";

export default function Events() {
  return (
    <SectionHeader
      className="mt-12 md:mt-16"
      title="Daftar Event"
      description="Daftar dan ikuti event yang akan berlangsung">
      <EventList />
    </SectionHeader>
  );
}
