const axios = require("axios");

const FLW_SECRET = process.env.FLW_SECRET_KEY;

exports.createVirtualAccount = async ({ email, amount, tx_ref }) => {
  try {
    const response = await axios.post(
      "https://api.flutterwave.com/v3/virtual-account-numbers",
      {
        email,
        is_permanent: false, // per transaction
        tx_ref,
        amount,
        narration: "Cinema Ticket Payment"
      },
      {
        headers: {
          Authorization: `Bearer ${FLW_SECRET}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.data;

  } catch (error) {
    console.error(error.response?.data || error.message);
    throw new Error("Failed to create virtual account");
  }
};