import React from "react";

export default function WeddingPdfCard({ guestName }) {
  const primaryStone = "#1C1917";
  const accentRose = "#F43F5E";
  const mutedStone = "#78716C";
  const borderStone = "#D6D3D1";

  return (
    <div
      id="invite-pdf"
      style={{
        width: "500px",
        backgroundColor: "#FCFAF7",
        color: primaryStone,
        padding: "60px 45px",
        fontFamily: "'Georgia', serif",
        textAlign: "center",
        border: `1px solid ${borderStone}`,
        // Double border effect for a stationery look
        outline: `4px solid #FCFAF7`,
        outlineOffset: "-15px",
        boxShadow: "inset 0 0 0 1px #E7E5E4",
        boxSizing: "border-box",
        position: "relative"
      }}
    >
      {/* CORNER ACCENTS */}
      <div style={{ position: "absolute", top: "20px", left: "20px", fontSize: "12px", color: borderStone }}>✧</div>
      <div style={{ position: "absolute", top: "20px", right: "20px", fontSize: "12px", color: borderStone }}>✧</div>
      <div style={{ position: "absolute", bottom: "20px", left: "20px", fontSize: "12px", color: borderStone }}>✧</div>
      <div style={{ position: "absolute", bottom: "20px", right: "20px", fontSize: "12px", color: borderStone }}>✧</div>

      {/* HEADER */}
      <div style={{ marginBottom: "45px" }}>
        <p
          style={{
            fontSize: "10px",
            letterSpacing: "0.6em",
            textTransform: "uppercase",
            color: mutedStone,
            margin: 0,
          }}
        >
          The Wedding Invitation
        </p>
        <div
          style={{
            width: "40px",
            height: "1px",
            backgroundColor: accentRose,
            margin: "15px auto",
            opacity: 0.6
          }}
        />
      </div>

      {/* COUPLE NAMES */}
      <div style={{ marginBottom: "50px" }}>
        <h1
          style={{
            fontSize: "52px",
            fontStyle: "italic",
            fontWeight: "400",
            margin: 0,
            lineHeight: "1",
            fontFamily: "inherit"
          }}
        >
          George
        </h1>
        
        <div
          style={{
            fontSize: "18px",
            color: accentRose,
            margin: "15px 0",
            fontStyle: "italic",
            fontFamily: "serif",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div style={{ flex: 1, height: "1px", backgroundColor: borderStone, maxWidth: "30px" }} />
          <span style={{ margin: "0 15px" }}>and</span>
          <div style={{ flex: 1, height: "1px", backgroundColor: borderStone, maxWidth: "30px" }} />
        </div>

        <h1
          style={{
            fontSize: "52px",
            fontStyle: "italic",
            fontWeight: "400",
            margin: 0,
            lineHeight: "1",
          }}
        >
          Ann Mary
        </h1>
      </div>

      {/* INVITE TEXT */}
      <p
        style={{
          fontSize: "12px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#57534E",
          marginBottom: "40px",
          lineHeight: "1.8",
          padding: "0 20px"
        }}
      >
        Request the pleasure of your company <br />
        as they begin their life together
      </p>

      {/* DATE */}
      <div style={{ marginBottom: "40px" }}>
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: mutedStone,
            margin: "0 0 8px 0"
          }}
        >
          Save the Date
        </p>
        <p
          style={{
            fontSize: "22px",
            margin: 0,
            fontWeight: "500",
            borderBottom: `1px solid ${accentRose}`,
            display: "inline-block",
            paddingBottom: "5px"
          }}
        >
          June 10th, 2026
        </p>
      </div>

      {/* EVENTS GRID (Using Table for PDF Stability) */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "45px" }}>
        <tbody>
          <tr>
            <td style={{ width: "50%", borderRight: `1px solid ${borderStone}`, padding: "0 10px" }}>
              <p style={{ fontSize: "9px", letterSpacing: "0.25em", color: mutedStone, textTransform: "uppercase", marginBottom: "8px" }}>
                Holy Matrimony
              </p>
              <p style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 5px 0" }}>3:00 PM</p>
              <p style={{ fontSize: "11px", lineHeight: "1.6", color: "#44403C", margin: 0 }}>
                Our Lady of Lourdes Cathedral <br />
                Thrissur
              </p>
            </td>
            <td style={{ width: "50%", padding: "0 10px" }}>
              <p style={{ fontSize: "9px", letterSpacing: "0.25em", color: mutedStone, textTransform: "uppercase", marginBottom: "8px" }}>
                The Reception
              </p>
              <p style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 5px 0" }}>6:00 PM</p>
              <p style={{ fontSize: "11px", lineHeight: "1.6", color: "#44403C", margin: 0 }}>
                Jeev’s Square Convention <br />
                Pattikkad, Thrissur
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      {/* GUEST SECTION */}
      <div
        style={{
          padding: "30px 20px",
          border: `1px solid ${borderStone}`,
          backgroundColor: "#FDFBF8",
          position: "relative"
        }}
      >
        <p
          style={{
            fontSize: "9px",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: mutedStone,
            margin: "0 0 10px 0"
          }}
        >
          Reserved for
        </p>

        <h2
          style={{
            fontSize: "24px",
            margin: "0 0 5px 0",
            color: primaryStone,
            fontStyle: "italic",
            fontWeight: "400"
          }}
        >
          {guestName || "Our Valued Guest"}
        </h2>

      
      </div>

      {/* FOOTER */}
      <div
        style={{
          marginTop: "50px",
          fontSize: "10px",
          letterSpacing: "0.5em",
          textTransform: "uppercase",
          color: borderStone,
        }}
      >
        With Love • G ✦ A
      </div>
    </div>
  );
}