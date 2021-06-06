import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import App from 'App';
import rootReducer from 'reducers';
import constants from 'utils/constants';

import './assets/styles/index.scss';

const initialState = {};

const middleware = [thunk];

const composeEnhancers = composeWithDevTools({ serialize: true });
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware)),
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path={constants.paths.home} component={App} />
    </Router>
  </Provider>,
  document.querySelector('#root'),
);
