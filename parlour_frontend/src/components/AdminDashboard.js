import React, { useState, useEffect } from "react";
import axios from "axios";

/**
 * PUBLIC_INTERFACE
 * Admin Dashboard – manages services (CRUD) and bookings.
 * Protected: token required.
 */
function AdminDashboard({ onLogout, token }) {
  const api = axios.create({
    baseURL: "http://localhost:3001",
    headers: { Authorization: `Bearer ${token}` }
  });

  // Service Management State
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [serviceMsg, setServiceMsg] = useState("");
  // Booking Management State
  const [bookings, setBookings] = useState([]);
  const [bookingMsg, setBookingMsg] = useState("");
  const [tab, setTab] = useState("services");
  const [loading, setLoading] = useState(false);

  // Fetch services and bookings
  const fetchServices = () => api.get("/admin/services").then(res => setServices(res.data));
  const fetchBookings = () => api.get("/admin/appointments").then(res => setBookings(res.data));

  useEffect(() => {
    fetchServices();
    fetchBookings();
    // eslint-disable-next-line
  }, []);

  // CRUD operations
  const handleAddOrEdit = async (e) => {
    e.preventDefault();
    setServiceMsg("");
    setLoading(true);
    try {
      if (editingId) {
        await api.put(`/admin/services/${editingId}`, {
          name: serviceName, description: desc, price: Number(price)
        });
        setServiceMsg("Service updated.");
      } else {
        await api.post("/admin/services", {
          name: serviceName, description: desc, price: Number(price)
        });
        setServiceMsg("Service added.");
      }
      setServiceName(""); setDesc(""); setPrice(""); setEditingId(null);
      await fetchServices();
    } catch (err) {
      setServiceMsg("Error: " + (err.response?.data?.detail || "Failed."));
    }
    setLoading(false);
  };

  const handleEdit = (service) => {
    setEditingId(service.id);
    setServiceName(service.name);
    setDesc(service.description);
    setPrice(service.price);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    setLoading(true);
    try {
      await api.delete(`/admin/services/${id}`);
      setServiceMsg("Service deleted.");
      await fetchServices();
    } catch (err) {
      setServiceMsg("Error deleting service.");
    }
    setLoading(false);
  };

  const handleBookingDelete = async (id) => {
    setLoading(true);
    setBookingMsg("");
    try {
      await api.delete(`/admin/appointments/${id}`);
      setBookingMsg("Booking deleted.");
      await fetchBookings();
    } catch {
      setBookingMsg("Delete failed.");
    }
    setLoading(false);
  };

  return (
    <section className="container" style={{ maxWidth: 920, margin: "2rem auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h1 style={{ color: "#3b82f6", fontWeight: 700, fontSize: "2rem" }}>Admin Dashboard</h1>
        <button
          className="btn"
          style={{ background: "#EF4444", color: "#fff", borderRadius: 7, fontWeight: 500, border: "none", padding: "7px 18px" }}
          onClick={onLogout}
        >Logout</button>
      </div>
      <div style={{ display: "flex", gap: "2rem", marginBottom: 20 }}>
        <button className={`btn${tab === "services" ? " btn-active" : ""}`} style={{
          background: tab === "services" ? "#3b82f6" : "#e5e7eb",
          color: tab === "services" ? "#fff" : "#3b82f6",
          fontWeight: 600,
          padding: "8px 20px",
          border: "none",
          borderRadius: 7,
          cursor: "pointer"
        }} onClick={() => setTab("services")}>Services</button>
        <button className={`btn${tab === "bookings" ? " btn-active" : ""}`} style={{
          background: tab === "bookings" ? "#06b6d4" : "#e5e7eb",
          color: tab === "bookings" ? "#fff" : "#06b6d4",
          fontWeight: 600,
          padding: "8px 20px",
          border: "none",
          borderRadius: 7,
          cursor: "pointer"
        }} onClick={() => setTab("bookings")}>Bookings</button>
      </div>
      {tab === "services" &&
        <div>
          <h2 style={{ color: "#111", fontSize: 20, marginTop: 7, fontWeight: 500 }}>Manage Services</h2>
          <form onSubmit={handleAddOrEdit} style={{ background: "#f9fafb", padding: "1.7rem", borderRadius: 10, marginBottom: 13, marginTop: 10 }}>
            <div style={{ display: "flex", gap: "1.1rem", alignItems: "end" }}>
              <div style={{ flex: 1 }}>
                <label>
                  Name<br />
                  <input required value={serviceName} onChange={e => setServiceName(e.target.value)} style={{ width: "100%", border: "1px solid #cbd5e1", padding: 7, borderRadius: 6 }} />
                </label>
              </div>
              <div style={{ flex: 2 }}>
                <label>
                  Description<br />
                  <input required value={desc} onChange={e => setDesc(e.target.value)} style={{ width: "100%", border: "1px solid #cbd5e1", padding: 7, borderRadius: 6 }} />
                </label>
              </div>
              <div style={{ flex: 1 }}>
                <label>
                  Price<br />
                  <input required type="number" min="0" value={price} onChange={e => setPrice(e.target.value)} style={{ width: "100%", border: "1px solid #cbd5e1", padding: 7, borderRadius: 6 }} />
                </label>
              </div>
              <button
                type="submit"
                className="btn"
                style={{
                  background: "#3b82f6",
                  color: "#fff",
                  border: "none",
                  fontWeight: 600,
                  borderRadius: 7,
                  padding: "8px 18px"
                }}
                disabled={loading}
              >
                {editingId ? "Update" : "Add"}
              </button>
            </div>
            {serviceMsg && <div style={{ color: serviceMsg.startsWith("Error") ? "#EF4444" : "#06b6d4", marginTop: 10 }}>{serviceMsg}</div>}
          </form>
          <div style={{ marginTop: 18 }}>
            {services.length === 0 && <div>No services found.</div>}
            {services.length > 0 && (
              <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1.2rem" }}>
                <thead>
                  <tr style={{ background: "#f1f5f9" }}>
                    <th style={{ padding: "8px", textAlign: "left", color: "#64748b" }}>Name</th>
                    <th style={{ padding: "8px", textAlign: "left", color: "#64748b" }}>Description</th>
                    <th style={{ padding: "8px", textAlign: "left", color: "#64748b" }}>Price</th>
                    <th style={{ padding: "8px", color: "#64748b" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map(service => (
                    <tr key={service.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                      <td style={{ padding: "8px" }}>{service.name}</td>
                      <td style={{ padding: "8px" }}>{service.description}</td>
                      <td style={{ padding: "8px" }}>₹{service.price}</td>
                      <td style={{ padding: "8px" }}>
                        <button onClick={() => handleEdit(service)} style={{
                          background: "#06b6d4", color: "#fff", borderRadius: 6, border: "none", padding: "4.5px 15px", marginRight: 7, cursor: "pointer"
                        }}>Edit</button>
                        <button onClick={() => handleDelete(service.id)} style={{
                          background: "#EF4444", color: "#fff", borderRadius: 6, border: "none", padding: "4.5px 15px", cursor: "pointer"
                        }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      }
      {tab === "bookings" &&
        <div>
          <h2 style={{ color: "#111", fontSize: 20, marginTop: 7, fontWeight: 500 }}>All Bookings</h2>
          <div style={{ marginTop: 18 }}>
            {bookings.length === 0 && <div>No bookings found.</div>}
            {bookings.length > 0 && (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f1f5f9" }}>
                    <th style={{ padding: "8px", color: "#64748b" }}>Name</th>
                    <th style={{ padding: "8px", color: "#64748b" }}>Contact</th>
                    <th style={{ padding: "8px", color: "#64748b" }}>Service</th>
                    <th style={{ padding: "8px", color: "#64748b" }}>Date</th>
                    <th style={{ padding: "8px", color: "#64748b" }}>Time</th>
                    <th style={{ padding: "8px", color: "#64748b" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                      <td style={{ padding: "8px" }}>{b.name}</td>
                      <td style={{ padding: "8px" }}>{b.contact}</td>
                      <td style={{ padding: "8px" }}>{b.service_name || b.service}</td>
                      <td style={{ padding: "8px" }}>{b.date}</td>
                      <td style={{ padding: "8px" }}>{b.time}</td>
                      <td style={{ padding: "8px" }}>
                        <button onClick={() => handleBookingDelete(b.id)} style={{
                          background: "#EF4444", color: "#fff", borderRadius: 6, border: "none", padding: "5px 14px", cursor: "pointer"
                        }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {bookingMsg && <div style={{ color: bookingMsg.startsWith("Delete") ? "#EF4444" : "#06b6d4", marginTop: 10 }}>{bookingMsg}</div>}
          </div>
        </div>
      }
    </section>
  );
}

export default AdminDashboard;
