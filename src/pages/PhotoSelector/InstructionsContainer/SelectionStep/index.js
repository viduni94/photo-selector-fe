import { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { StylesProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import styles from './selectionStep.module.scss';

const SelectionStep = ({
  stepText,
  heading,
  bodyText,
  buttonText,
  isButtonShown,
  buttonFunction,
  selectedPhotos,
}) => {
  return (
    <StylesProvider injectFirst>
      <Box>
        <Typography variant="subtitle1" component="div" className={styles.subtitle} gutterBottom>
          {stepText}
        </Typography>
        <Typography variant="h4" component="div" className={styles.heading} gutterBottom>
          {heading}
        </Typography>
        <Typography variant="body1" className={styles.bodyText} gutterBottom>
          {bodyText}
        </Typography>
        {isButtonShown ? (
          <Button
            variant="contained"
            className={styles.saveButton}
            onClick={buttonFunction}
            disabled={selectedPhotos.size < 9}>
            {buttonText}
          </Button>
        ) : (
          ''
        )}
      </Box>
    </StylesProvider>
  );
};

const mapStateToProps = ({ photoSelection }) => ({
  selectedPhotos: photoSelection.selectedPhotos,
});

SelectionStep.propTypes = {
  stepText: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  bodyText: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  isButtonShown: PropTypes.bool,
  buttonFunction: PropTypes.func,
  selectedPhotos: PropTypes.instanceOf(Map).isRequired,
};

SelectionStep.defaultProps = {
  isButtonShown: true,
  buttonText: '',
  buttonFunction: () => {},
};

export default connect(mapStateToProps)(memo(SelectionStep));
