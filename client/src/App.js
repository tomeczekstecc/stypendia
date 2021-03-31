import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Layout from './components/commonLayout/Layout';
import 'semantic-ui-css/semantic.min.css';
import {
  Register,
  Home,
  Login,
  Verify,
  Resend,
  ResetSend,
  Reset,
  Logout,
  ChangePass,
  ProtectedRoute,
  Submit,
  Page404,
  Profile,
} from './pages';
import { AuthState, AlertState, AppState, SubmitState } from './context';
import { Alert } from './components';
import { Beforeunload } from 'react-beforeunload';
import Privacy from './pages/Privacy';
import Aviability from './pages/Aviability';
import Regulations from './pages/regulations';

// axios.defaults.baseURL = 'http://localhost:5003';
// axios.defaults.withCredentials = true;

function App() {
  return (
    <Beforeunload
      onBeforeunload={(event) => 'Możliwa utrata niezapisanych danych!!!'}
    >
      <AlertState>
        <AppState>
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
                    <ProtectedRoute
                      exact
                      path='/changepass'
                      component={ChangePass}
                    />
                    <Route exact path='/submit' component={Submit} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/privacy' component={Privacy} />
                    <Route exact path='/aviability' component={Aviability} />
                    <Route exact path='/Regulations' component={Regulations} />

                    <ProtectedRoute exact path='/logout' component={Logout} />

                    <ProtectedRoute exact path='/' component={Home} />

                    <ProtectedRoute exact path='/profile' component={Profile} />
                    <Route path='*' component={Page404} />
                  </Switch>
                </Layout>
              </SubmitState>
            </AuthState>

            <Alert position={'bottom-right'} autoDeleteInterval={7000} />
          </Router>
        </AppState>
      </AlertState>
    </Beforeunload>
  );
}

export default App;
