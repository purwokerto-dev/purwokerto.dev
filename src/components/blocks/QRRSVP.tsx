"use client";
import { useEffect, useState } from "react";
import QR from "../fragments/QR";

const QRRSVP = ({ rsvplink }: { rsvplink: string }) => {
  const [baseUrl, setBaseUrl] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);

  if (!baseUrl) return null;

  return <QR text={`${baseUrl}${rsvplink}`} />;
};

export default QRRSVP;
