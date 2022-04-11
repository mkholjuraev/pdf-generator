import React from 'react';
import fs from 'fs';
import path from 'path';

import templateMapper, {
  footerTemplateMapper,
  headerTeamplteMapper,
} from '../../templates';
import { ServiceNames } from '../data-access/call-service';
import { renderToStaticMarkup } from 'react-dom/server';

export function getHeaderandFooterTemplates(templateType: ServiceNames): {
  headerTemplate: string;
  footerTemplate: string;
} {
  const HeaderTemplateNode = headerTeamplteMapper[templateType];
  const FooterTemplateNode = footerTemplateMapper[templateType];

  const headerBase = fs.readFileSync(
    path.resolve(__dirname, '../public/templates/header-template.html'),
    { encoding: 'utf-8' }
  );

  const footerBase = fs.readFileSync(
    path.resolve(__dirname, '../public/templates/footer-template.html'),
    { encoding: 'utf-8' }
  );

  return {
    headerTemplate: headerBase.replace(
      '<div id="content"></div>',
      renderToStaticMarkup(<HeaderTemplateNode />)
    ),
    footerTemplate: footerBase.replace(
      '<div id="content"></div>',
      renderToStaticMarkup(<FooterTemplateNode />)
    ),
  };
}

function renderTemplate(templateType: ServiceNames, templateData: unknown) {
  const Node: React.ComponentType<any> = templateMapper[templateType];
  if (typeof Node === 'undefined') {
    throw `Template not found, invalid query: ${templateType}!`;
  }

  const baseTemplate = fs.readFileSync(
    path.resolve(__dirname, '../public/templates/base-template.html'),
    { encoding: 'utf-8' }
  );

  const template = baseTemplate.replace(
    '<div id="root"></div>',
    `<div id="root">${renderToStaticMarkup(<Node {...templateData} />)}</div>`
  );
  return template;
}

export default renderTemplate;
