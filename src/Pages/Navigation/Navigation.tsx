import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import { createUseStyles } from 'react-jss';
import { Theme } from '../../Styling/Theme';

const useStyles = createUseStyles((theme: Theme) => {
	return {
		navbar: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			padding: '1.5rem',
			width: "100vw",
			backgroundColor: theme.navbar,
		},
		logo: {
			display: 'flex',
			alignItems: 'center',
			color: '#333',
			textDecoration: 'none',
			'&:hover': {
				color: '#000',
			},
		},
		logoIcon: {
			marginRight: '0.5rem',
			fontSize: '1.5rem',
		},
		navLinks: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'flex-end',
			gap: '1.2rem',
			marginRight: '2.5rem',
		},
		navLink: {
			color: theme.textWhite,
			textDecoration: 'none',
			'&:hover': {
				color: theme.textGreen,
			},
			'&.active': {
				color: theme.textGreen,
			},
		},
	}
});

export const Navigation: React.FC<{}> = (): JSX.Element => {
	const classes = useStyles();

  return (
    <div className={classes.navbar}>
      <NavLink to="/" className={classes.logo}>
        <FontAwesomeIcon icon={faTicketAlt} className={classes.logoIcon} />
        <span>Ticket System</span>
      </NavLink>
      <div className={classes.navLinks}>
        <NavLink to="/" className={classes.navLink}>
					Home
        </NavLink>
        <NavLink to="/tickets" className={classes.navLink}>
          Tickets
        </NavLink>
        <NavLink to="/create-ticket" className={classes.navLink}>
          Create Ticket
        </NavLink>
        <NavLink to="/projects" className={classes.navLink}>
          Projects
        </NavLink>
        <NavLink to="/create-project" className={classes.navLink}>
          Create Project
        </NavLink>
        <NavLink to="/admin" className={classes.navLink}>
          Admin Panel
        </NavLink>
      </div>
    </div>
  );
}