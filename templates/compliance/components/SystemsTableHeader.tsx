import React from 'react';
import {
  Flex,
  FlexItem,
  Stack,
  StackItem,
  Grid,
  GridItem,
  Title,
  Text,
} from '@patternfly/react-core';

interface HeaderTable {
  compliantSystemCount: number,
  nonCompliantSystemCount: number,
  unsupportedSystemCount: number,
}

const SystemsTableHeader: React.FC<HeaderTable> = ({
  compliantSystemCount,
  nonCompliantSystemCount,
  unsupportedSystemCount
}) => {
  return (
    <Grid hasGutter span={3}>
      <GridItem>
        <Stack>
          <StackItem>
            <Title headingLevel={'h2'} className={"pf-u-danger-color-100 pf-u-font-size-2xl"}>{nonCompliantSystemCount}</Title>
          </StackItem>
          <StackItem>
            <Text className={"pf-u-font-size-xs"}>Non-compliant systems</Text>
          </StackItem>
        </Stack>
      </GridItem>
      <GridItem>
      <Stack>
          <StackItem>
            <Title headingLevel={"h2"} className={"pf-u-danger-color-100 pf-u-font-size-2xl"}>{unsupportedSystemCount}</Title>
          </StackItem>
          <StackItem>
            <Text className={"pf-u-font-size-xs"}>Systems with unsupported configuration</Text>
          </StackItem>
        </Stack>
      </GridItem>
      <GridItem>
      <Stack>
          <StackItem>
            <Title headingLevel={"h2"} className={"pf-u-danger-color-100 pf-u-font-size-2xl"}>{compliantSystemCount}</Title>
          </StackItem>
          <StackItem>
            <Text className={"pf-u-font-size-xs"}>Compliant systems</Text>
          </StackItem>
        </Stack>
      </GridItem>
    </Grid>
  )
};

export default SystemsTableHeader;
