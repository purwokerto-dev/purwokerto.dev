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
            <div key={badge.id} className="flex flex-col items-center group">
              <Image
                src={badge.img ? badge.img : ""}
                width={100}
                height={100}
                className="rounded-lg group-hover:scale-110 transition-all"
                alt={badge.title}
              />
              <small>{badge.totalPoints} poin</small>
              <p className="text-center mt-2 font-bold">{badge.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BadgesUser;
