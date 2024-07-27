"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "../fragments/input";
import Button from "../fragments/button";
import { useToast } from "../fragments/use-toast";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../fragments/select";

export function FormCreateEventBadge() {
  const { toast } = useToast();
  const navigate = useRouter();
  const [dropdownList, setDropdownList] = useState({
    events: [],
    badges: [],
    users: [],
  });

  const [eventBadgeBody, setEventBadgeBody] = useState({
    eventId: "",
    badgeId: "",
    userId: "",
  });

  async function getEvents() {
    try {
      const { data } = await axios.get("/api/events?limit=100&open=true");
      setDropdownList((prev) => ({ ...prev, events: data }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function getBadges() {
    try {
      const { data } = await axios.get("/api/badges");

      setDropdownList((prev) => ({ ...prev, badges: data }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function getUsers() {
    try {
      const { data } = await axios.get("/api/users");
      setDropdownList((prev) => ({ ...prev, users: data }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getBadges();
    getEvents();
    getUsers();
  }, []);

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
            Event <span className="text-red-500">*</span>
          </label>
          <Select
            name="eventId"
            value={eventBadgeBody.eventId}
            onValueChange={(value) =>
              setEventBadgeBody((prev) => ({ ...prev, eventId: value }))
            }>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Event" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-primary">
              <SelectGroup>
                {dropdownList.events?.map((event: any) => (
                  <SelectItem
                    key={event.id}
                    className="cursor-pointer"
                    value={event.id}>
                    {event.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="badgeId" className="font-semibold">
            Badge <span className="text-red-500">*</span>
          </label>
          <Select
            name="badgeId"
            value={eventBadgeBody.badgeId}
            onValueChange={(value) =>
              setEventBadgeBody((prev) => ({ ...prev, badgeId: value }))
            }>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Badge" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-primary">
              <SelectGroup>
                {dropdownList.badges?.map((badge: any) => (
                  <SelectItem
                    key={badge.id}
                    className="cursor-pointer"
                    value={badge.id}>
                    {badge.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="userId" className="font-semibold">
            Speaker <span className="text-red-500">*</span>
          </label>
          <Select
            name="userId"
            value={eventBadgeBody.userId}
            onValueChange={(value) =>
              setEventBadgeBody((prev) => ({ ...prev, userId: value }))
            }>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Speaker" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-primary">
              <SelectGroup>
                {dropdownList.users?.map((user: any) => (
                  <SelectItem
                    key={user.id}
                    className="cursor-pointer"
                    value={user.id}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Button type="submit" text="Submit" variant="bg" />
        </div>
      </form>
    </div>
  );
}
