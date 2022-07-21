import React from 'react';
import fs from 'fs';
import path from 'path';

import templateMapper, {
  footerTemplateMapper,
  headerTeamplteMapper,
} from '../../templates';
import ServiceNames from '../data-access/service-names';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';

export function getHeaderandFooterTemplates(templateType: ServiceNames): {
  headerTemplate: string;
  footerTemplate: string;
} {
  const HeaderTemplateNode = headerTeamplteMapper[templateType];
  const FooterTemplateNode = footerTemplateMapper[templateType];

  const root = process.cwd();
  const headerBase = fs.readFileSync(
    path.resolve(root, 'public/templates/header-template.html'),
    { encoding: 'utf-8' }
  );

  const footerBase = fs.readFileSync(
    path.resolve(root, 'public/templates/footer-template.html'),
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

function renderTemplate(
  templateType: ServiceNames,
  templateData: Record<string, unknown>
) {
  const Node: React.ComponentType<any> = templateMapper[templateType]; // eslint_disable_line
  if (typeof Node === 'undefined') {
    throw `Template not found, invalid query: ${templateType}!`;
  }

  const root = process.cwd();
  const baseTemplate = fs.readFileSync(
    path.resolve(root, 'public/templates/base-template.html'),
    { encoding: 'utf-8' }
  );

  const template = baseTemplate.replace(
    '<div id="root"></div>',
    `<div id="root">${renderToString(<Node {...templateData} />)}</div>`
  );
  return template;
}

export default renderTemplate;
