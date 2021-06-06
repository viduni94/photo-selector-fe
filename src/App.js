import { Switch, Route } from 'react-router-dom';
import PhotoSelector from 'pages/PhotoSelector';
import constants from 'utils/constants';

function App() {
  return (
    <Switch>
      <Route path={constants.paths.home} component={PhotoSelector} />
      <Route path={constants.paths.photoSelector} component={PhotoSelector} />
    </Switch>
  );
}

export default App;
