const PDF = require("pdf-parse");
const XlsxPopulate = require("xlsx-populate");
const regexMatcher = require("../utils/regexMatcher");
const fs = require("fs");

// TODO  Usar toda esta lógica del controller desde la función PDF extractor. Como estamos usando regex Matcher
class InvoiceController {
  parsePDF(req, res) {
    const bodyData = JSON.parse(req.body.data);
    const { buffer } = req.file;

    if (buffer && bodyData.vendor && bodyData.email) {
      try {
        const bufferData = new Uint8Array(Buffer.from(buffer));

        PDF(bufferData).then((data) => {
          const _data = regexMatcher(data, bodyData.vendor);
          // console.log(_data.invoicePayment);
          const parsedInvoicePayment = parseInt(
            _data.invoicePayment.replace(".", "").replace(",", ".") //This is UGLY. UPGRADE
          );
          XlsxPopulate.fromFileAsync("./rendicion.xlsx").then((workbook) => {
            // Modify the workbook.
            //DRY
            workbook
              .sheet("Detalle_Gastos")
              .cell("A8")
              .value(_data.invoiceDate);
            workbook
              .sheet("Detalle_Gastos")
              .cell("B8")
              .value(_data.invoiceNumber);
            workbook
              .sheet("Detalle_Gastos")
              .cell("E8")
              .value(_data.invoicePayment);
            if (parsedInvoicePayment <= 2000) {
              //This is UGLY. UPGRADE
              workbook
                .sheet("Detalle_Gastos")
                .cell("E8")
                .value(_data.invoicePayment);
            } else {
              workbook.sheet("Detalle_Gastos").cell("E8").value(2000);
            }
            workbook.sheet("Detalle_Gastos").cell("C8").value(bodyData.vendor);
            return workbook.toFileAsync("./out.xlsx");
          });
          res.sendStatus(200);
        });
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    } else {
      res.sendStatus(400);
    }
  }
}

module.exports = InvoiceController;
