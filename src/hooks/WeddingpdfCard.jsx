import React from "react";
import logo from "/images/aglogo.png";

export default function WeddingPdfCard({ guestName }) {
    const primary = "#1C1917";
    const gold = "#C6A15B";
    const muted = "#78716C";
    const border = "#E7E5E4";

    return (
        <div
            id="invite-pdf"
            style={{
                width: "500px",
                backgroundColor: "#FCFAF7",
                color: primary,
                padding: "60px 45px",
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
                    margin: "0 auto 25px auto",
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
            <h1
                style={{
                    fontSize: "38px",
                    fontWeight: "400",
                    margin: 0,
                }}
            >
                George
            </h1>

            <p
                style={{
                    color: gold,
                    margin: "12px 0",
                    fontStyle: "italic",
                }}
            >
                &amp;
            </p>

            <h1
                style={{
                    fontSize: "38px",
                    fontWeight: "400",
                    marginBottom: "20px",
                }}
            >
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
            <p
                style={{
                    fontSize: "22px",
                    color: gold,
                    fontWeight: "500",
                    marginBottom: "35px",
                }}
            >
                June 10, 2026
            </p>

            {/* EVENTS */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "40px",
                    fontSize: "12px",
                }}
            >
                <div style={{ width: "48%" }}>
                    <p style={{ letterSpacing: "0.2em", color: muted }}>
                        HOLY MATRIMONY
                    </p>
                    <p style={{ fontWeight: "600" }}>3:00 PM</p>
                    <p style={{ color: muted }}>
                        Our Lady of Lourdes Cathedral
                        <br />
                        Thrissur
                    </p>
                </div>

                <div style={{ width: "48%" }}>
                    <p style={{ letterSpacing: "0.2em", color: muted }}>
                        RECEPTION
                    </p>
                    <p style={{ fontWeight: "600" }}>6:00 PM</p>
                    <p style={{ color: muted }}>
                        Jeev’s Square Convention
                        <br />
                        Pattikkad
                    </p>
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

            {/* FOOTER */}

        </div>
    );
}