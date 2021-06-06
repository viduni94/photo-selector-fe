import { FETCH_UPLOADED_PHOTOS_SUCCESS, FETCH_UPLOADED_PHOTOS_ERROR } from 'utils/actionTypes';

const initialState = {
  uploadedPhotos: [],
  hasError: false,
  error: undefined,
};

export default function photoSelectorReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_UPLOADED_PHOTOS_SUCCESS:
      return {
        ...state,
        uploadedPhotos: action.payload.entries,
        hasError: false,
        error: undefined,
      };
    case FETCH_UPLOADED_PHOTOS_ERROR:
      return {
        ...state,
        hasError: true,
        error: action.payload,
      };
    default:
      return state;
  }
}
