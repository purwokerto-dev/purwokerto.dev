import React from "react";

const MapEvent = ({ value }: { value: string }) => {
  return (
    <iframe
      src={`http://maps.google.com/maps?q=${value}&z=16&output=embed`}
      height="450"
      width="600"
      className="mx-auto mt-4 w-full rounded-md"></iframe>
  );
};

export default MapEvent;
