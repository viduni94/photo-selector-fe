/* eslint-disable no-underscore-dangle */
import { memo } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ErrorBoundary from 'components/ErrorBoundary';
import { fetchPhotoGrid } from 'pages/Home/actions';
import { savePhotoSelection, updatePhotoSelection } from 'pages/PhotoSelector/actions';
import GridContainer from 'pages/PhotoSelector/GridContainer';
import InstructionsContainer from 'pages/PhotoSelector/InstructionsContainer';
import pageStyles from 'pages/pages.module.scss';
import styles from './photoSelector.module.scss';

/**
 * Component that contains the grid for uploaded photos
 * and the instructions for photo selection for the photo grid
 */
const PhotoSelector = ({
  selectedPhotos,
  savePhotoSelection: savePhotoSelectionAction,
  authorId,
  updatePhotoSelection: updatePhotoSelectionAction,
  photoGrid,
}) => {
  const history = useHistory();

  // Dispatch action to save the selected photos in the database
  const saveSelection = () => {
    savePhotoSelectionAction({ selectedPhotos, authorId, history });
  };

  const updateSelection = () => {
    const photoGridId = photoGrid && photoGrid.data && photoGrid.data[0]._id;
    updatePhotoSelectionAction({ selectedPhotos, authorId, photoGridId, history });
  };

  return (
    <>
      <div className={cx(pageStyles.container, styles.main)}>
        <ErrorBoundary>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <InstructionsContainer
                  saveSelection={saveSelection}
                  updateSelection={updateSelection}
                />
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

const mapStateToProps = ({ photoSelection, photoSelector }) => ({
  selectedPhotos: photoSelection.selectedPhotos,
  authorId: photoSelector.authorId,
  photoGrid: photoSelection.photoGrid,
});

PhotoSelector.propTypes = {
  selectedPhotos: PropTypes.instanceOf(Map).isRequired,
  authorId: PropTypes.string,
  savePhotoSelection: PropTypes.func.isRequired,
  updatePhotoSelection: PropTypes.func.isRequired,
  photoGrid: PropTypes.shape({
    status: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.object),
  }),
};

PhotoSelector.defaultProps = {
  authorId: '',
  photoGrid: {},
};

export default connect(mapStateToProps, {
  savePhotoSelection,
  fetchPhotoGrid,
  updatePhotoSelection,
})(memo(PhotoSelector));
