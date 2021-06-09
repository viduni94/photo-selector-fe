import {
  SAVE_SELECTION_SUCCESS,
  SAVE_SELECTION_ERROR,
  STORE_SELECTED_PHOTOS,
} from 'utils/actionTypes';

const initialState = {
  selectedPhotos: new Map(),
  hasError: false,
  saveError: undefined,
};

export default function photoSelectionReducer(state = initialState, action) {
  switch (action.type) {
    case STORE_SELECTED_PHOTOS:
    case SAVE_SELECTION_SUCCESS:
      return {
        ...state,
        selectedPhotos: new Map(action.payload),
        hasError: false,
        saveError: undefined,
      };
    case SAVE_SELECTION_ERROR:
      return {
        ...state,
        hasError: true,
        saveError: action.payload,
      };
    default:
      return state;
  }
}
