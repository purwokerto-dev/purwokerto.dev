"use client";

import { useState } from "react";
import axios from "axios";

export default function DashboardAddEventsPage() {
  const [eventBody, setEventBody] = useState({
    title: "",
    place: "",
    dateTime: 0,
    quota: "",
    duration: 0,
    description: "",
    map: "",
    fee: 0,
    hidden: true,
  });
  const [bannerBase64, setBannerBase64] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBannerBase64(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    setEventBody((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/events", {
        title: eventBody.title,
        place: eventBody.place,
        dateTime: eventBody.dateTime,
        quota: parseInt(eventBody.quota),
        duration: parseInt(eventBody.duration),
        description: eventBody.description,
        banner: bannerBase64,
        map: eventBody.map,
        fee: parseInt(eventBody.fee),
        hidden: true,
      });

      alert(res.data.data);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      {JSON.stringify(eventBody)}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="title" name="title" value={eventBody.title} onChange={handleChange} />
        <br />
        <input type="text" placeholder="place" name="place" value={eventBody.place} onChange={handleChange} />
        <br />
        <input type="datetime-local" placeholder="dateTime" name="dateTime" value={eventBody.dateTime} onChange={handleChange} />
        <br />
        <input type="text" placeholder="quota" name="quota" value={eventBody.quota} onChange={handleChange} />
        <br />
        <input type="number" placeholder="duration" name="duration" value={eventBody.duration} onChange={handleChange} />
        <br />
        <input type="text" placeholder="description" name="description" value={eventBody.description} onChange={handleChange} />
        <br />
        <input type="file" placeholder="banner" name="banner" accept=".png, .jpg, .jpeg, .svg" onChange={handleFileChange} />
        {bannerBase64 && <div>{bannerBase64}</div>}
        <br />
        <input type="text" placeholder="map" name="map" value={eventBody.map} onChange={handleChange} />
        <br />
        <input type="number" placeholder="fee" name="fee" value={eventBody.fee} onChange={handleChange} />
        <br />
        hidden
        {/* <input type="checkbox" placeholder="hidden" name="hidden" value={eventBody.hidden} onChange={handleChange} /> */}
        <br />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
