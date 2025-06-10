const express = require("express");
const router = express.Router();
const twilio = require("twilio");

router.post("/", (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  const dial = twiml.dial();
  dial.client("bot");
  res.type("text/xml");
  res.send(twiml.toString());
});

module.exports = router;
