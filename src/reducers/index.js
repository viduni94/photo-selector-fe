import { combineReducers } from 'redux';
import photoSelectionReducer from 'pages/PhotoSelection/reducer';
import photoSelectorReducer from 'pages/PhotoSelector/reducer';

export default combineReducers({
  photoSelector: photoSelectorReducer,
  photoSelection: photoSelectionReducer,
});
