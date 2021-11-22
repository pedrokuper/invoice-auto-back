const PDF = require("pdf-parse");
const fs = require("fs");
const XlsxPopulate = require("xlsx-populate");

let PDF_FILE = "./pdf/telecom.pdf";

let dataBuffer = fs.readFileSync(PDF_FILE);
PDF(dataBuffer)
  .then(function (data) {
    const _data = regexMatcher(data, "Telecom");

    console.log(_data);

    XlsxPopulate.fromFileAsync("./rendicion.xlsx").then((workbook) => {
      // Modify the workbook.

      //DRY
      workbook.sheet("Detalle_Gastos").cell("A8").value(_data.invoiceDate);
      workbook.sheet("Detalle_Gastos").cell("B8").value(_data.invoiceNumber);
      workbook.sheet("Detalle_Gastos").cell("E8").value(_data.invoicePayment);

      return workbook.toFileAsync("./out.xlsx");
    });
  })
  .catch(function (err) {
    console.log(err);
  });

/*
A4 - B4 Fecha de presentacion de la planilla
D4 Recurso
A8 = Fecha de factura
B8 Numero de factura
C8 Proveedor
D8 Concepto
E8 Monto factura (si es inferior a 2000, poner 2000. Si es superior a 2000, poner 2000.)

*/
