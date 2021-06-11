import { Switch, Route } from 'react-router-dom';
import Home from 'pages/Home';
import PhotoSelection from 'pages/PhotoSelection';
import PhotoSelector from 'pages/PhotoSelector';
import constants from 'utils/constants';

function App() {
  return (
    <Switch>
      <Route exact path={constants.paths.home} component={Home} />
      <Route exact path={constants.paths.photoSelector} component={PhotoSelector} />
      <Route exact path={constants.paths.photoGrid} component={PhotoSelection} />
    </Switch>
  );
}

export default App;
