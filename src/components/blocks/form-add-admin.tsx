"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "../fragments/input";
import Button from "../fragments/button";
import { useToast } from "../fragments/use-toast";
import { useRouter } from "next/navigation";

export function FormAddAdmin() {
  const { toast } = useToast();
  const navigate = useRouter();
  const [eventBody, setEventBody] = useState({
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    setEventBody((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post("/api/admins", {
        email: eventBody.email,
      });

      setEventBody({
        email: "",
      });

      navigate.push("/dashboard/admin-settings");

      return toast({
        title: "Berhasil",
        description: `Admin berhasil ditambahkan`,
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
          <label htmlFor="email" className="font-semibold">
            Email <span className="text-red-500">*</span>
          </label>
          <Input
            required
            id="email"
            type="text"
            placeholder="email"
            name="email"
            className=""
            value={eventBody.email}
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
