import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ContractContext } from '../context';
import { useProvider } from 'wagmi';

export default function BasicTable() {
  const [rows, setRows] = React.useState<
    {
      address: string;
      id: number;
      activationTime: Date;
      isActive: boolean;
      roleType: string;
    }[]
  >([]);

  const provider = useProvider();
  const { getMembersWithRole } = React.useContext(ContractContext);

  React.useEffect(() => {
    provider &&
      getMembersWithRole(provider).then((members) => {
        setRows(members);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Member Address</TableCell>
            <TableCell align="right">Role Type</TableCell>
            <TableCell align="right">Is Active</TableCell>
            <TableCell align="right">Activation Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.address}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.roleType}
              </TableCell>

              <TableCell component="th" scope="row">
                {row.isActive}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.activationTime.toDateString()}
              </TableCell>
            </TableRow>
          ))}
          {rows.length === 0 && (
            <TableRow
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell component="th" scope="row">
                No members found!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
