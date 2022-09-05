import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import PageCard from './PageCard';
import PageOptionsContext from '../PageOptionsContext';
import { CardHeaderMain, CardTitle } from '@patternfly/react-core';

beforeEach(cleanup);

describe('PageCard', () => {
  it('should render successfully', () => {
    expect(PageOptionsContext).toBeDefined();
    expect(screen.findByTestId('Card')).toBeTruthy();
  });
});

describe('<PageCard />', () => {
  it('renders the expected content', () => {
    render(
      <PageCard isOpen title="Danger!" variant="warning">
        <CardHeaderMain>
          <CardTitle>All 100 rows</CardTitle>
        </CardHeaderMain>
      </PageCard>
    );
    expect(screen.getByText('All 100 rows')).toBeTruthy();
  });
});
