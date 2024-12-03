import React, { useState } from "react";
import EventSearch from "../components/EventSearch";
import EventDetails from "../components/EventDetails";
import CreateEvent from "../components/CreateEvent";

const EventsPage = () => {
  const [view, setView] = useState("search"); // "search", "details", "create"

  const renderView = () => {
    switch (view) {
      case "details":
        return <EventDetails eventId={1} />;
      case "create":
        return <CreateEvent />;
      default:
        return <EventSearch />;
    }
  };

  return (
    <div>
      <nav className="p-4 bg-gray-100 flex gap-4">
        <button onClick={() => setView("search")}>Search Events</button>
        <button onClick={() => setView("create")}>Create Event</button>
      </nav>
      <div>{renderView()}</div>
    </div>
  );
  
};

export default EventsPage;
