import axios from 'axios';
import { useState } from 'react';
import { Button } from 'semantic-ui-react';

const Test = () => {
  const [error, setErrors] = useState();
  const [loading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('tomeczekstecc@gmail.com')

  const handleOnClick = async (e) => {
    setErrors('');
    e.preventDefault();
    setIsLoading(true);
    const csrfData = await axios.get('/api/v1/csrf');
    axios
      .post(`/api/v1/email/resend`, { email, _csrf: csrfData.data.csrfToken })
      .then(async (data) => {
        if (data.data.resStatus || data.data.resStatus === 'success') {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (err.response.data.alertTitle) {
          setIsLoading(false);
        }

        setErrors(err.response.data);
        setIsLoading(false);
      });
  };
  return (
    <>
      <Button loading={loading} onClick={handleOnClick}>Test mail</Button>
    </>
  );
};

export default Test;
