import React, { useEffect, useState } from "react";
import axios from "axios";

/**
 * PUBLIC_INTERFACE
 * Appointment Booking Form (public)
 */
function BookingForm() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/services")
      .then(res => setServices(res.data)).catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");
    setLoading(true);
    try {
      await axios.post("http://localhost:3001/appointments", {
        name, contact, service_id: selectedService, date, time
      });
      setSuccessMsg("Appointment booked successfully! We look forward to seeing you.");
      setName("");
      setContact("");
      setDate("");
      setTime("");
      setSelectedService("");
    } catch (err) {
      setErrorMsg(
        err.response && err.response.data && err.response.data.detail
          ? err.response.data.detail
          : "Failed to book. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container" style={{ maxWidth: 500, margin: "2.2rem auto" }}>
      <h2 style={{ color: "#3b82f6", fontWeight: 700, marginBottom: 20, fontSize: "2rem" }}>Book an Appointment</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 2px 8px #3b82f62b",
          padding: "2rem 2rem"
        }}
      >
        <div className="form-item" style={{ marginBottom: 15 }}>
          <label style={{ color: "#111827", fontWeight: 500 }}>Name</label>
          <input
            required
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="input"
            autoComplete="name"
            style={{ width: "100%", border: "1px solid #cbd5e1", borderRadius: 7, padding: 8 }}
          />
        </div>
        <div className="form-item" style={{ marginBottom: 15 }}>
          <label style={{ color: "#111827", fontWeight: 500 }}>Contact Info</label>
          <input
            required
            type="text"
            value={contact}
            onChange={e => setContact(e.target.value)}
            className="input"
            autoComplete="tel"
            style={{ width: "100%", border: "1px solid #cbd5e1", borderRadius: 7, padding: 8 }}
          />
        </div>
        <div className="form-item" style={{ marginBottom: 15 }}>
          <label style={{ color: "#111827", fontWeight: 500 }}>Service</label>
          <select
            required
            value={selectedService}
            onChange={e => setSelectedService(e.target.value)}
            style={{ width: "100%", border: "1px solid #cbd5e1", borderRadius: 7, padding: 9 }}
          >
            <option value="" disabled>Select a service</option>
            {services.map(service =>
              <option key={service.id} value={service.id}>{service.name}</option>
            )}
          </select>
        </div>
        <div className="form-item" style={{ marginBottom: 15 }}>
          <label style={{ color: "#111827", fontWeight: 500 }}>Date</label>
          <input
            required
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            style={{ width: "100%", border: "1px solid #cbd5e1", borderRadius: 7, padding: 8 }}
          />
        </div>
        <div className="form-item" style={{ marginBottom: 15 }}>
          <label style={{ color: "#111827", fontWeight: 500 }}>Time</label>
          <input
            required
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            style={{ width: "100%", border: "1px solid #cbd5e1", borderRadius: 7, padding: 8 }}
          />
        </div>
        <button
          type="submit"
          className="btn"
          style={{
            backgroundColor: "#3b82f6",
            color: "#fff",
            border: "none",
            fontWeight: 600,
            borderRadius: 8,
            padding: "11px 0",
            width: "100%",
            marginTop: 10,
            transition: "background 0.25s"
          }}
          disabled={loading}
        >
          {loading ? "Booking..." : "Book"}
        </button>
        {successMsg && <div style={{ color: "#06b6d4", marginTop: 12 }}>{successMsg}</div>}
        {errorMsg && <div style={{ color: "#EF4444", marginTop: 12 }}>{errorMsg}</div>}
      </form>
    </section>
  );
}

export default BookingForm;
