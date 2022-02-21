import React from 'react'
import fs from 'fs';
import path from 'path';

import { SupportedTemplates } from "../types";
import templateMapper from '../../templates';
import { renderToStaticMarkup } from "react-dom/server";

function renderTemplate(templateType: SupportedTemplates, templateData: Record<string, unknown>) {
    const Node: React.ComponentType<Record<string, unknown>> = templateMapper[templateType];
    if(typeof Node === 'undefined') {
        throw `Template not found, invalid query: ${templateType}!`
    }

    const baseTemplate = fs.readFileSync(path.resolve(__dirname, '../public/base-template.html'), { encoding: 'utf-8' })

    const template = baseTemplate.replace('<div id="root"></div>', `<div id="root">${renderToStaticMarkup(<Node {...templateData} />)}</div>`);        
    return template;
}

export default renderTemplate;
