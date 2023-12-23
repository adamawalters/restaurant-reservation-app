import React from "react";

function TableList({tables}) {

  const tableHeader = (
    <tr>
      <th>Table Name</th>
      <th>Table Capacity</th>
      <th>Status</th>
    </tr>
  );

  const tableRows = tables.map((table) => {
    return (
      <TableRow
        key={reservation.reservation_id}
        reservation={reservation}
      />
    );
  });

  return (
    <table className="table table-striped table-hover">
      <caption>List of tables</caption>
      <thead>{tableHeader}</thead>
      <tbody>{tableRows}</tbody>
    </table>
  );
}

export default TableList;