import axios from 'axios';
import uploadedPhotosData from 'pages/PhotoSelector/__mocks__/uploadedPhotosData.json';
import {
  FETCH_UPLOADED_PHOTOS_SUCCESS,
  SAVE_SELECTION_SUCCESS,
  SAVE_SELECTION_ERROR,
  STORE_SELECTED_PHOTOS,
  UPDATE_SELECTION_ERROR,
  UPDATE_SELECTION_SUCCESS,
} from 'utils/actionTypes';
import constants from 'utils/constants';
import { handle } from 'utils/handle';

const { links, paths } = constants;
const { REACT_APP_API_URL } = process.env;

// Get uploaded photos list
export const getAllPhotos = () => async dispatch => {
  return dispatch({
    type: FETCH_UPLOADED_PHOTOS_SUCCESS,
    payload: uploadedPhotosData.data,
  });
};

// Store selected photos in the redux store
export const storeSelectedPhotos = selectedPhotos => {
  return {
    type: STORE_SELECTED_PHOTOS,
    payload: selectedPhotos,
  };
};

// Save the selected photos in the database
export const savePhotoSelection =
  ({ selectedPhotos, authorId, history }) =>
  async dispatch => {
    try {
      const [error, result] = await handle(
        axios.post(`${REACT_APP_API_URL}${links.photosGridEndpoint}`, {
          authorId,
          entries: Array.from(selectedPhotos.values()),
        }),
      );

      if (result) {
        history.push(paths.photoGrid);
        return dispatch({
          type: SAVE_SELECTION_SUCCESS,
          payload: result.data,
        });
      }

      return dispatch({
        type: SAVE_SELECTION_ERROR,
        payload: {
          status: error.response && error.response.status,
          text: error.response && error.response.statusText,
        },
      });
    } catch (error) {
      dispatch({
        type: SAVE_SELECTION_ERROR,
        payload: {
          text: JSON.stringify(error),
        },
      });
      return Promise.reject(error);
    }
  };

// Update the photo grid in the database
export const updatePhotoSelection =
  ({ selectedPhotos, authorId, photoGridId, history }) =>
  async dispatch => {
    try {
      const [error, result] = await handle(
        axios.put(`${REACT_APP_API_URL}${links.photosGridEndpoint}`, {
          photoGridId,
          authorId,
          entries: Array.from(selectedPhotos.values()),
        }),
      );

      if (result) {
        history.push(paths.photoGrid);
        return dispatch({
          type: UPDATE_SELECTION_SUCCESS,
          payload: result.data,
        });
      }

      return dispatch({
        type: UPDATE_SELECTION_ERROR,
        payload: {
          status: error.response && error.response.status,
          text: error.response && error.response.statusText,
        },
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SELECTION_ERROR,
        payload: {
          text: JSON.stringify(error),
        },
      });
      return Promise.reject(error);
    }
  };
