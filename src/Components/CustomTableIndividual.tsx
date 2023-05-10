import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { createUseStyles } from 'react-jss';
import { Theme } from '../Styling/Theme';
import { useNavigate } from 'react-router-dom';

interface TableProps {
  rows: Record<string, string | number | JSX.Element>[];
  columns: string[];
  maxHeight?: string;
  columnSpacing?: string;
  rowOnClickDestination?: string;
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
  tableRow: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#f5f5f5',
    }
  }
}));

export const CustomTableIndividual: React.FC<TableProps> = ({ rows, columns, maxHeight="100%", columnSpacing="px", rowOnClickDestination }) => {
  const classes = useStyles();
  const navigate = useNavigate();

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
            <TableRow 
              key={`outter-${index}`}  
              className={rowOnClickDestination ? classes.tableRow : undefined}
              onClick={() => rowOnClickDestination ? navigate(rowOnClickDestination + row['ID']) : null}
            >
              {Object.values(row).map((value, index) => (
                <TableCell key={index} className={classes.tableCell}>
                  <>
                  {value === row['ID'] ? String(value).substring(0, 10) + "..." : value}
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

