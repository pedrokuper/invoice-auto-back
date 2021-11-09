const express = require("express");
const router = express.Router();
const cors = require("cors");

const vendors = [
  "Seleccioná un proveedor",//!Esto siempre tiene que ser el primero, es para 
  "Telecom",
  "Movistar",
  "Telecentro",
  "Sociedad Cooperativa Popular",
];

/* GET home page. */
router.get("/api/vendors", function (req, res, next) {
  res.json(vendors).status(200);
});

router.post("/api/invoice", function (req, res, next) {
  console.log(req.body);
  res.send("oka").status(200);
});

module.exports = router;
