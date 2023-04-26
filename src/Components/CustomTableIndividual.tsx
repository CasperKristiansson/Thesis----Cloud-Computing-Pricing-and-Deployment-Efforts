import React from 'react';
import { Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { createUseStyles } from 'react-jss';
import { Theme } from '../Styling/Theme';

interface TableProps {
  rows: Record<string, string | number | JSX.Element>[];
  columns: string[];
  maxHeight?: string;
  columnSpacing?: string;
}

const useStyles = createUseStyles((theme: Theme) => ({
  root: {
    borderCollapse: 'collapse',
    width: '100%',
    overflow: "scroll",
    scrollbarWidth: 'thin',
  },
  tableHeader: {
    borderBottom: '1px solid #e0e0e0',
    margin: 0,
    padding: 0,
    color: `${theme.textGreen} !important`,
  },
  tableCell: {
    border: 'none',
    color: theme.textDark,
  },
}));

export const CustomTableIndividual: React.FC<TableProps> = ({ rows, columns, maxHeight="100%", columnSpacing="px" }) => {
  const classes = useStyles();

  return (
    <TableContainer className={classes.root} style={{maxHeight: maxHeight}}>
      <Table>
        <TableHead>
          <TableRow className={classes.tableHeader} >
            {columns.map((column, index) => (
              <TableCell key={column} sx={{color: "#75BC5B"}} >{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={`outter-${index}`}>
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

