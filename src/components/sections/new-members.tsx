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
      <MemberList limit={10} />
      <div className="flex justify-center">
        <Link href="/members" className={buttonVariant.outline}>
          Lihat Semua Member
        </Link>
      </div>
    </SectionHeader>
  );
};

export default NewMembers;
