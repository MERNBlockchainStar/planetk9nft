
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import Image from 'components/UI/Image';
import Carousel from 'react-material-ui-carousel'

const useStyles = makeStyles(theme => ({
  root: {},
  image: {
    borderRadius: theme.spacing(0),
    [theme.breakpoints.down('sm')]: {
      maxWidth: 500,
    },
  },
  lastGrid: {
    [theme.breakpoints.up('sm')]: {
      marginTop: '0%',
    },
  },
}));

const Customization = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}> 
      <Grid container justifyContent="center" alignItems="center">
        {/* <Carousel autoPlay={true} animation="slide" indicators={false} timeout={1000} cycleNavigation={true} navButtonsAlwaysInvisible={false} interval={5000}> */}
          <Image
            src="assets/images/main.png"
            alt="A Funding Portal"
            lazy={false}
            className={classes.image}
          />
          {/* <Image
            src="assets/images/Artboard2.png"
            alt="A Funding Portal"
            lazy={false}
            className={classes.image}
          /> */}
        {/* </Carousel> */}
      </Grid>
    </div>
  );
};

Customization.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Customization;
