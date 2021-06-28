import {BrowserRouter as Router, Switch } from 'react-router-dom';
import routes from './config/routes';
import { EndoscopyProvider } from './context';
import AppRoute from './components/AppRoutes';

function App() {
  return (
    <div className="App">
      <EndoscopyProvider>
        <Router>
          <Switch>
            {
              routes.map((route) => (
                <AppRoute
                  key={route.path}
                  path={route.path}
                  component={route.component}
                  isPrivate={route.isPrivate}
                />
              ))
            }
          </Switch>
        </Router>
      </EndoscopyProvider>
    </div>
  );
}

export default App;
