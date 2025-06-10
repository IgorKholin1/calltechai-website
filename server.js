const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const tokenRoutes = require("./routes/tokenRoutes");
const voiceRoutes = require("./routes/voiceRoutes");

app.use("/token", tokenRoutes);
app.use("/voice", voiceRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
});
