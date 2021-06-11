import { FETCH_UPLOADED_PHOTOS_SUCCESS } from 'utils/actionTypes';

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
        authorId: action.payload.author.id,
        hasError: false,
        error: undefined,
      };
    default:
      return state;
  }
}
