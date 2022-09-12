# Service integration

To integrate your service into the PDF generator follow these steps:

1. [Enable crc-pdf-generator as a dependency](#clowder-conf)
2. [Make sure you have endpoints exposing required data](#check-endpoints)
3. [Create an API descriptor to get your data](#create-descriptor)
4. [Create a JSX template to render your PDF](#create-template)

## <a name="clowder-conf"></a>Enable crc-pdf-generator as a dependency

In order to enable the PDF generator service to connect to your service API, a network policy has to be set up to allow communication between the cluster namespaces.

1. Add the PDF generator as a `(optional)dependency` in your clowder config and vice versa [Example](https://github.com/RedHatInsights/compliance-backend/pull/1443/files)
3. Add PDF generator to `networkPoliciesAllow` in your service namespace config and vice versa. [Example](https://gitlab.cee.redhat.com/service/app-interface/-/merge_requests/46592/diffs)

## <a name="check-endpoints"></a>Make sure you have endpoints exposing required data

To render the PDF report, the report requires data. Make sure your service is exposing the necessary endpoint(s). In an ideal scenario, only one API call would be required to request all data.

## <a name="create-template"></a>Create a JSX template to render your PDF

The next step is to add the JSX template to render the PDF on the server. To create a template follow these steps

1. Create new directory in `src/templates/<template-name>`.
2. Inside the directory create a template body. Any valid react component honoring the Patternfly design is valid.
3. (optional) If necessary, create a header and footer components if necessary. We string recommend using **default header and footer**.
4. Register your template in `src/templates/index.ts`. Put your template into a matching service object. If your service is not listed inside the object, create a new entry and add your service name to the `src/common/service-names.ts` enum. Make sure to assign header and footer components of your liking.

## <a name="create-descriptor"></a>Create an API descriptor to get your data

To request the service data, the PDF service requests an API descriptor.

The API descriptor:

- Requests data in production
- Replaces API call with the mocked request in local/test environment
- Allows definition of customized data requests

To create a descriptor follow these steps:

1. Create new directory in `src/server/data-access/<descriptor-name>`. Note: one descriptor can handle requests for multiple templates.
2. Add a TS file that exports mocked data to the new directory. This file will be used for testing and local development.
3. Add a descriptor TS file. This file has to export the following object:

```TS
export type APIDescriptor<T = any, R = unknown> = {
 // the service name
 service: ServiceNames;
 // for a simple request
 path?: string;
 // if a simple get request is used, mutate the data in this function
 responseProcessor?: (...args: any[]) => R;
 // a function that returns the mocked data
 mock: (...args: any[]) => Promise<T>;
 /**
  * @description Fully customized request
  * @param {AxiosRequestHeaders} headers Headers are identical to the headers received by the PDF service. Include the x-rh-identity object
  * @param {Record<string, any>} options A request body passed to the original generate request. Used to configure the request.
  * @returns {Promise<any>}
  */
 request?: (
   headers: AxiosRequestHeaders,
   options: Record<string, any>
 ) => Promise<R>;
};


export type ServiceDescriptor = {
 // Each template of a service request its own descriptor
 templates: {
   [key: string]: APIDescriptor;
 };
};
```

A final descriptor can look like this:

```TS
const complianceDescriptor: ServiceDescriptor = {
 templates: {
   report: {
     service: ServiceNames.compliance, // service name
     responseProcessor, // response processor will be used for mocked data processing
     request: getPolicyData, // production request
     mock: getMock, // function that returns mocked data
   },
 },
};

export default complianceDescriptor;
```




