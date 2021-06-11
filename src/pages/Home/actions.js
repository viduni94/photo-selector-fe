import axios from 'axios';
import {
  FETCH_PHOTO_GRID_SUCCESS,
  FETCH_PHOTO_GRID_ERROR,
  FETCH_PHOTO_GRID_PENDING,
  // SAVE_SELECTION_ERROR,
  STORE_SELECTED_PHOTOS,
} from 'utils/actionTypes';
import constants from 'utils/constants';
import { handle } from 'utils/handle';

const { links } = constants;
const { REACT_APP_API_URL } = process.env;

// Set fetch photo grid pending status
export const fetchPhotoGridPending = () => async dispatch => {
  return dispatch({
    type: FETCH_PHOTO_GRID_PENDING,
  });
};

// Store selected photos in the redux store
export const storeSelectedPhotos = selectedPhotos => {
  return {
    type: STORE_SELECTED_PHOTOS,
    payload: selectedPhotos,
  };
};

// Fetch saved photo grid from the database
export const fetchPhotoGrid = () => async dispatch => {
  dispatch(fetchPhotoGridPending());
  try {
    const [error, result] = await handle(
      axios.get(`${REACT_APP_API_URL}${links.photosGridEndpoint}`),
    );

    if (error) {
      return dispatch({
        type: FETCH_PHOTO_GRID_ERROR,
        payload: {
          status: error.response && error.response.status,
          text: error.response && error.response.statusText,
        },
      });
    }

    if (result.status === 200) {
      return dispatch({
        type: FETCH_PHOTO_GRID_SUCCESS,
        payload: {
          status: result.status,
          data: result.data,
        },
      });
    }

    return dispatch({
      type: FETCH_PHOTO_GRID_SUCCESS,
      payload: {
        status: result.status,
        data: [],
      },
    });
  } catch (error) {
    dispatch({
      type: FETCH_PHOTO_GRID_ERROR,
      payload: {
        text: JSON.stringify(error),
      },
    });
    return Promise.reject(error);
  }
};
