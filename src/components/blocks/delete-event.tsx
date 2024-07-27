"use client";

import { Tooltip, TooltipProvider, TooltipTrigger } from "../fragments/tooltip";
import { TrashIcon } from "lucide-react";
import { TooltipContent } from "@radix-ui/react-tooltip";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "../fragments/use-toast";

const DeleteEvent = ({ eventId }: { eventId: string }) => {
  const navigate = useRouter();
  const { toast } = useToast();

  const handleDelete = async () => {
    if (!confirm("Yakin ingin menghapus")) {
      return null;
    }

    try {
      await axios.delete(`/api/events/${eventId}`);

      toast({
        title: "Berhasil",
        description: `Berhasil Delete Event`,
      });

      return navigate.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger onClick={handleDelete}>
            <TrashIcon />
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete Event</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default DeleteEvent;
