const tokenRoute = require('./routes/token');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const twilio = require('twilio');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Token route for Twilio Client Web
app.get('/token', (req, res) => {
  const AccessToken = twilio.jwt.AccessToken;
  const VoiceGrant = AccessToken.VoiceGrant;

  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY_SID,
    process.env.TWILIO_API_KEY_SECRET,
    { ttl: 3600 }
  );

  const voiceGrant = new VoiceGrant({
    outgoingApplicationSid: process.env.TWILIO_TWIML_APP_SID
  });

  token.addGrant(voiceGrant);
  token.identity = 'browser-user';

  res.send({ token: token.toJwt() });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
