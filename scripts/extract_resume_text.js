const fs = require('fs');
const pdfParse = require('pdf-parse');
const pdf = pdfParse.default || pdfParse;

const filePath = './public/Resum.pdf';

let dataBuffer = fs.readFileSync(filePath);
// pdf-parse expects a Uint8Array in this version
if (Buffer.isBuffer(dataBuffer)) {
  dataBuffer = new Uint8Array(dataBuffer);
}

(async () => {
  try {
    const parser = new pdf.PDFParse(dataBuffer);
    const text = await parser.getText();
    console.log('--- PDF text start ---');
    console.log(text);
    console.log('--- PDF text end ---');
  } catch (err) {
    console.error('Error reading PDF:', err.message || err);
    process.exit(1);
  }
})();
