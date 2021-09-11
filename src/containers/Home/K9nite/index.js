import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid } from '@material-ui/core';

import Image from 'components/UI/Image';
import SectionHeader from 'components/UI/SectionHeader';

const useStyles = makeStyles(theme => ({
    root: {},
    image: {
        boxShadow:
          '25px 60px 125px -25px rgba(80,102,144,.1), 16px 40px 75px -40px rgba(0,0,0,.2)',
        borderRadius: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
          maxWidth: 500,
          marginBottom: 60
        },
      },
}));

const K9nite = props => {
    const { setIsSwapDialog, account, className, ...rest } = props;
    const classes = useStyles();
    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });
        
    return (
        <div id='K9nite' className={clsx(classes.root, className)} {...rest}>
            <Grid
                container
                justifyContent="space-between"
                spacing={0}
                direction={isMd ? 'row' : 'column-reverse'}
            >
                <Grid
                    item
                    container
                    justifyContent="flex-start"
                    //alignItems="center"
                    xs={12}
                    md={6}
                    spacing={2}
                    data-aos={'fade-up'}
                    style={{padding: theme.spacing(0,2)}}>
                    <iframe id="vp1942ah" title="Video Player" width="720" height="720" frameBorder="0" src="https://s3.amazonaws.com/embed.animoto.com/play.html?w=swf/production/vp1&e=1629123765&f=942ahEotP863GpKyV2MUSQ&d=0&m=p&r=360x360+480x480+720x720&volume=0&start_res=720x720&i=m&asset_domain=s3-p.animoto.com&animoto_domain=animoto.com&options=autostart/loop" allowFullScreen></iframe>
                </Grid>
                <Grid
                    item
                    container
                    // alignItems="center"
                    xs={12}
                    md={6}
                    data-aos={'fade-up'}>
                    <SectionHeader
                        title={
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <span style={{ color: theme.palette.text.hoverText }}>
                                    K9nite Minting
                                    <br />
                                </span>
                                <span style={{ color: theme.palette.text.primary, fontSize: 18, fontWeight: '300', textAlign: 'justify', lineHeight: 1.8 }}>
                                    There are 5,033 hand-drawn K-9s in this collection spread across four breeds and a mystical class of dogs. All K-9s exist as ERC-721 tokens on the Ethereum blockchain with the actual image files hosted on IPFS. Minting will proceed from this website at a fixed price of 0.02 ETH (plus gas fee). The maximum allowable purchase is set by our smart contract at 20 K-9s per transaction.
                                    <br />
                                    <br />
                                </span>
                                <span style={{ color: theme.palette.text.primary, fontSize: 18, fontWeight: '300', textAlign: 'justify', lineHeight: 1.8 }}>
                                    Upon the reveal, our esteemed collectors will begin to become familiar with the K-9nites. The explicit traits revolve around color, breed, and headgear. Other implicit traits also exist.
                                    <br />
                                    <br />
                                </span>
                                <span style={{ color: theme.palette.text.primary, fontSize: 18, fontWeight: '300', textAlign: 'justify', lineHeight: 1.8 }}>
                                There are no K-9s set aside, no “team K-9s,” no “dev K-9s” or “artist K-9s.” All 5,033 are available for minting making this as fair a launch as we can possibly hope for. We hope you will join the conversation on Twitter and on Discord as we explore Planet K-9 together.
                                    <br />
                                    <br />
                                </span>
                            </div>
                        }
                        
                        align={isMd ? "left" : 'center'}
                        disableGutter
                        titleVariant="h4"
                    />
                </Grid>
            </Grid>
        </div>
    );
};

K9nite.propTypes = {
    /**
     * External classes
     */
    className: PropTypes.string,
};

export default K9nite;
