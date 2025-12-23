import React from "react";

/**
 * PUBLIC_INTERFACE
 * Contact Information Page (public)
 */
function ContactPage() {
  // Static placeholder contact info for the parlour
  return (
    <section className="container" style={{ maxWidth: 550, margin: "2.2rem auto" }}>
      <h2 style={{ color: "#3b82f6", fontWeight: 700, marginBottom: 18, fontSize: "2rem" }}>Contact Us</h2>
      <div style={{
        background: "#fff",
        padding: "2rem",
        borderRadius: 13,
        boxShadow: "0 2px 9px #3b82f62a"
      }}>
        <p style={{ marginBottom: 10 }}>
          <strong>Parlour HQ</strong><br />
          123 Modern Lane, City Center, Yourtown 101001<br />
          India
        </p>
        <div style={{ marginBottom: 7 }}>
          <b>Phone:</b> <a href="tel:+911234567890" style={{ color: "#06b6d4" }}>+91 12345 67890</a>
        </div>
        <div>
          <b>Email:</b> <a href="mailto:info@parlour.com" style={{ color: "#06b6d4" }}>info@parlour.com</a>
        </div>
        <div style={{ marginTop: 24, color: "#64748b" }}>
          Open: Mon–Sat 9:00–19:00
        </div>
      </div>
    </section>
  );
}
export default ContactPage;
