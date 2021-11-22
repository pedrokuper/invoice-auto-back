const express = require("express");
const fs = require("fs");
const router = express.Router();
const cors = require("cors");
const multer = require("multer");
const InvoiceController = require("../controllers/invoiceController");
const InvoiceInstance = new InvoiceController();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + ".pdf");
//   },
// });
// const upload = multer({ storage: storage });

const storage = multer.memoryStorage();
var uploadMem = multer({ storage: storage });

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

router.post("/api/invoice", uploadMem.single("file"), (req, res) => {
  console.log(" file mem uploaded");
  res.send("file mem upload success");

  // const { data } = req.body;
  // const reqData = JSON.parse(data);
  // console.log(reqData);
  // console.log(req.file);
  InvoiceInstance.parsePDF(req, res);
  // res.send("OK").status(200);
});

module.exports = router;
