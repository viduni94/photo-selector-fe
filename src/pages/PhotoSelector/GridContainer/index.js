import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PhotoGrid from 'components/PhotoGrid';
import { fetchPhotoGrid } from 'pages/Home/actions';
import { getAllPhotos, storeSelectedPhotos } from 'pages/PhotoSelector/actions';
import styles from './gridContainer.module.scss';

class GridContainer extends PureComponent {
  componentDidMount() {
    const { getAllPhotos: getAllPhotosAction, fetchPhotoGrid: fetchPhotoGridAction } = this.props;
    getAllPhotosAction();
    fetchPhotoGridAction();
  }

  componentDidUpdate(prevProps) {
    const { photoGrid, storeSelectedPhotos: storeSelectedPhotosAction } = this.props;

    if (prevProps.photoGrid !== photoGrid && photoGrid && photoGrid.data && photoGrid.data[0]) {
      const entriesMap = new Map(photoGrid.data[0].entries.map(entry => [entry.id, entry]));
      storeSelectedPhotosAction(entriesMap);
    }
  }

  // Select or deselect photo for the photo grid
  togglePhotoSelection = photoObject => {
    const { selectedPhotos, storeSelectedPhotos: storeSelectedPhotosAction } = this.props;
    const photoId = photoObject.id;
    const modifiedSelectedPhotos = new Map(selectedPhotos);

    if (!selectedPhotos.has(photoId)) {
      // Add photo to selected photos array
      if (selectedPhotos.size < 9) {
        modifiedSelectedPhotos.set(photoId, photoObject);
        storeSelectedPhotosAction(modifiedSelectedPhotos);
      }
    } else {
      // Delete the photo from selected photos
      modifiedSelectedPhotos.delete(photoId);
      storeSelectedPhotosAction(modifiedSelectedPhotos);
    }
  };

  render() {
    const { uploadedPhotos, selectedPhotos } = this.props;

    return (
      <div className={styles.main}>
        <PhotoGrid
          tileData={uploadedPhotos}
          selectedPhotos={selectedPhotos}
          togglePhotoSelection={this.togglePhotoSelection}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ photoSelector, photoSelection }) => ({
  uploadedPhotos: photoSelector.uploadedPhotos,
  selectedPhotos: photoSelection.selectedPhotos,
  photoGrid: photoSelection.photoGrid,
});

GridContainer.propTypes = {
  uploadedPhotos: PropTypes.instanceOf(Array),
  getAllPhotos: PropTypes.func.isRequired,
  selectedPhotos: PropTypes.instanceOf(Map).isRequired,
  storeSelectedPhotos: PropTypes.func.isRequired,
  photoGrid: PropTypes.shape({
    status: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.object),
  }),
  fetchPhotoGrid: PropTypes.func.isRequired,
};

GridContainer.defaultProps = {
  uploadedPhotos: [],
  photoGrid: {},
};

export default connect(mapStateToProps, { getAllPhotos, storeSelectedPhotos, fetchPhotoGrid })(
  GridContainer,
);
