
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Image from 'components/UI/Image';
import SectionHeader from 'components/UI/SectionHeader';

const useStyles = makeStyles(theme => ({
  root: {},
  image: {
    marginBottom: '3%'
  },
  frame: {
    border: '2px solid white',
    borderRadius: '3%',
    padding: '5%'
  },
  lastGrid: {
    [theme.breakpoints.up('sm')]: {
      marginTop: '0%',
    },
  }
}));

const Roadmap = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const theme = useTheme();
  
  return (
    <div id='roadmap' className={clsx(classes.root, className)} {...rest}>
      <SectionHeader
            title={
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: theme.palette.text.hoverText }}>
                  Roadmap
                  <br />
                  <br />
                </span>
              </div>
            }
            
            align={'center'}
            disableGutter
            titleVariant="h3"
          />
        <div className={classes.frame}>
        <SectionHeader
          title={
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: theme.palette.text.primary, fontSize: 24, fontWeight: 'normal', textAlign: 'justify', lineHeight: 1.8 }}>
                <Image
                  src="assets/images/MARS.png"
                  alt="Web3 Legal Engineering"
                  height={16}
                  width={16}
                /> Contests begin: memes, animation, backstories, world-building    
                <br />
                <br />
              </span>
              <span style={{ color: theme.palette.text.primary, fontSize: 24, fontWeight: 'normal', textAlign: 'justify', lineHeight: 1.8 }}>
                <Image
                  src="assets/images/MARS.png"
                  alt="Web3 Legal Engineering"
                  height={16}
                  width={16}
                /> K-9 minting on the website commences for 0.02 ETH per NFT.
                <br />
                <br />
              </span>
              <span style={{ color: theme.palette.text.primary, fontSize: 24, fontWeight: 'normal', textAlign: 'justify', lineHeight: 1.8 }}>
                <Image
                  src="assets/images/MARS.png"
                  alt="Web3 Legal Engineering"
                  height={16}
                  width={16}
                /> The Community begins suggesting dog shelters and charities that focus on caring for animals.
                <br />
                <br />
              </span>
              <span style={{ color: theme.palette.text.primary, fontSize: 24, fontWeight: 'normal', textAlign: 'justify', lineHeight: 1.8 }}>
                <Image
                  src="assets/images/MARS.png"
                  alt="Web3 Legal Engineering"
                  height={16}
                  width={16}
                /> Sale ends  
                <br />
                <br />  
              </span>
              <span style={{ color: theme.palette.text.primary, fontSize: 24, fontWeight: 'normal', textAlign: 'justify', lineHeight: 1.8 }}>
                <Image
                  src="assets/images/MARS.png"
                  alt="Web3 Legal Engineering"
                  height={16}
                  width={16}
                /> Vote to determine winning dog shelters or animal charities as well as the selection of multi-sig wallet holders for community funds.
                <br />
                <br />
              </span>
              <span style={{ color: theme.palette.text.primary, fontSize: 24, fontWeight: 'normal', textAlign: 'justify', lineHeight: 1.8 }}>
                <Image
                  src="assets/images/MARS.png"
                  alt="Web3 Legal Engineering"
                  height={16}
                  width={16}
                /> Distribution of funds to chosen dog shelters or animal charities as well funds to contest winners.
                <br />
                <br />
              </span>
              <span style={{ color: theme.palette.text.primary, fontSize: 24, fontWeight: 'normal', textAlign: 'justify', lineHeight: 1.8 }}>
                <Image
                  src="assets/images/MARS.png"
                  alt="Web3 Legal Engineering"
                  height={16}
                  width={16}
                /> Roadmap 2.0: K-9 Konquest game (already in development) launches.
                <br />
                <br />
              </span>
              <span style={{ color: theme.palette.text.primary, fontSize: 24, fontWeight: 'normal', textAlign: 'justify', lineHeight: 1.8 }}>
                <Image
                  src="assets/images/MARS.png"
                  alt="Web3 Legal Engineering"
                  height={16}
                  width={16}
                /> Roadmap 3.0: Planet K-9 Comic run commences alongside Genesis puzzle story drop.
                <br />
                <br />
              </span>
            </div>
          }
        />
        </div>
    </div>
  );
};

Roadmap.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Roadmap;
