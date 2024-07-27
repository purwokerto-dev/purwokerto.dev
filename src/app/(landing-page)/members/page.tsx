import MemberList from "@/components/blocks/member-list";
import SectionHeader from "@/components/templates/section-header";

export default function Members() {
  return (
    <SectionHeader
      className="mt-12 md:mt-16"
      title="Daftar Member"
      description="Daftar semua member">
      <MemberList limit={"all"} />
    </SectionHeader>
  );
}
