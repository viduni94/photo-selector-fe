import { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { StylesProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import messages from 'utils/messages';
import styles from './selectionStep.module.scss';

/**
 * The component that contains single instruction steps and
 * relevant actions
 */
const SelectionStep = ({
  stepText,
  heading,
  bodyText,
  isButtonShown,
  saveSelection,
  updateSelection,
  selectedPhotos,
  photoGrid,
}) => {
  const renderButton = () => {
    if (photoGrid && photoGrid.data && photoGrid.data[0] && isButtonShown) {
      return (
        <Button
          variant="contained"
          className={styles.saveButton}
          onClick={updateSelection}
          disabled={selectedPhotos.size < 9}>
          {messages.selectorPage.updateButtonText}
        </Button>
      );
    }

    if (isButtonShown) {
      return (
        <Button
          variant="contained"
          className={styles.saveButton}
          onClick={saveSelection}
          disabled={selectedPhotos.size < 9}>
          {messages.selectorPage.saveButtonText}
        </Button>
      );
    }

    return '';
  };

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
        {renderButton()}
      </Box>
    </StylesProvider>
  );
};

const mapStateToProps = ({ photoSelection }) => ({
  selectedPhotos: photoSelection.selectedPhotos,
  photoGrid: photoSelection.photoGrid,
});

SelectionStep.propTypes = {
  stepText: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  bodyText: PropTypes.string.isRequired,
  isButtonShown: PropTypes.bool,
  updateSelection: PropTypes.func,
  saveSelection: PropTypes.func,
  selectedPhotos: PropTypes.instanceOf(Map).isRequired,
  photoGrid: PropTypes.shape({
    status: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.object),
  }),
};

SelectionStep.defaultProps = {
  isButtonShown: true,
  updateSelection: () => {},
  saveSelection: () => {},
  photoGrid: {},
};

export default connect(mapStateToProps)(memo(SelectionStep));
