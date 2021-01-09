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
import Resend from './pages/resend';
import ResetSend from './pages/resetSend';
import Reset from './pages/reset';
import Logout from './pages/logout';
import ChangePass from './pages/changePass';
import ProtectedRoute from './pages/protectedRoute'
import Submit from './pages/submit';
import SubmitState from './context/submit/submitState';

axios.defaults.baseURL = 'http://localhost:5003';
axios.defaults.withCredentials = true;

function App() {
  return (
      <AlertState>
    <Router>
        <AuthState>
          <SubmitState>
          <Layout>
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/verify' component={Verify} />
              <Route exact path='/reset' component={Reset} />
              <Route exact path='/resetsend' component={ResetSend} />
              <Route exact path='/resend' component={Resend} />
              <ProtectedRoute exact path='/changepass' component={ChangePass} />
              <ProtectedRoute exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
              <ProtectedRoute exact path='/logout' component={Logout} />
              <ProtectedRoute exact path='/submit' component={Submit} />
            </Switch>
          </Layout></SubmitState>
        </AuthState>

        <Alert position={'bottom-right'} autoDeleteInterval={10000} />
    </Router>
      </AlertState>
  );
}

export default App;
