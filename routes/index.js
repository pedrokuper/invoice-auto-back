const express = require("express");
const fs = require("fs");
const router = express.Router();
const cors = require("cors");
const multer = require("multer");
const InvoiceController = require("../controllers/invoiceController");
const InvoiceInstance = new InvoiceController();

const storage = multer.memoryStorage();
var uploadMem = multer({ storage: storage });

const vendors = [
  "Seleccioná un proveedor", //!Esto siempre tiene que ser el primero, es para que el front tenga un defaultValue en el select de vendors.
  "Telecom",
  "Movistar",
  "Telecentro",
];

router.get("/api/vendors", function (req, res, next) {
  res.json(vendors).status(200);
});

router.post("/api/invoice", uploadMem.single("file"), (req, res) => {
  InvoiceInstance.parsePDF(req, res);
});

module.exports = router;
