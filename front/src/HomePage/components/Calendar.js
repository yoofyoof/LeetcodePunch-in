import React from "react";
// eslint-disable-next-line no-unused-vars
import Modal from "react-modal";
import { useState } from "react";
import { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import AddEventModal from "./AddEventModal.js";
import moment from "moment";
import PropTypes from "prop-types";

function Calendar(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);
  const onEventAdded = async (event) => {
    console.log("onEventAdded");
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent({
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
      title: event.title,
    });
    handleEventAdd(event);
    // for delay
    // eslint-disable-next-line no-unused-vars
    const res = await fetch("/get_data", { method: "GET" });
    // eslint-disable-next-line no-unused-vars
    const data = await res.json();
    //for delay
    handleChange();

    handleRankChange(event);
  };

  function handleChange() {
    props.onChange();
  }

  const updateRank = async () => {
    const username = localStorage.getItem("current-user");
    // eslint-disable-next-line no-unused-vars
    const res = await fetch("/update_rank", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username }),
    });
  };

  async function handleRankChange(event) {
    updateRank();
    // eslint-disable-next-line no-unused-vars
    const res = await fetch("/get_data", { method: "GET" });
    // eslint-disable-next-line no-unused-vars
    const data = await res.json();
    props.onRankChange();
  }

  async function handleEventAdd(data) {
    //console.log("check data");
    //console.log(data);
    const username = localStorage.getItem("current-user");
    // eslint-disable-next-line no-unused-vars
    const res = await fetch("/create-event", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        date: data.start,
        title: data.title,
      }),
    });
  }

  async function handleDatesSet() {
    console.log("is it loaded");
    const username = localStorage.getItem("current-user");
    const res = await fetch("/get-events", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    });
    const data = await res.json();
    console.log(data);
    setEvents(data);
  }

  return (
    <section>
      <button onClick={() => setModalOpen(true)}>
        Punch-in completed Question
      </button>
      <div style={{ position: "relative", zIndex: 0 }}>
        <FullCalendar
          ref={calendarRef}
          events={events}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          datesSet={(date) => handleDatesSet(date)}
        />
      </div>
      <AddEventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onEventAdded={(event) => onEventAdded(event)}
      />
    </section>
  );
}
Calendar.propTypes = {
  onChange: PropTypes.func.isRequired,
  onRankChange: PropTypes.func.isRequired,
};

export default Calendar;
