import React from 'react';
import { Td, Tr } from '../../../StyledPatternfly';
import { getText } from '../helpers';

const TableRow = ({ legendEntry, headers, ExpandRowsComponent }) => {
  return (
    <>
      <Tr>
        {headers.map(({ key }) => (
          <Td key={`${legendEntry.id}-${key}`}>{getText(legendEntry, key)}</Td>
        ))}
      </Tr>
      {ExpandRowsComponent && <ExpandRowsComponent item={legendEntry} />}
    </>
  );
};

export default TableRow;
