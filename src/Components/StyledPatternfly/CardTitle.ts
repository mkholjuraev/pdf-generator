import styled from 'styled-components';
import { CardTitle } from '@patternfly/react-core';

export const Title = styled(CardTitle)`
  padding-top: 0 !important;
  font-family: 'Red Hat Display', sans-serif;
  font-size: 28px;
  color: #ee2435;
  text-align: center;
  font-weight: normal;
`;

export const Subtitle = styled(CardTitle)`
  max-width: 75%;
  text-align: center;
  margin: auto;
  color: #151515;
  font-family: 'Red Hat Display', sans-serif;
  /* font-size: 9px; */
  font-weight: normal;
`;
