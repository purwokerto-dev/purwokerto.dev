import EventRegistrationsUser from "@/components/blocks/event-registrations-user";
import SectionHeader from "@/components/templates/section-header";

export default async function MyEvensPage() {
  return (
    <SectionHeader
      className="mt-12 md:mt-16"
      title="My Events"
      description="Event yang saya ikuti">
      <EventRegistrationsUser />
    </SectionHeader>
  );
}
