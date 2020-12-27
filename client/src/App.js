import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './components/commonLayout/Layout';
import 'semantic-ui-css/semantic.min.css';
import Register from './pages/register';
import Home from './pages/home';
import Login from './pages/login';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import axios from 'axios';
import Alert from './components/alert/Alert';
import Verify from './pages/verify';

axios.defaults.baseURL = 'http://localhost:5003';
axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <AlertState>
        <AuthState>
          <Layout>
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/verify' component={Verify} />
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </Layout>
        </AuthState>
      <Alert position={'bottom-right'} autoDeleteInterval={7000} />
      </AlertState>
    </Router>
  );
}

export default App;
