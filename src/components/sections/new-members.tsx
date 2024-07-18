import Link from "next/link";
import MemberList from "../blocks/member-list";
import SectionHeader from "../templates/section-header";
import { buttonVariant } from "../fragments/button";

const NewMembers = () => {
  return (
    <SectionHeader
      className="mt-24"
      title="Member Terbaru"
      description="Daftar dan menjadi bagian Purwokerto Dev">
      <h2 className="text-3xl font-semibold"></h2>
      <MemberList />
      <div className="flex justify-center">
        <Link href="/events" className={buttonVariant.outline}>
          Lihat Semua Events
        </Link>
      </div>
    </SectionHeader>
  );
};

export default NewMembers;
