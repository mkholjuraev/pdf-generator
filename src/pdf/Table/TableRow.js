import React from 'react';
import { Td, Tr } from '../../Components/StyledPatternfly/';
import { getText } from '../helpers';

const TableRow = ({
  legendEntry,
  headers,
  ExpandRowsComponent,
}) => {
  const isExpanded = true;

  return (
    <>
      <Tr>
        {ExpandRowsComponent && (
          <Td
            expand={{
              rowIndex: +legendEntry.id,
              isExpanded,
            }}
          />
        )}
        {headers.map(({ key }) => (
          <Td key={`${legendEntry.id}-${key}`}>{getText(legendEntry, key)}</Td>
        ))}
      </Tr>
      {ExpandRowsComponent && (
        <ExpandRowsComponent isExpanded={isExpanded} item={legendEntry} />
      )}
    </>
  );
};

export default TableRow;
