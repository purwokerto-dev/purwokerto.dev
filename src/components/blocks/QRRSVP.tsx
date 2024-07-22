"use client";
import QR from "../fragments/QR";

const QRRSVP = ({ rsvplink }: { rsvplink: string }) => {
  const baseUrl = window.location.origin;

  return (
    <div className="bg-white p-4">
      <QR text={`${baseUrl}${rsvplink}`} />
    </div>
  );
};

export default QRRSVP;
