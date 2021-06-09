import { memo } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ErrorBoundary from 'components/ErrorBoundary';
import { savePhotoSelection } from 'pages/PhotoSelector/actions';
import GridContainer from 'pages/PhotoSelector/GridContainer';
import InstructionsContainer from 'pages/PhotoSelector/InstructionsContainer';
import pageStyles from 'pages/pages.module.scss';
import styles from './photoSelector.module.scss';

const PhotoSelector = ({ selectedPhotos, savePhotoSelection: savePhotoSelectionAction }) => {
  const saveSelection = () => {
    savePhotoSelectionAction(selectedPhotos);
  };

  return (
    <>
      <div className={cx(pageStyles.container, styles.main)}>
        <ErrorBoundary>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <InstructionsContainer saveSelection={saveSelection} />
              </Grid>
              <Grid item xs={12} md={8}>
                <GridContainer />
              </Grid>
            </Grid>
          </Box>
        </ErrorBoundary>
      </div>
    </>
  );
};

const mapStateToProps = ({ photoSelection }) => ({
  selectedPhotos: photoSelection.selectedPhotos,
});

PhotoSelector.propTypes = {
  selectedPhotos: PropTypes.instanceOf(Map).isRequired,
  savePhotoSelection: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { savePhotoSelection })(memo(PhotoSelector));
