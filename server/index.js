const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
app.use(cors());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
