import React from 'react';
import { Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { createUseStyles } from 'react-jss';
import { Theme } from '../Styling/Theme';
import { useNavigate } from 'react-router-dom';

interface TableProps {
  rows: Record<string, string | number | JSX.Element>[];
  columns: string[];
  maxHeight?: string;
  columnSpacing?: string;
  /**
   * The destination to navigate to when a row is clicked.
   * The destination is then followed with the 'ID' field.
   * For example the columns should be: ["Name", "ID"]
   */
  rowOnClickDestination?: string;
}

const useStyles = createUseStyles((theme: Theme) => ({
  root: {
    borderCollapse: 'collapse',
    width: '80%',
    margin: '0 auto',
    overflow: "scroll",
    height: "100%",
    "@media (max-width: 1210px)": {
      width: "90%",
    },
    "@media (max-width: 1072px)": {
      width: "98%",
    },
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
  tableRow: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#f5f5f5',
    }
  }
}));

export const CustomTable: React.FC<TableProps> = ({ rows, columns, maxHeight="100%", columnSpacing="px", rowOnClickDestination = undefined }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <TableContainer className={classes.root} style={{maxHeight: maxHeight}}>
      <Table>
        <TableHead>
          <TableRow className={classes.tableHeader} >
            <TableCell />
            {columns.map((column, index) => (
              <TableCell key={column} sx={{color: "#75BC5B", paddingLeft: index ? columnSpacing : 0, width: "100%" }}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow 
              key={`outter-${index}`} 
              className={rowOnClickDestination ? classes.tableRow : undefined}
              onClick={() => rowOnClickDestination ? navigate(rowOnClickDestination + row['ID']) : null}
            >
              <TableCell component="th" scope="row" className={classes.tableCell}>
                <Avatar />
              </TableCell>
              {Object.values(row).map((value, index) => (
                <TableCell key={index} className={classes.tableCell} sx={{ paddingLeft: index ? columnSpacing : 0 }}>
                  <>
                  {value === row['ID'] ? String(value).substring(0, 15) + "..." : value}
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

