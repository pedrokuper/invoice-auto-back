const express = require("express");
const router = express.Router();
const cors = require("cors");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + ".pdf");
  },
});

const upload = multer({ storage: storage });

const vendors = [
  "Seleccioná un proveedor", //!Esto siempre tiene que ser el primero, es para que el front tenga un defaultValue en el select de vendors.
  "Telecom",
  "Movistar",
  "Telecentro",
];

/* GET home page. */
router.get("/api/vendors", function (req, res, next) {
  res.json(vendors).status(200);
});

router.post("/api/invoice", upload.single("file"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.send("oka").status(200);
});

module.exports = router;
