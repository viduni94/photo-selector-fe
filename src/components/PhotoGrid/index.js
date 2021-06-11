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
const getBadgeContentForPhoto = ({ photoId, selectedPhotos, index, isEditMode }) => {
  if (isEditMode) {
    const photoIdArrayInOrder = [...selectedPhotos.keys()];
    const indexOfPhoto = photoIdArrayInOrder && photoIdArrayInOrder.indexOf(photoId);

    return indexOfPhoto + 1;
  }
  return index + 1;
};

/**
 * The Photo Grid component that holds the given photo in a grid format
 */
const PhotoGrid = ({ tileData, selectedPhotos, togglePhotoSelection, isEditMode }) => {
  return (
    <StylesProvider injectFirst>
      <div className={styles.root}>
        <GridList className={styles.gridList} cols={3}>
          {tileData.map((tile, index) => (
            <GridListTile
              key={tile.id}
              cols={1}
              className={styles.tile}
              onClick={isEditMode ? () => togglePhotoSelection(tile) : undefined}>
              {/* The index is passed to the URL to prevent browser caching for the image */}
              <img src={`${tile.picture}?${index}`} alt={tile.title} />
              {isEditMode && isPhotoSelected({ photoId: tile.id, selectedPhotos }) ? (
                <Badge
                  badgeContent={getBadgeContentForPhoto({
                    photoId: tile.id,
                    selectedPhotos,
                    isEditMode,
                  })}
                  className={styles.badge}>
                  <CheckBoxIcon />
                </Badge>
              ) : (
                <Badge
                  badgeContent={getBadgeContentForPhoto({
                    photoId: tile.id,
                    selectedPhotos,
                    index,
                    isEditMode,
                  })}
                  className={styles.badge}
                />
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
  togglePhotoSelection: PropTypes.func,
  isEditMode: PropTypes.bool,
};

PhotoGrid.defaultProps = {
  tileData: [],
  selectedPhotos: new Map(),
  isEditMode: true,
  togglePhotoSelection: () => {},
};

export default memo(PhotoGrid);
