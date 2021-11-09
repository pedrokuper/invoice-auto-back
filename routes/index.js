const express = require("express");
const router = express.Router();
const cors = require("cors");

const vendors = [
  "Telecom/Fibertel",
  "Movistar",
  "Telecentro",
  "Sociedad Cooperativa Popular",
];

/* GET home page. */
router.get("/api/vendors", function (req, res, next) {
  res.json(vendors).status(200);
});

module.exports = router;
