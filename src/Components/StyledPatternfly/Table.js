import styled from 'styled-components';
import * as Table from '@patternfly/react-table';
import {
  global_disabled_color_300,
  global_Color_400,
} from '@patternfly/react-tokens';

export * from '@patternfly/react-table';

export const TableComposable = styled(Table.TableComposable)`
  tbody {
    border-top: 2px solid ${global_Color_400.value};
    border-bottom: 2px solid ${global_Color_400.value};
  }
`;

export const Tr = styled(Table.Tr)`
  border: none !important;
  &:nth-child(even) {
    background-color: ${global_disabled_color_300.value};
  }
`;

export const Th = styled(Table.Th)`
  /* font-size: 9px !important; */
  color: #4f4c4d;
  font-weight: bold;
`;

export const Td = styled(Table.Td)`
  /* font-size: 9px !important; */
  border: none;
  border-left: 2px solid #fff;
  border-right: 2px solid #fff;
`;
