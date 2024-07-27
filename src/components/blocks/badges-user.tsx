import { axiosInstance } from "@/lib/axiosInstance";
import Image from "next/image";
import { getCurrentUser } from "@/lib/session";

async function getUserBadges(idUser: string) {
  try {
    const res = await axiosInstance.get(`/api/userbadges?user=${idUser}`);

    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

const BadgesUser = async () => {
  const session = await getCurrentUser();
  const userBadges = await getUserBadges((session?.user as { id: string })?.id);

  return (
    <div className="mt-2">
      {userBadges.length === 0 ? (
        <span>Belum ada event yang kamu daftar🥲</span>
      ) : (
        <div className="mt-10 mb-6 grid grid-cols-5 gap-5">
          {userBadges.map((badge: any) => (
            <div key={badge.id} className="relative flex flex-col items-center group">
              <Image
                src={badge.img ? badge.img : ""}
                width={100}
                height={100}
                className="rounded-full transition-all border-2"
                alt={badge.title}
              />
              <small className="absolute top-0 left-1/2 transform -translate-x-1/2 font-bold bg-orange-500 text-black p-1 rounded-full flex items-center justify-center size-7 shadow-lg">{badge.totalPoints}</small>
              <p className="text-center mt-2 font-bold">{badge.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BadgesUser;
