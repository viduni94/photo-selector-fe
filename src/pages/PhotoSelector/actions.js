import axios from 'axios';
import {
  FETCH_UPLOADED_PHOTOS_SUCCESS,
  FETCH_UPLOADED_PHOTOS_ERROR,
  SAVE_SELECTION_SUCCESS,
  SAVE_SELECTION_ERROR,
  STORE_SELECTED_PHOTOS,
} from 'utils/actionTypes';
import constants from 'utils/constants';
import { to } from 'utils/to';

const { links } = constants;

// Get uploaded photos list
export const getAllPhotos = () => async dispatch => {
  const [error, result] = await to(axios.get(links.retrieveUploadedPhotosEndpoint));

  if (result) {
    return dispatch({
      type: FETCH_UPLOADED_PHOTOS_SUCCESS,
      payload: result.data,
    });
  }
  dispatch({
    type: FETCH_UPLOADED_PHOTOS_ERROR,
    payload: {
      status: error.response && error.response.status,
      text: error.response && error.response.statusText,
    },
  });
};

// Store selected photos in the redux store
export const storeSelectedPhotos = selectedPhotos => {
  console.log(selectedPhotos);
  return {
    type: STORE_SELECTED_PHOTOS,
    payload: selectedPhotos,
  };
};

// Save the selected photos
export const savePhotoSelection = selectedPhotos => async dispatch => {
  const [error, result] = await to(axios.post(links.photosGridEndpoint, selectedPhotos));

  if (result) {
    return dispatch({
      type: SAVE_SELECTION_SUCCESS,
      payload: result.data,
    });
  }

  dispatch({
    type: SAVE_SELECTION_ERROR,
    payload: {
      status: error.response && error.response.status,
      text: error.response && error.response.statusText,
    },
  });
};
