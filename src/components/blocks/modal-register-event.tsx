"use client";

import { FC } from "react";
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
  const { data }: any = useSession();

  const registerEvent = async () => {
    try {
      const response = await axios.post("/api/eventregistrations", {
        user: data?.user?.id,
        event: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
            <span className="font-bold capitalize">{title}</span> yang berlokasi
            di <span className="font-bold">{place}</span> pada{" "}
            <span className="font-bold">{formatDate(dateTime)}</span>.
            <p className="mt-4 font-semibold">Syarat dan ketentuan</p>
            <ul className="list-disc ml-5">
              <li>Lorem ipsum dolor sit.</li>
              <li>Lorem ipsum dolor sit.</li>
              <li>Lorem ipsum dolor sit.</li>
              <li>Lorem ipsum dolor sit.</li>
              <li>Lorem ipsum dolor sit.</li>
              <li>Lorem ipsum dolor sit.</li>
              <li>Lorem ipsum dolor sit.</li>
              <li>Lorem ipsum dolor sit.</li>
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className={cn(buttonVariant.danger, "capitalize")}>
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
  );
};
