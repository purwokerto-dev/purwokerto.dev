"use client";
import React, { FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../fragments/tooltip";
import { CheckCircle, UserCheck } from "lucide-react";
import axios from "axios";
import { useToast } from "../fragments/use-toast";
import { useRouter } from "next/navigation";

interface RSVPButtonI {
  eventId: string;
  userId: string;
  attend: boolean;
}

const RSVPButton: FC<RSVPButtonI> = ({ eventId, userId, attend }) => {
  const navigate = useRouter();
  const { toast } = useToast();

  const handleRSVP = async () => {
    try {
      const res = await axios.get(`/api/rsvp?user=${userId}&event=${eventId}`);

      if (res.status === 200) {
        toast({
          title: "Berhasil",
          description: `RSVP Berhasil`,
        });

        return navigate.refresh();
      }
    } catch (error: any) {
      console.log(error.message);

      if (error.response.status === 400) {
        return toast({
          title: "Gagal",
          description: `RSVP Event tidak tersedia`,
        });
      }

      if (error.response.status === 403) {
        return toast({
          title: "Gagal",
          description: `Access unauthorized`,
        });
      }
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger onClick={handleRSVP}>
          {attend ? <CheckCircle /> : <UserCheck />}
        </TooltipTrigger>
        <TooltipContent>
          <p>RSVP</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RSVPButton;
