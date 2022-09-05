export class PDFNotImplementedError {
  code: number;
  message: string;
  constructor() {
    this.code = 404;
    this.message = 'PDF layout is not implemented for this report yet';
  }
}

export class PDFNotFoundError {
  code: number;
  message: string;
  constructor(pdfFileName: string) {
    this.code = 500;
    this.message = `${pdfFileName} does not exist on the server.`;
  }
}

export class SendingFailedError {
  code: number;
  message: string;
  constructor(pdfFileName: string, error: Error | string) {
    this.code = 500;
    this.message = `Sending of ${pdfFileName} failed: ${error}`;
  }
}

export class PDFRequestError {
  code: number;
  message: string;
  constructor(error: Error | string) {
    this.code = 500;
    this.message = `Error fetching data: ${error}`;
  }
}
