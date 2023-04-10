import React from 'react';
import { Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { createUseStyles } from 'react-jss';
import { Theme } from '../Styling/Theme';

interface TableProps {
  rows: Record<string, string | number | JSX.Element>[];
  columns: string[];
}

const useStyles = createUseStyles((theme: Theme) => ({
  root: {
    borderCollapse: 'collapse',
    width: '80%',
    margin: '0 auto',
    overflow: "auto",
  },
  tableHeader: {
    borderBottom: '1px solid #e0e0e0',
    borderTop: '1px solid #e0e0e0',
    margin: 0,
    padding: 0,
    color: `${theme.textGreen} !important`,
  },
  tableCell: {
    width: '1%',
    whiteSpace: 'nowrap',
    '&:nth-child(2)': {
      width: '100%',
    },
    border: 'none',
    color: theme.textDark,
  },
}));

export const CustomTable: React.FC<TableProps> = ({ rows, columns }) => {
  const classes = useStyles();

  return (
    <TableContainer className={classes.root}>
      <Table>
        <TableHead>
          <TableRow className={classes.tableHeader}>
            <TableCell />
            {columns.map((column) => (
              <TableCell key={column} sx={{color: "#75BC5B"}} >{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={`outter-${index}`}>
              <TableCell component="th" scope="row" className={classes.tableCell}>
                <Avatar />
              </TableCell>
              {Object.values(row).map((value, index) => (
                <TableCell key={index} className={classes.tableCell}>
                  <>
                  {value}
                  </>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

