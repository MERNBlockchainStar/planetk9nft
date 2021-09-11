
import React, { useState, useCallback ,useEffect} from 'react';
import { UnsupportedChainIdError } from '@web3-react/core'
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'
import { NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected } from '@web3-react/injected-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from "@material-ui/core/Grid";
import { useSnackbar } from 'notistack';

import DialogWrapper, { dialogStyles } from 'hoc/DialogWrapper';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import { MemoizedOutlinedTextField } from 'components/UI/OutlinedTextField';
import Image from 'components/UI/Image';
import { isEmpty, delay } from 'utils/utility';
import { nftInstance } from 'services/nftInstance';
import {ethers} from "ethers";

const useStyles = makeStyles(theme => ({
  actionButton: {
    backgroundColor: theme.custom.palette.darkRed,
    minWidth: theme.spacing(1),
    border: 'none'
  },
  dialogActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(3),
    marginRight: -theme.spacing(2 / 8)
  },
  titleLine: {
    marginBottom: theme.spacing(2.5)
  },
  labelLine: {
    marginBottom: theme.spacing(1)
  },
  labelLine1: {
    marginTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    float: 'right',
    color: '#16ACE2'
  },
  input: {
    display: 'none'
  },
  imagePad: {
    width:200, 
    height: 200, 
    background: 'none', 
    margin: '10px',
    borderRadius: '5px',
    border: '1px solid rgb(107,118,161)'
  },
  fileDropZone: {
    height: 96,
    minHeight: 'unset'
  },
  dialogContent: {
    [theme.breakpoints.down(360)]: {
      maxHeight: '200px',
      padding: theme.spacing(0.5),
    },
    [theme.breakpoints.down('xs')]: {
      maxHeight: '382px',
      padding: theme.spacing(1, 0, 1, .5),
    },
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(1),
    maxHeight: '460px',
    width: 'auto',
    overflowX: 'unset',
    overflowY: 'scroll',
    '&::-webkit-scrollbar-track': {
      borderRadius: 2,
      backgroundColor: theme.palette.background.default
    },
    '&::-webkit-scrollbar': {
      width: 5,
      backgroundColor: theme.palette.background.default
    },
  },
  container: {
    [theme.breakpoints.down('sm')]: {
      padding: 0
    },
    display: 'flex',
    padding: `2px 8px 8px 8px`,
    margin: 0,
    flexGrow: 1,
  },
  image: {
    borderRadius: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
        maxWidth: 500,
    },
    width: '198px',
    height: '198px'
  }
}));

const MintModal = ({ open, onClose, headerTitle, activatingConnector, setActivatingConnector, triedEager, context }) => {
  const classes = useStyles();
  const dialogClasses = dialogStyles();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(()=>{
    window.ethereum.enable();
  },[])

  const getErrorMessage = (error) => {
    if (error instanceof NoEthereumProviderError) {
      return `No browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.`
    } else if (error instanceof UnsupportedChainIdError || !error) {
      return "You're connected to an unsupported network. Please change network as Ethereum"
    } else if (
      error instanceof UserRejectedRequestErrorInjected ||
      error instanceof UserRejectedRequestErrorWalletConnect ||
      error instanceof UserRejectedRequestErrorFrame
    ) {
      return 'Please authorize this website to access your Ethereum account.'
    } else {
      console.error(error)
      return 'An unknown error occurred. Check the console for more details.'
    }
  }

  const { account, chainId, library, error } = context
  const nft = nftInstance(account, chainId, library);
  
  const metaMaskInstallHandler = () => {
    window.open('https://metamask.io/download', '_blank');
  }

  const onFormSubmit = async (ev) => {
    ev.preventDefault()
    onClose();
  }

  const [amount, setAmount] = useState(1);
  const [loadingStatus, setLoadingStatus] = useState(false);
  
  const inputChangeHandler = useCallback(event => {
    const { value } = event.target;
    if(value > 20 || value < 1)
    {
      enqueueSnackbar(`Please input amount between 1 and 20`, { variant: 'error' });
      setAmount(1)
    } else {
      setAmount(value)
    }
  }, []);

  const mint = async () => {
    // handleTransaction()
    if(!!error || isEmpty(account))
    {
      enqueueSnackbar(`First, Please fix the error`, { variant: 'error' });
      return;
    }
    setLoadingStatus(true);
    try{
      let loop = true
      let tx = null
      const saleIsActive = await nft.saleIsActive()
      let overrides = {
        value: `${0.02*1e18*amount}`,
      }
     
      if(!saleIsActive)
      {
        const { hash: flipSaleStateHash } = await nft.flipSaleState()
        while (loop) {
            tx = await library.getTransactionReceipt(flipSaleStateHash)
            if(isEmpty(tx)) {
              await delay(200)
            } else {
                const { hash: mintDogHash } = await nft.mintDog(amount,overrides)
                while(loop) {
                  tx = await library.getTransactionReceipt(mintDogHash)
                  if(isEmpty(tx)) {
                    await delay(300)
                  } else {
                    loop = false
                  } 
                }
            }
        }
      } else {
        const { hash: mintDogHash } = await nft.mintDog(amount,overrides)
        while (loop) {
            tx = await library.getTransactionReceipt(mintDogHash)
            if(isEmpty(tx)) { 
              await delay(300)
            } else {
              loop = false
            } 
        }
      }
      if (tx.status === 1) {
            setLoadingStatus(false)
            enqueueSnackbar(`Minted successfully.`, { variant: 'success' });
            return;
      } else {
        setLoadingStatus(false)
        enqueueSnackbar(`Minted failed.`, { variant: 'error' });
        return;
      }
    }
    catch {
        enqueueSnackbar(`Mint failed`, { variant: 'error' });
        setLoadingStatus(false)
    }
  }
  
  return (
    <DialogWrapper open={open} onClose={onClose}>
      <form onSubmit={onFormSubmit} >
        <div className={dialogClasses.root}>
          <Typography variant='h6' className={classes.titleLine}>{headerTitle}</Typography>
          <DialogContent dividers className={classes.dialogContent}>
            <Grid container spacing={2} className={classes.container} justify="space-between">
              <Grid
                item
                container
                justify="center"
                alignItems="center"
                xs={12}
                md={6}
                spacing={2}>
                <div className={classes.imagePad}>
                  <Image
                      src="assets/images/Avatar-300.jpg"
                      className={classes.image}
                      alt="Web3 Legal Engineering"
                  />
                </div>
              </Grid>
              <Grid
                  item
                  xs={12}
                  md={6}
              >
                <Typography variant='subtitle1' className={classes.labelLine}>Amount</Typography>
                <MemoizedOutlinedTextField
                  placeholder='1'
                  type="number"
                  name={'nftAmount'}
                  value={amount}
                  onChange={inputChangeHandler}
                />
                <Typography variant='subtitle1' className={classes.labelLine1}>Max 20 NFTs/tx</Typography>
              </Grid>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {(error instanceof NoEthereumProviderError) && (
                  <ContainedButton
                    style={{
                      height: '3rem',
                      marginTop: '2rem',
                      borderRadius: '1rem',
                      cursor: 'pointer',
                    }}
                    variant="outlined"
                    onClick={() => metaMaskInstallHandler()}
                  >
                    Install Metamask
                  </ContainedButton>
                )}
                {(!!error || isEmpty(account))&& <h4 style={{ marginTop: '1rem', marginBottom: '0', color: '#16ACE2' }}>{getErrorMessage(error)}</h4>}
              </div>
            </Grid>
          </DialogContent>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ContainedButton
              loading={loadingStatus}
              //disable={true}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '2.5rem',
                marginTop: '1rem',
                borderRadius: '1rem',
                borderColor: 'red',
                cursor: 'pointer',
                color: 'textSecondary'
              }}
              onClick={() => 
                mint()
              }
            >
              Mint K-9 NFT
            </ContainedButton>
          </div>
        </div>
      </form>
    </DialogWrapper>
  );
}

export default MintModal;
