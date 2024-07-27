import BadgesUser from "@/components/blocks/badges-user";
import SectionHeader from "@/components/templates/section-header";

export default async function MyBadgesPage() {
  return (
    <SectionHeader
      className="mt-12 md:mt-16"
      title="My Badges"
      description="Badge yang saya miliki">
      <BadgesUser />
    </SectionHeader>
  );
}
