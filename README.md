# crc-pdf-generator

`crc-pdf-generator` is a NodeJS based service that is responsible for generating a PDF Report.

For local development you can edit the passed data in the `src/index.js` file. Then to view the changes in real time
in the browser just do:
```
 npm ci
 npm run start:server
```
This will start the react scripts and will serve just the react app on localhost:8000.


This development will not have the header, but the content of the page will be printed identically into the PDF
making this approach much faster to make changes to the PDF.

```sh
oc port-forward -n crc-pdf-generator svc/crc-pdf-generator-api 8000:8000
```

## Service Integration

Please follow the [Integration guide](./INTEGRATION.md). 

## Endpoints
You currently have 2 choices for generating any of the available templates:

### Production Endpoint
The generate endpoint will automatically download the template if it is available (requires the above-mentioned headers)
```
 POST http://localhost:8000/api/crc-pdf-generator/v1/generate
```

The request body:

```TS
type RequestBody = {
  service: string; // service name
  template: string; // template name
  [key: string]: any // additional API request config attributes
}
```

### For local development only
The preview endpoint will instead return the pdf preview environment:
```
 GET http://localhost:8000/preview
```
While this endpoint is currently only available for local testing, the preview environment will eventually be exposed in
production as well.

### Endpoint Options
```
 `?template=x // See service-names for available templates. Required unless you want a hello world.` 
 `?orientation= landscape // optional`
```

