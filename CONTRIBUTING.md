# Contributing

1. Fork the repository
2. Install dependencies using `npm i`
3. Run `start:server` to run the dev server. If it is your first run, you will initially see a nodemon error. It will go away once webpack finished compilation.

## Downloading PDF

We advise using some tool like Postman to create the API calls

Create a **POST** request to this URL: `http://localhost:8000/api/pdf-generator/v1/generate`

The post request must have
1. `x-rh-identity` header. You can use this value `eyJpZGVudGl0eSI6eyJpbnRlcm5hbCI6eyJvcmdfaWQiOjF9fX0=`. Its just a mocked identity object with no real data, but enables the download
2. Add a JSON body with a "template" attribute. The key must have a value of existing PDF template. You can use the following example

```JSON
{
    "template": "demo"
}
```

## Creating new template

1. Create a new directory in `/server/data-access/<template-id>`
2. Inside the new directory, create a script that will load your data. (For now we just mock the API call. Follow the `/server/data-access/demo-data`)
3. Register the promise to `templateMapper` under the `<template-id>` in the `/server/data-access/index.ts` file. Example

```diff
+import { getTemplateIdData } from './new-template-id';

const templateMapper: {
  [key: string]: (...args: any[]) => Promise<Record<string, unknown>>;
} = {
  'automation-analytics': getAutomationAnalyticsData,
  demo: getDemoData,
+ 'new-template-id': getTemplateIdData
};
```
4. Create a new directory in `/templates/<template-id>`.
5. Inside the new directory, create a file and export React component. Make sure you are not referencing any browser API (like window or document). It will not work in SSR environment. The component will receive props based on the script response you have defined earlier
6. Register the component to `templates` under the `<template-id>` inside `/templates/index.tsx`
7. Add template headers and footer in respective mappers. If you can't use the common header and footer templates, create new React components.
