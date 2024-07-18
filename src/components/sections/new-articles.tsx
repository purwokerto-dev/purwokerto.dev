import Link from "next/link";
import ArticleList from "../blocks/aricle-list";
import SectionHeader from "../templates/section-header";
import { buttonVariant } from "../fragments/button";

const NewArticles = () => {
  return (
    <SectionHeader
      className="mt-24"
      title="Artikel Terbaru"
      description="Tingkatkan literasi dengan membaca artikel">
      <ArticleList />
      <div className="flex justify-center">
        <Link href="/events" className={buttonVariant.outline}>
          Lihat Semua Events
        </Link>
      </div>
    </SectionHeader>
  );
};

export default NewArticles;
