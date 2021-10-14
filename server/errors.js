export class PDFNotImplementedError {
  constructor() {
    this.code = 404;
    this.message = 'PDF layout is not implemented for this report yet';
  }
};

export class PDFNotFoundError {
  constructor(pdfFileName) {
    this.code = 500;
    this.message = `${pdfFileName} does not exist on the server.`;
  }
};

export class SendingFailedError {
  constructor(pdfFileName, error) {
    this.code = 500;
    this.message = `Sending of ${pdfFileName} failed: ${error}`;
  }
};