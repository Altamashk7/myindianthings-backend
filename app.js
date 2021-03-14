const express = require("express");

const app = express();
const PORT = "3000" || process.env.PORT;

app.get("/", (req, res) => {
  res.send("API is working fine !");
});

app.listen(PORT, () => console.log("Server is running on port : " + PORT));
