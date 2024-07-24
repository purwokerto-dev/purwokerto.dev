"use client";
import QR from "../fragments/QR";

const QRRSVP = ({ rsvplink }: { rsvplink: string }) => {
  const baseUrl = window.location.origin;

  return <QR text={`${baseUrl}${rsvplink}`} />;
};

export default QRRSVP;
