import Button from "../fragments/button";

const ArticleList = () => {
  return (
    <div className="mt-2">
      <span>Belum article terbaru🥲</span>

      <div className="flex justify-center">
        <Button text="Lihat Semua Article" variant="outline" className="mt-4" />
      </div>
    </div>
  );
};

export default ArticleList;
