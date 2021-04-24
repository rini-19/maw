import * as React from 'react';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '../controls/Button';
import Title from '../Title';

import WorkerViewTask from './WorkerViewTask';

// Generate Order Data
function createData(id, taskId, date, taskName, status, ) {
  return { id, taskId, date, taskName, status,  };
}

const rows = [
  createData(
    0,
    '0',
    '16 Mar, 2019',
    'Elvis Presley',
    'Assigned',
    312.44,
  ),
  createData(
    1,
    '1',
    '16 Mar, 2019',
    'Paul McCartney',
    'Not assigned',
    866.99,
  ),
  createData(
    3,
    '2',
    '16 Mar, 2019',
    'Michael Jackson',
    'Not assigned',
    654.39,
  ),
  createData(
    4,
    '3',
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Not assigned',
    212.79,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function TaskList() {
  return (
    <React.Fragment>
      <Title>Task List</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Task ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Task Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">View details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.taskId}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell align="right">
                {/* <Button text="View Task" onClick={preventDefault} sx={{ mt: 3 }} /> */}
                <WorkerViewTask />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}