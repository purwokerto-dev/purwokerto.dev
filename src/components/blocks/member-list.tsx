import Button from "../fragments/button";

const MemberList = () => {
  return (
    <div className="mt-2">
      <span>Belum ada member</span>

      <div className="flex justify-center">
        <Button text="Lihat Semua Member" variant="outline" className="mt-4" />
      </div>
    </div>
  );
};

export default MemberList;
