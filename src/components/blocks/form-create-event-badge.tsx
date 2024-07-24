"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "../fragments/input";
import Button from "../fragments/button";
import { useToast } from "../fragments/use-toast";
import { useRouter } from "next/navigation";

export function FormCreateEventBadge() {
  const { toast } = useToast();
  const navigate = useRouter();
  const [eventBadgeBody, setEventBadgeBody] = useState({
    eventId: "",
    badgeId: "",
    userId: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    setEventBadgeBody((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post("/api/eventbadges", {
        event: eventBadgeBody.eventId,
        badge: eventBadgeBody.badgeId,
        speaker: eventBadgeBody.userId,
      });

      setEventBadgeBody({
        eventId: "",
        badgeId: "",
        userId: "",
      });

      navigate.push("/dashboard/events");

      return toast({
        title: "Berhasil",
        description: `Anda berhasil create events badge`,
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast({
          title: "Error",
          description: error.response?.data?.message || error.message,
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred.",
        });
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="eventId" className="font-semibold">
            Event Id <span className="text-red-500">*</span>
          </label>
          <Input
            required
            id="eventId"
            type="text"
            placeholder="eventId"
            name="eventId"
            className=""
            value={eventBadgeBody.eventId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="badgeId" className="font-semibold">
            Badge Id <span className="text-red-500">*</span>
          </label>
          <Input
            required
            id="badgeId"
            type="text"
            placeholder="badgeId"
            name="badgeId"
            className=""
            value={eventBadgeBody.badgeId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="userId" className="font-semibold">
            Speaker <span className="text-red-500">*</span>
          </label>
          <Input
            required
            id="userId"
            type="text"
            placeholder="userId"
            name="userId"
            className=""
            value={eventBadgeBody.userId}
            onChange={handleChange}
          />
        </div>
        <div>
          <Button type="submit" text="Submit" variant="bg" />
        </div>
      </form>
    </div>
  );
}
