import { axiosInstance } from "@/lib/axiosInstance";
import { getCurrentUser } from "@/lib/session";

async function getUserBadges(idUser: string) {
  try {
    const res = await axiosInstance.get(`/api/userbadges?user=${idUser}`);

    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default async function MyBadgesPage() {
  const session = await getCurrentUser();

  const userBadges = await getUserBadges(session?.user?.id);

  return (
    <div className="container-base xl:px-52 mt-4">
      my badges <br />
      {!userBadges ? "no data" : JSON.stringify(userBadges)}
    </div>
  );
}
