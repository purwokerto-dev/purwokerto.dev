"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "../fragments/input";
import { Textarea } from "../fragments/textarea";
import Image from "next/image";
import Button from "../fragments/button";
import { useToast } from "../fragments/use-toast";

export function FormCreateEvent() {
  const { toast } = useToast();
  const [eventBody, setEventBody] = useState({
    title: "",
    place: "",
    dateTime: "",
    quota: "",
    duration: "",
    description: "",
    map: "",
    fee: "",
    hidden: false,
  });
  const [bannerBase64, setBannerBase64] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBannerBase64(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    setEventBody((prev) => ({ ...prev, [name]: value }));
  };

  const convertToUnixEpoch = (dateTime: string | number) => {
    if (!dateTime) {
      alert("Please enter a valid date and time.");
      return;
    }

    const date = new Date(dateTime);
    const unixEpochTime = Math.floor(date.getTime() / 1000);
    return unixEpochTime;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post("/api/events", {
        title: eventBody.title,
        place: eventBody.place,
        dateTime: convertToUnixEpoch(eventBody.dateTime),
        quota: parseInt(eventBody.quota),
        duration: parseInt(eventBody.duration),
        description: eventBody.description,
        banner: bannerBase64,
        map: eventBody.map,
        fee: parseInt(eventBody.fee),
        hidden: eventBody.hidden,
      });

      setEventBody({
        title: "",
        place: "",
        dateTime: "",
        quota: "",
        duration: "",
        description: "",
        map: "",
        fee: "",
        hidden: false,
      });

      setBannerBase64("");

      return toast({
        title: "Berhasil",
        description: `Anda berhasil create event`,
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
          <label htmlFor="title" className="font-semibold">
            Title <span className="text-red-500">*</span>
          </label>
          <Input
            required
            id="title"
            type="text"
            placeholder="title"
            name="title"
            className=""
            value={eventBody.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="place" className="font-semibold">
            Place <span className="text-red-500">*</span>
          </label>
          <Input
            required
            id="place"
            type="text"
            placeholder="place"
            name="place"
            className=""
            value={eventBody.place}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="dateTime" className="font-semibold">
            Date Time <span className="text-red-500">*</span>
          </label>
          <Input
            required
            id="dateTime"
            type="datetime-local"
            placeholder="dateTime"
            name="dateTime"
            value={eventBody.dateTime}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="quota" className="font-semibold">
            Quota
          </label>
          <Input
            id="quota"
            type="number"
            placeholder="quota"
            name="quota"
            value={eventBody.quota}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="duration" className="font-semibold">
            Duration
          </label>
          <Input
            id="duration"
            type="number"
            placeholder="duration"
            name="duration"
            value={eventBody.duration}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description" className="font-semibold">
            Description
          </label>
          <Textarea
            id="description"
            placeholder="description"
            name="description"
            value={eventBody.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleChange(e as unknown as React.ChangeEvent<HTMLInputElement>)
            }
          />
        </div>
        <div>
          <label htmlFor="banner" className="font-semibold">
            Banner
          </label>
          <Input
            id="banner"
            type="file"
            placeholder="banner"
            name="banner"
            accept=".png, .jpg, .jpeg, .svg"
            onChange={handleFileChange}
          />
          {bannerBase64 && (
            <Image
              width={200}
              height={200}
              src={bannerBase64}
              alt="Banner preview"
            />
          )}
        </div>
        <div>
          <label htmlFor="map" className="font-semibold">
            Map
          </label>
          <Input
            id="map"
            type="text"
            placeholder="map"
            name="map"
            value={eventBody.map}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="fee" className="font-semibold">
            Fee
          </label>
          <Input
            id="fee"
            type="number"
            placeholder="fee"
            name="fee"
            value={eventBody.fee}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="hidden" className="font-semibold">
            Hidden
          </label>
          <input
            className="w-10 h-10"
            id="hidden"
            type="checkbox"
            placeholder="hidden"
            name="hidden"
            checked={eventBody.hidden}
            onChange={() =>
              setEventBody((prev) => ({ ...prev, hidden: !prev.hidden }))
            }
          />
        </div>
        <Button type="submit" text="Submit" variant="bg" />
      </form>
    </div>
  );
}
