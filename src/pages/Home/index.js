/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import PageLoader from 'components/PageLoader';
import constants from 'utils/constants';
import { fetchPhotoGrid } from './actions';

const Home = ({ photoGrid, isFetchPhotoGridPending, fetchPhotoGrid: fetchPhotoGridAction }) => {
  const history = useHistory();
  const [photoGridForComponent, setPhotoGridForComponent] = useState();

  useEffect(() => {
    fetchPhotoGridAction();
  }, []);

  useEffect(() => {
    const photoGridEntries =
      photoGrid && photoGrid.data && photoGrid.data[0] && photoGrid.data[0].entries;
    setPhotoGridForComponent(photoGridEntries);
  }, [Object.keys(photoGrid)]);

  const renderSection = () => {
    if (isFetchPhotoGridPending) {
      return <PageLoader />;
    }

    if (!isFetchPhotoGridPending && photoGridForComponent) {
      return history.push(constants.paths.photoGrid);
    }

    if (!isFetchPhotoGridPending && photoGrid && photoGrid.status === 204) {
      return history.push(constants.paths.photoSelector);
    }
  };

  return <div>{renderSection()}</div>;
};

const mapStateToProps = ({ photoSelection }) => ({
  isFetchPhotoGridPending: photoSelection.isPending,
  photoGrid: photoSelection.photoGrid,
  fetchError: photoSelection.fetchError,
  hasFetchError: photoSelection.hasFetchError,
});

Home.propTypes = {
  fetchPhotoGrid: PropTypes.func.isRequired,
  photoGrid: PropTypes.shape({
    status: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.object),
  }),
  isFetchPhotoGridPending: PropTypes.bool,
};

Home.defaultProps = {
  photoGrid: {},
  isFetchPhotoGridPending: true,
};

export default connect(mapStateToProps, { fetchPhotoGrid })(memo(Home));
