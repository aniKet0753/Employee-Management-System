import React from "react";

export default function LandingPage() {
  const styles = {
    container: { minHeight: "100vh", fontFamily: "Arial, sans-serif", backgroundColor: "#f5f5f5", color: "#333" },
    nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 40px", backgroundColor: "#fff", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" },
    navLinks: { display: "flex", gap: "20px" },
    button: { backgroundColor: "#2563eb", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "8px", cursor: "pointer" },
    hero: { textAlign: "center", padding: "80px 20px" },
    section: { padding: "60px 20px", textAlign: "center" },
    featuresGrid: { display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" },
    card: { backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)", width: "250px" },
    footer: { backgroundColor: "#111", color: "#fff", textAlign: "center", padding: "15px" }
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.nav}>
        <h2>EmpManage</h2>
        <div style={styles.navLinks}>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <button style={styles.button}>Get Started</button>
      </nav>

      {/* Hero */}
      <section style={styles.hero}>
        <h1>Employee Management System</h1>
        <p>Manage employees, attendance, and payroll in one simple platform.</p>
        <br />
        <button style={styles.button}>Start Now</button>
      </section>

      {/* Features */}
      <section id="features" style={styles.section}>
        <h2>Features</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.card}>
            <h3>Employee Records</h3>
            <p>Store and manage all employee details easily.</p>
          </div>
          <div style={styles.card}>
            <h3>Attendance</h3>
            <p>Track daily attendance and working hours.</p>
          </div>
          <div style={styles.card}>
            <h3>Payroll</h3>
            <p>Automate salary and payment processing.</p>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" style={styles.section}>
        <h2>About</h2>
        <p>This project helps companies manage employees efficiently and reduce manual work.</p>
      </section>

      {/* Contact */}
      <section id="contact" style={styles.section}>
        <h2>Contact</h2>
        <p>Email: support@empmanage.com</p>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2026 EmpManage</p>
      </footer>
    </div>
  );
}
