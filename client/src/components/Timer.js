import React, { useContext, useEffect, useState } from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';
import { Wrapper } from './styles/timer.styles';
import { AuthContext } from '../context';
import { useHistory } from 'react-router-dom';

const Timer = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const { isLoggedIn, logOut, user, timeLeft, setTimeLeft } = authContext;

  const [color, setColor] = useState(null);
  const [size, setSize] = useState('tiny');

  const handleOnClick = () => {
    setColor(null);
    setSize('tiny');
    setTimeLeft(+process.env.REACT_APP_SESSION_TIMEOUT);
  };

  useEffect(() => {
    timeLeft < +process.env.REACT_APP_SESSION_ALERT && setColor('red');
    timeLeft < +process.env.REACT_APP_SESSION_ALERT && setSize(null);
    timeLeft > +process.env.REACT_APP_SESSION_ALERT && setColor(null);
    timeLeft > +process.env.REACT_APP_SESSION_ALERT && setSize('tiny');
    timeLeft === 0 && logOut() && history.push('/login');
    const timer =
      timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  return isLoggedIn ? (
    <Wrapper>
      <Label className='timer' as='div' color={color} size={size} image>
        <img
          className='img'
          src='https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
          alt='user'
        />
        {user?.firstName} {user?.lastName} ({user?.login})
        {timeLeft < +process.env.REACT_APP_SESSION_ALERT && (
          <Label.Detail>Niedługo nastąpi wylogowanie</Label.Detail>
        )}
        <Label.Detail>
          Sesja{' '}
          {timeLeft / 60 < 10
            ? '0' + Math.floor(timeLeft / 60)
            : Math.floor(timeLeft / 60)}
          :{timeLeft % 60 < 10 ? '0' + (timeLeft % 60) : timeLeft % 60}
        </Label.Detail>
      </Label>
      {timeLeft < +process.env.REACT_APP_SESSION_ALERT && (
        <Button className='btn' icon negative onClick={handleOnClick}>
          <Icon name='refresh' /> Odśwież
        </Button>
      )}
    </Wrapper>
  ) : null;
};

export default Timer;
