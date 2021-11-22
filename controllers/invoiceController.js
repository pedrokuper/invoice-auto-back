const PDF = require("pdf-parse");
const XlsxPopulate = require("xlsx-populate");
const regexMatcher = require("../utils/regexMatcher");
const fs = require("fs");

class InvoiceController {
  parsePDF(req, res) {
    const bufferData = new Uint8Array(Buffer.from(req.file.buffer));
    const { data } = req.body;
    const reqData = JSON.parse(data);
    PDF(bufferData)
      .then(function (data) {
        const _data = regexMatcher(data, reqData.vendor);
        console.log(_data);
        XlsxPopulate.fromFileAsync("./rendicion.xlsx").then((workbook) => {
          // Modify the workbook.
          //DRY
          workbook.sheet("Detalle_Gastos").cell("A8").value(_data.invoiceDate);
          workbook
            .sheet("Detalle_Gastos")
            .cell("B8")
            .value(_data.invoiceNumber);
          workbook
            .sheet("Detalle_Gastos")
            .cell("E8")
            .value(_data.invoicePayment);
          workbook.sheet("Detalle_Gastos").cell("C8").value(reqData.vendor);
          return workbook.toFileAsync("./out.xlsx");
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }
}

module.exports = InvoiceController;
