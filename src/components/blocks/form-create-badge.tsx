"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "../fragments/input";
import { Textarea } from "../fragments/textarea";
import Image from "next/image";
import Button from "../fragments/button";
import { useToast } from "../fragments/use-toast";
import { useRouter } from "next/navigation";

export function FormCreateBadge() {
  const { toast } = useToast();
  const navigate = useRouter();
  const [badgeBody, setBadgeBody] = useState({
    title: "",
    description: "",
  });
  const [imageBase64, setImageBase64] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageBase64(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    setBadgeBody((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post("/api/badges", {
        title: badgeBody.title,
        description: badgeBody.description,
        img: imageBase64,
      });

      setBadgeBody({
        title: "",
        description: "",
      });

      setImageBase64("");

      navigate.push("/dashboard/badges");

      return toast({
        title: "Berhasil",
        description: `Anda berhasil create badge`,
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
            value={badgeBody.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description" className="font-semibold">
            Description <span className="text-red-500">*</span>
          </label>
          <Textarea
            required
            id="description"
            placeholder="description"
            name="description"
            value={badgeBody.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleChange(e as unknown as React.ChangeEvent<HTMLInputElement>)
            }
          />
        </div>
        <div>
          <label htmlFor="image" className="font-semibold">
            image
          </label>
          <Input
            id="image"
            type="file"
            required
            placeholder="image"
            name="image"
            accept=".png, .jpg, .jpeg, .svg"
            onChange={handleFileChange}
          />
          {imageBase64 && (
            <Image
              width={200}
              height={200}
              src={imageBase64}
              alt="image preview"
            />
          )}
        </div>
        <div>
          <Button type="submit" text="Submit" variant="bg" />
        </div>
      </form>
    </div>
  );
}
