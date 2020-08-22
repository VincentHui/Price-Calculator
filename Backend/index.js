const express = require("express");
const app = express();
var cors = require("cors");
const { getRegion } = require("./src/postcode");

//to get this working with the frontend hosted on localhost
app.use(cors());
app.get("/", async (req, res) => {
  try {
    const resonse = await getRegion(req.query.pc);
    res.json(resonse);
  } catch (e) {
    if (e.response.statusText) res.json({ error: e.message });
  }
});

app.get("/postcode", (req, res) => {
  res.send("simple post code service");
});

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});
