import { memo } from 'react';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = props => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default memo(Alert);