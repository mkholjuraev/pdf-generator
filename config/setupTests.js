import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';

global.screen = screen;
global.render = render;
global.cleanup = cleanup;
global.React = React;

// For page API
global.insights = {
  chrome: {
    on() {},
    init() {},
    identifyApp() {},
    auth: {
      getUser: () => new Promise((resolve) => resolve('bob')),
    },
    appNavClick: jest.fn(),
  },
};
