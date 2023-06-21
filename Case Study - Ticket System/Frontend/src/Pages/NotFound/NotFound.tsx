import React from 'react';
import { createUseStyles } from 'react-jss';
import NotFoundImage from '../../Assets/404.png';


const useStyles = createUseStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
		height: '100%',
  },
  image: {
    maxHeight: '80%',
  },
});

export const NotFound: React.FC<{}> = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <img src={NotFoundImage} alt="404" className={classes.image} />
    </div>
  );
};
