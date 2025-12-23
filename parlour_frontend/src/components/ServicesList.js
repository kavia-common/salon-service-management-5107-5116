import React, { useEffect, useState } from "react";
import axios from "axios";

/**
 * PUBLIC_INTERFACE
 * Renders the list of parlour services (public).
 */
function ServicesList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3001/services")
      .then(res => {
        setServices(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="container" style={{ maxWidth: 750, margin: "2rem auto" }}>
      <h1 style={{ color: "#3b82f6", fontWeight: 700, marginBottom: 12, fontSize: "2rem" }}>Our Services</h1>
      {loading && <div style={{ marginTop: 30 }}>Loading...</div>}
      {!loading && !services.length && <div style={{ marginTop: 30 }}>No services available.</div>}
      {!loading && services.length > 0 && (
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {services.map(service => (
            <div key={service.id} style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: "1.25rem 1.5rem",
              boxShadow: "0px 2px 7px 0px #3b82f61a"
            }}>
              <h2 style={{ fontWeight: 600, fontSize: 23, color: "#06b6d4" }}>{service.name}</h2>
              <div style={{ color: "#64748b", fontSize: 15 }}>{service.description}</div>
              <div style={{ marginTop: 12, fontWeight: 500, color: "#111", fontSize: 16 }}>
                ₹{service.price}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ServicesList;
