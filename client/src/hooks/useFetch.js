import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AlertContext, AppContext } from '../context';

const useFetch = (url) => {
  const appContext = useContext(AppContext);
  const { setIsLoading } = appContext;

  const alertContext = useContext(AlertContext);
  const { addAlert } = alertContext;

  const [data, setData] = useState([]);

  useEffect(() => {

    setIsLoading(true);
    axios
      .get(`/api/v1/${url}`)
      .then((data) => {

        setData(data.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response.data) {
          addAlert(err.response.data);
          setIsLoading(false);
          return;
        }
      });
  }, []);

  return { data };
};

export default useFetch;