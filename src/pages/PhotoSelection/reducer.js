import {
  SAVE_SELECTION_SUCCESS,
  SAVE_SELECTION_ERROR,
  STORE_SELECTED_PHOTOS,
  FETCH_PHOTO_GRID_PENDING,
  FETCH_PHOTO_GRID_SUCCESS,
  FETCH_PHOTO_GRID_ERROR,
} from 'utils/actionTypes';

const initialState = {
  selectedPhotos: new Map(),
  hasSaveError: false,
  saveError: undefined,
  isPending: false,
  photoGrid: undefined,
  fetchError: undefined,
  hasFetchError: false,
};

export default function photoSelectionReducer(state = initialState, action) {
  switch (action.type) {
    case STORE_SELECTED_PHOTOS:
      return {
        ...state,
        selectedPhotos: new Map(action.payload),
      };
    case SAVE_SELECTION_SUCCESS:
      return {
        ...state,
        selectedPhotos: new Map(action.payload.entries),
        hasSaveError: false,
        saveError: undefined,
      };
    case SAVE_SELECTION_ERROR:
      return {
        ...state,
        hasSaveError: true,
        saveError: action.payload,
      };
    case FETCH_PHOTO_GRID_PENDING:
      return {
        ...state,
        isPending: true,
      };
    case FETCH_PHOTO_GRID_SUCCESS:
      return {
        ...state,
        isPending: false,
        photoGrid: action.payload,
        hasFetchError: false,
        fetchError: undefined,
      };
    case FETCH_PHOTO_GRID_ERROR:
      return {
        ...state,
        isPending: false,
        hasFetchError: true,
        fetchError: action.payload,
      };
    default:
      return state;
  }
}
