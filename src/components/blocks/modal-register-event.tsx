"use client";

import { FC, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../fragments/alert-dialog";
import { buttonVariant } from "../fragments/button";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/formatDate";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useToast } from "../fragments/use-toast";
import { useRouter } from "next/navigation";

interface ModalRegisterEventI {
  id: string;
  title: string;
  place: string;
  dateTime: string | Date;
  description: string | null;
}

export const ModalRegisterEvent: FC<ModalRegisterEventI> = ({
  id,
  title,
  place,
  dateTime,
}) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { data }: any = useSession();
  const navigate = useRouter();

  const registerEvent = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/eventregistrations", {
        user: data?.user?.id,
        event: id,
      });
      setLoading(false);

      if (response.status === 201) {
        toast({
          title: "Berhasil",
          description: `Anda berhasil melakukan registrasi pada event ${title}`,
        });
        return navigate.push(`/my-events/${response.data.id}`);
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 400) {
        toast({
          title: "Gagal",
          description: `Anda sudah melakukan registrasi pada event ${title}`,
        });
      }
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="fixed top-0 bottom-0 right-0 left-0 bg-black/80 z-[9999] flex items-center justify-center text-xl text-white">
          Loading ...
        </div>
      ) : null}
      <AlertDialog>
        <AlertDialogTrigger className={cn(buttonVariant.bg, "mt-4")}>
          Daftar Event
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-gradient-to-br from-white to-gray-100 dark:from-primary dark:to-[#141f2a] dark:border-gray-600">
          <AlertDialogHeader>
            <AlertDialogTitle className="capitalize text-xl">
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              Apakah anda yakin ingin melakukan pendaftaran event{" "}
              <span className="font-bold capitalize">{title}</span> yang
              berlokasi di <span className="font-bold">{place}</span> pada{" "}
              <span className="font-bold">{formatDate(dateTime)}</span>.
              <p className="mt-4 font-semibold">Syarat dan ketentuan</p>
              <ul className="list-disc ml-5">
                <li>
                  Peserta diharapkan hadir tepat waktu dan mengikuti seluruh
                  rangkaian acara.
                </li>
                <li>
                  Untuk informasi lebih lanjut, peserta dapat menghubungi
                  panitia melalui email{" "}
                  <a
                    className="text-blue-400"
                    href="mailto:developerpurwokerto@gmail.com">
                    developerpurwokerto@gmail.com
                  </a>{" "}
                  DM instagram{" "}
                  <a
                    className="text-blue-400"
                    href="https://www.instagram.com/purwokerto.dev/"
                    target="_blank">
                    @purwokerto.dev
                  </a>{" "}
                  atau{" "}
                  <a
                    className="text-blue-400"
                    href="https://chat.whatsapp.com/LG1fUoUOk2G5tFqoY82GCF"
                    target="_blank">
                    Whatsapp Komunitas
                  </a>
                </li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className={cn(buttonVariant.danger, "capitalize")}>
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={registerEvent}
              className={cn(buttonVariant.outline, "capitalize")}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
