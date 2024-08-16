const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const adminRoutes = require("./routes/admin/routes");
const config = require(`./config/env/${process.env.NODE_ENV.trim()}`);

const app = express();
const PORT = config.port;

require("./migrate");

app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1", adminRoutes);
app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
