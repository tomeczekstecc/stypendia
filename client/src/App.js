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

// axios.defaults.baseURL = 'http://localhost:5003';
// axios.defaults.withCredentials = true;

function App() {
  return (
    <AlertState>
      <AppState>
        <Router>
          <AuthState>
            <SubmitState>
              <Layout>
                  <Beforeunload
                    onBeforeunload={(event) =>
                      'Możliwa utrata niezapisanych danych!!!'
                    }
                  />
                <Switch>
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/verify' component={Verify} />
                  <Route exact path='/reset' component={Reset} />
                  <Route exact path='/resetsend' component={ResetSend} />
                  <Route exact path='/resend' component={Resend} />
                  <Route exact path='/resend' component={Resend} />

                  <ProtectedRoute
                    exact
                    path='/changepass'
                    component={ChangePass}
                  />
                  <Route exact path='/login' component={Login} />
                  <ProtectedRoute exact path='/logout' component={Logout} />

                  <Route exact path='/submit' component={Submit} />

                  <ProtectedRoute exact path='/' component={Home} />

                  <ProtectedRoute exact path='/profile' component={Profile} />
                  <Route path='*' component={Page404} />
                </Switch>
              </Layout>
            </SubmitState>
          </AuthState>

          <Alert position={'bottom-right'} autoDeleteInterval={10000} />
        </Router>
      </AppState>
    </AlertState>
  );
}

export default App;
