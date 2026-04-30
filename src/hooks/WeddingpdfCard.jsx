import React from "react";
import logo from "/images/aglogo.png";

export default function WeddingPdfCard({ guestName }) {
    const primary = "#1C1917";
    const gold = "#C6A15B";
    const muted = "#78716C";
    const border = "#E7E5E4";

    // 📅 Calendar file generator


    return (
        <div
            id="invite-pdf"
            style={{
                width: "500px",
                backgroundColor: "#FCFAF7",
                color: primary,
                padding: "50px 45px",
                fontFamily: "'Playfair Display', serif",
                textAlign: "center",
                border: `1px solid ${border}`,
                boxSizing: "border-box",
            }}
        >
            {/* LOGO */}
            <img
                src={logo}
                alt="A ✦ G"
                style={{
                    width: "50px",
                    display: "block",
                    margin: "0 auto 10px auto",
                }}
            />

            {/* TITLE */}
            <p
                style={{
                    fontSize: "11px",
                    letterSpacing: "0.5em",
                    textTransform: "uppercase",
                    color: muted,
                    marginBottom: "30px",
                }}
            >
                Wedding Invitation
            </p>

            {/* NAMES */}
            <h1 style={{ fontSize: "38px", fontWeight: "400", margin: 0 }}>
                George
            </h1>

            <p style={{ color: gold, margin: "8px 0px", fontStyle: "italic" }}>
                &amp;
            </p>

            <h1 style={{ fontSize: "38px", fontWeight: "400", marginBottom: "20px" }}>
                Ann Mary
            </h1>

            {/* INVITE TEXT */}
            <p
                style={{
                    fontSize: "13px",
                    color: muted,
                    lineHeight: "1.8",
                    marginBottom: "35px",
                    padding: "0 10px",
                }}
            >
                Request the pleasure of your company as we celebrate
                the beginning of our new journey together
            </p>

            {/* DATE */}
            <a
                href="https://www.google.com/calendar/event?action=TEMPLATE&text=George%20%26%20Ann%20Mary%20Wedding&dates=20260610T093000Z/20260610T133000Z&details=Join%20us%20for%20the%20wedding%20celebration&location=Thrissur%2C%20Kerala"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    fontSize: "11px",
                    color: muted,
                    textDecoration: "underline",
                    cursor: "pointer",
                    marginBottom: "25px",
                    display: "inline-block",
                }}
            >
                <p
                    style={{
                        fontSize: "22px",
                        color: gold,
                        fontWeight: "500",
                        marginBottom: "5px",
                    }}
                >
                    June 10, 2026 <br /> Wednesday
                </p>
            </a>


            {/* EVENTS */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "40px",
                    fontSize: "12px",
                }}
            >
                <div style={{ width: "48%" }}><a
                    href="https://www.google.com/maps/search/?api=1&query=Our+Lady+of+Lourdes+Cathedral+Thrissur"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: muted, textDecoration: "none" }}
                >
                    <p style={{ letterSpacing: "0.2em", color: muted }}>
                        HOLY MATRIMONY
                    </p>
                    <p style={{ fontWeight: "600" }}>3:00 PM</p>

                    <p style={{ color: muted }}>

                        Our Lady of Lourdes Cathedral
                        <br />
                        Thrissur

                    </p></a>
                </div>

                <div style={{ width: "48%" }}>
                    <a
                        href="https://www.google.com/maps/search/?api=1&query=Jeevs+Square+Convention+Pattikkad"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: muted, textDecoration: "none" }}
                    >
                        <p style={{ letterSpacing: "0.2em", color: muted }}>
                            RECEPTION
                        </p>
                        <p style={{ fontWeight: "600" }}>6:00 PM</p>

                        <p style={{ color: muted }}>

                            Jeev’s Square Convention
                            <br />
                            Pattikkad

                        </p></a>
                </div>
            </div>

            {/* GUEST */}
            <div
                style={{
                    borderTop: `1px solid ${border}`,
                    paddingTop: "10px",
                }}
            >
                <p
                    style={{
                        fontSize: "10px",
                        letterSpacing: "0.3em",
                        color: muted,
                    }}
                >
                    RESERVED FOR
                </p>

                <h2
                    style={{
                        fontSize: "22px",
                        fontStyle: "italic",
                        marginTop: "3px",
                    }}
                >
                    {guestName || "Our Valued Guest"}
                </h2>
            </div>
        </div>
    );
}