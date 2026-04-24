// utils/share.js
export function buildWhatsAppMessage({ groom, bride, date, venue, link }) {
  return `💍 *${groom} & ${bride}*

You are invited to our wedding 🎉

📅 *${date}*
📍 ${venue}

Join us:
${link}`;
}
export function shareWhatsApp(message) {
  const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
