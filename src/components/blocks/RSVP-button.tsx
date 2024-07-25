"use client";
import React, { FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../fragments/tooltip";
import { UserCheck } from "lucide-react";
import axios from "axios";
import { useToast } from "../fragments/use-toast";

interface RSVPButtonI {
  eventId: string;
  userId: string;
}

const RSVPButton: FC<RSVPButtonI> = ({ eventId, userId }) => {
  const { toast } = useToast();

  const handleRSVP = async () => {
    try {
      const res = await axios.get(`/api/rsvp?user=${userId}&event=${eventId}`);

      if (res.status === 200) {
        return toast({
          title: "Berhasil",
          description: `RSVP Berhasil`,
        });
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
          <UserCheck />
        </TooltipTrigger>
        <TooltipContent>
          <p>RSVP</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RSVPButton;
