require('dotenv').config();
const axios = require('axios');

async function testSms() {
  console.log("Sender ID:", process.env.SENDER_ID);
  console.log("VAS_KEY:", process.env.VAS_KEY);

  const payload = {
    type: 1,
    messages: [
      {
        to: process.env.RECEIVER_NUMBER,
        message: "This is a test SMS from Moolre API",
        senderid: process.env.SENDER_ID
      }
    ]
  };

  try {
    const res = await axios.post(
      "https://api.moolre.com/open/sms/send",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-VASKEY": process.env.VAS_KEY
        }
      }
    );
    console.log(res.data);
  } catch (err) {
    console.log(err.response ? err.response.data : err.message);
  }
}

testSms();
