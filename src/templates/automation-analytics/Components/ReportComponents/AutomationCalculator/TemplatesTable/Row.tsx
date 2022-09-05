import React, { Fragment, FunctionComponent } from 'react';
import { Tr, Td } from '../../../StyledPatternfly/Table';
import { global_success_color_200 as globalSuccessColor200 } from '@patternfly/react-tokens';

import { Template } from '../../types';
import currencyFormatter from '../../../../Utilities/currencyFormatter';
import ExpandedRowContents, {
  AutomationCalculatorExpandRowsComponentType,
} from './ExpandedRowContents';
import styled from 'styled-components';
import * as Table from '@patternfly/react-table';

export const ExpandedRow = styled(Table.Tr)`
  background-color: #f0f0f0;
`;

interface Props {
  template: Template;
  ExpandRowsComponent?: AutomationCalculatorExpandRowsComponentType;
}

const Row: FunctionComponent<Props> = ({ template, ExpandRowsComponent }) => {
  return (
    <Fragment>
      <Tr>
        <Td>{template.name}</Td>
        <Td>
          {template.avgRunTime / 60}min x {template.successful_hosts_total} host
          runs
        </Td>
        <Td style={{ color: globalSuccessColor200.value }}>
          {currencyFormatter(+template.delta)}
        </Td>
        <Td>{template.enabled ? 'Shown' : 'Hidden'}</Td>
      </Tr>
      {ExpandRowsComponent && (
        <ExpandedRow style={{ borderBottomWidth: '0px' }}>
          <ExpandedRowContents item={template} />
        </ExpandedRow>
      )}
    </Fragment>
  );
};
export default Row;
