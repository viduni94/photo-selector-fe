import { memo } from 'react';
import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { StylesProvider } from '@material-ui/core/styles';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import styles from './photoGrid.module.scss';

/**
 * Checks whether the given photo is already selected
 * @param {*} photoId
 * @param {*} selectedPhotos
 * @returns true if photo of @param photoId is selected
 * else returns false
 */
const isPhotoSelected = ({ photoId, selectedPhotos }) => {
  return selectedPhotos.has(photoId);
};

/**
 * Gets the order of an already selected photo
 * @param {*} photoId
 * @param {*} selectedPhotos
 * @returns order count of the photo of @param photoId
 */
const getBadgeContentForPhoto = ({ photoId, selectedPhotos }) => {
  const photoIdArrayInOrder = [...selectedPhotos.keys()];
  const indexOfPhoto = photoIdArrayInOrder && photoIdArrayInOrder.indexOf(photoId);

  return indexOfPhoto + 1;
};

const PhotoGrid = ({ tileData, selectedPhotos, togglePhotoSelection }) => {
  return (
    <StylesProvider injectFirst>
      <div className={styles.root}>
        <GridList className={styles.gridList} cols={3}>
          {tileData.map(tile => (
            <GridListTile
              key={tile.id}
              cols={1}
              className={styles.tile}
              onClick={() => togglePhotoSelection(tile)}>
              {/* The index is passed to the URL to prevent browser caching for the image */}
              <img src={tile.picture} alt={tile.title} />
              {isPhotoSelected({ photoId: tile.id, selectedPhotos }) ? (
                <Badge
                  badgeContent={getBadgeContentForPhoto({
                    photoId: tile.id,
                    selectedPhotos,
                  })}
                  className={styles.badge}>
                  <CheckBoxIcon />
                </Badge>
              ) : (
                ''
              )}
            </GridListTile>
          ))}
        </GridList>
      </div>
    </StylesProvider>
  );
};

PhotoGrid.propTypes = {
  tileData: PropTypes.arrayOf(PropTypes.object),
  selectedPhotos: PropTypes.instanceOf(Map),
  togglePhotoSelection: PropTypes.func.isRequired,
};

PhotoGrid.defaultProps = {
  tileData: [],
  selectedPhotos: new Map(),
};

export default memo(PhotoGrid);
