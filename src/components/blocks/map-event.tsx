import React from "react";

const MapEvent = ({
  value,
  height = 450,
  width = 600,
}: {
  value: string;
  height?: number;
  width?: number;
}) => {
  return (
    <iframe
      src={`https://maps.google.com/maps?q=${value}&z=16&output=embed`}
      height={height}
      width={width}
      className="mx-auto mt-4 w-full rounded-md"></iframe>
  );
};

export default MapEvent;
