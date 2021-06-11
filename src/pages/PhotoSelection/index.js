import { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ErrorBoundary from 'components/ErrorBoundary';
import PageLoader from 'components/PageLoader';
import PhotoGrid from 'components/PhotoGrid';
import { fetchPhotoGrid } from 'pages/Home/actions';
import constants from 'utils/constants';
import messages from 'utils/messages';
import styles from './photoSelection.module.scss';

const PhotoSelection = ({
  photoGrid,
  fetchPhotoGrid: fetchPhotoGridAction,
  isFetchPhotoGridPending,
}) => {
  const history = useHistory();

  useEffect(() => {
    fetchPhotoGridAction();
  }, []);

  const navigateToPhotoSelector = () => {
    history.push(constants.paths.photoSelector);
  };

  const renderPhotoGrid = () => {
    if (isFetchPhotoGridPending) {
      return <PageLoader />;
    }

    const { data } = photoGrid || {};
    return (
      <>
        <div className={styles.header}>
          <h2 className={styles.heading}>{constants.photoSelectionHeader}</h2>
          <Button
            variant="contained"
            className={styles.saveButton}
            onClick={navigateToPhotoSelector}>
            {messages.selectorPage.editButtonText}
          </Button>
        </div>
        <div className={styles.photoGridContainer}>
          <PhotoGrid tileData={data && data[0] ? data[0].entries : []} isEditMode={false} />
        </div>
      </>
    );
  };

  return <ErrorBoundary>{renderPhotoGrid()}</ErrorBoundary>;
};

const mapStateToProps = ({ photoSelection }) => ({
  photoGrid: photoSelection.photoGrid,
  isFetchPhotoGridPending: photoSelection.isPending,
});

PhotoSelection.propTypes = {
  photoGrid: PropTypes.shape({
    status: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.object),
  }),
  fetchPhotoGrid: PropTypes.func.isRequired,
  isFetchPhotoGridPending: PropTypes.bool,
};

PhotoSelection.defaultProps = {
  isFetchPhotoGridPending: false,
  photoGrid: {},
};

export default connect(mapStateToProps, { fetchPhotoGrid })(memo(PhotoSelection));
