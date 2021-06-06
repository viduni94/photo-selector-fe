import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import Alert from 'components/Feedback/Alert';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const ToastMessage = ({ type, message }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const hideMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={hideMessage}>
        <Alert onClose={hideMessage} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

ToastMessage.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default memo(ToastMessage);
