export async function startPayment(userData, onSuccess) {
  const res = await fetch("https://premiumweddingcards.trato.in/api/payment/create-order", {
    method: "POST",
  });

  const order = await res.json();

  const options = {
    key: "YOUR_KEY_ID",
    amount: order.amount,
    currency: order.currency,
    name: "myINvitation",
    description: "Unlock Invitation Sharing",
    order_id: order.id,

    handler: function (response) {
      console.log("Payment success:", response);

      onSuccess(); // 🔥 continue flow
    },

    theme: {
      color: "#e11d48",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
}