
import React, { memo } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
  selectedItem: props => ({
   
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2)
    },
    [theme.breakpoints.down(360)]: {
      padding: theme.spacing(1.5),
    },
    borderTop: props.isMobileMenu ? `1px solid ${theme.palette.text.hoverText}` : null,
    color: `${props.isMobileMenu ? theme.palette.text.hoverText : theme.palette.primary.contrastText} !important`,
    backgroundColor: `${theme.palette.background.main} !important`,
  }),
  menuFont: {
    [theme.breakpoints.down(1360)]: {
      fontSize: theme.spacing(1.8),
    },
    marginLeft: theme.spacing(1),
    fontSize: theme.spacing(2.5),
    color: theme.palette.text.primary,
    fontWeight: 300
  },
  listItem: props => ({
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
      color: props.menuNumber === 2 ? '#FFA000' : null
    },
    [theme.breakpoints.down(360)]: {
      padding: theme.spacing(1.5),
    },
    padding: (0, 10, 0, 10),
    height: '64px',
  })
}));

const TopAppBarMenuItem = ({ selected, menuItem, onClick, isMobileMenu, menuNumber }) => {
  const classes = useStyles({ isMobileMenu, menuNumber });
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      <ListItem
        button
        classes={{
          selected: classes.selectedItem,
          root: classes.listItem
        }}
        selected={selected}
        onClick={onClick}>
        {(isMobileMenu || matches) && menuItem.icon}
        <Hidden smDown implementation='css' className={classes.height}>
          <ListItemText>
            <Typography variant='h6' className={classes.menuFont} noWrap>{menuItem.text}</Typography>
          </ListItemText>
        </Hidden>
      </ListItem>

    </>
  );
};

export default memo(TopAppBarMenuItem);