import React from 'react'

import { SupportedTemplates } from "../types";
import templateMapper from '../../templates';
import { renderToStaticMarkup } from "react-dom/server";

async function renderTemplate(templateType: SupportedTemplates, templateData: Record<string, unknown>) {
    const Node: React.ComponentType<Record<string, unknown>> = templateMapper[templateType];
    if(typeof Node === 'undefined') {
        throw `Template not found, invalid query: ${templateType}!`
    }

    const template = `<div id="root">${renderToStaticMarkup(<Node {...templateData} />)}</div>`;        
    return template;
}

export default renderTemplate;
