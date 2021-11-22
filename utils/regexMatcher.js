const regexList = {
  Telecom: {
    invoiceNumber: /FacturaN°(\d+(?:.+))?/,
    invoicePayment: /IMPORTE\s?\$(\d+(?:.+))?/,
    invoiceDate: /Fecha: (\d+(?:.+))?/,
    invoiceDate: /FechadeEmisión(\d+(?:.+))?/,
    numberReplace: "FacturaN°",
    amountReplace: "IMPORTE$",
    dateReplace: "FechadeEmisión", //Preguntar a Poli
  },
  Telecentro: {
    invoicePayment: /TOTAL\s(\d+(?:.+))/,
    invoiceNumber: /Nro: (\d+(?:.+))?/,
    invoiceDate: /Fecha: (\d+(?:.+))?/,
    numberReplace: "Nro: ",
    amountReplace: "TOTAL",
    dateReplace: "Fecha: ", //Preguntar a Poli
  },
  Cooperativa: {
    invoicePayment: /TOTAL A PAGAR\$\   \s(\d+(?:.+))/,
    invoiceNumber: /Asociado NºCategoría\n(\d+(?:.+))?/,
    invoiceDate: /TELEFONIA CASA\n(\d+(?:.+))?/,
    numberReplace: "Asociado NºCategoría\n",
    amountReplace: "TOTAL A PAGAR$",
    dateReplace: "TELEFONIA CASA\n", //Preguntar a Poli
  },
};

const regexMatcher = (pdf, vendor) => {
  if (pdf.text.includes(vendor)) {
    const invoiceNumber = pdf.text
      .trim()
      .match(regexList[vendor]?.invoiceNumber);
    const invoicePayment = pdf.text
      .trim()
      .match(regexList[vendor]?.invoicePayment);
    const invoiceDate = pdf.text.match(regexList[vendor].invoiceDate);
    return {
      invoiceNumber: invoiceNumber[0]
        .replace(regexList[vendor]?.numberReplace, "")
        .trim(),
      invoicePayment: invoicePayment[0]
        .replace(regexList[vendor]?.amountReplace, "")
        .trim(),
      invoiceDate: invoiceDate[0].replace(regexList[vendor]?.dateReplace, ""),
    };
  }
};

module.exports = regexMatcher;
