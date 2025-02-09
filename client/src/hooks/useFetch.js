import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AlertContext, AppContext, AuthContext } from '../context';

const useFetch = (url) => {
  const appContext = useContext(AppContext);
  const { setIsLoading } = appContext;

  const authContext = useContext(AuthContext);
  const { resetTimeLeft, isLoggedIn } = authContext;

  const alertContext = useContext(AlertContext);
  const { addAlert } = alertContext;

  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    isLoggedIn &&
      axios
        .get(`/api/v1/${url}`)
        .then((data) => {
          setData(data.data.data);
          setIsLoading(false);
        })
        .catch((err) => {
          if (err.response.data) {
            if (
              err.response.data.msgPL ===
              'Musisz być zalogowany i konto musi być potwierdzone by wykonać tę operację'
            ) {
              setIsLoading(false);
              return;
            }
            console.log(err.response.data);

            addAlert(err.response.data);
            setIsLoading(false);
            return;
          }
        });
    resetTimeLeft();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return { data };
};

export default useFetch;
