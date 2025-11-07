require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

//   links index.html 
app.use(express.static(path.join(__dirname)));

//  check route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


//  Transfer 

async function initiateTransfer(amount, externalref) {
  const payload = {
    type: 1,
    channel: 1,
    currency: "GHS",
    amount,
    receiver: process.env.RECEIVER_NUMBER,
    sublistid: "",
    externalref,
    accountnumber: process.env.ACCOUNT_NUMBER,
  };

  try {
    const res = await axios.post(
      "https://api.moolre.com/open/transact/transfer",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-USER": process.env.MOO_USER,
          "X-API-KEY": process.env.MOO_KEY,
        },
      }
    );
    return res.data;
  } catch (err) {
    return { error: err.response ? err.response.data : err.message };
  }
}


//   SMS 

async function sendSms(to, message) {
  try {
    const payload = {
      type: 1,
      messages: [
        {
          to,
          message,
          senderid: process.env.SENDER_ID,
        },
      ],
    };

    const res = await axios.post(
      "https://api.moolre.com/open/sms/send",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-VASKEY": process.env.VAS_KEY,
        },
      }
    );
    return res.data;
  } catch (err) {
    return { error: err.response ? err.response.data : err.message };
  }
}


//  Transfer endpoint

app.post("/transfer", async (req, res) => {
  const amount = req.body.amount || 1;
  const externalref = req.body.externalref || `txn_${Date.now()}`;

  const transferResp = await initiateTransfer(amount, externalref);

  if (transferResp.error || transferResp.status !== "1") {
    return res.status(400).json({ success: false, transferResp });
  }

  // Send SMS  after transfer
  const smsResp = await sendSms(
    process.env.RECEIVER_NUMBER,
    `Your payment of ${amount} GHS was initiated.`
  );

  res.json({ success: true, transferResp, smsResp });
});


// Start server

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
