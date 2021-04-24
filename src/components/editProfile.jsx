import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
      },
  }));

export default function EditProfile() {
    const classes = useStyles();
    return (
        <div>
            <Typography
                component="h1"
                variant="h6"
                color="textSecondary"
                display="block"
                noWrap
                sx={{ flexGrow: 1 }}
                >
                Name
            </Typography>
            <Typography
                component="h1"
                variant="h6"
                color="textSecondary"
                display="block"
                noWrap
                sx={{ flexGrow: 1 }}
                >
                Email
            </Typography>
            <Typography
                component="h1"
                variant="h6"
                color="textSecondary"
                display="block"
                noWrap
                sx={{ flexGrow: 1 }}
                >
                Reward
            </Typography>
        </div>
    );
}