import { fetchUsers } from "@/app/api/users/fetchUsers";
import Image from "next/image";

async function getMembers() {
  try {
    const res = await fetchUsers();
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

const MemberList = async ({ limit }: { limit: number | "all" }) => {
  const datas = await getMembers();
  const members = limit !== "all" ? (datas ?? []).slice(0, limit) : datas ?? [];

  return (
    <div className="mt-2">
      {members.length === 0 ? (
        <span className="mb-4 block text-center font-bold">
          Belum ada member
        </span>
      ) : (
        <div className="mt-10 mb-6 grid grid-cols-5 gap-5">
          {members.map((member: any) => (
            <div key={member.id} className="flex flex-col items-center group">
              <Image
                src={member.image ? member.image : ""}
                width={100}
                height={100}
                className="rounded-lg group-hover:scale-110 transition-all"
                alt={member.name}
              />
              <p className="text-center mt-2 font-bold">{member.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberList;
