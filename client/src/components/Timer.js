import React, { useContext, useEffect, useState } from 'react';
import { Icon, Label } from 'semantic-ui-react';
import { Wrapper } from './styles/timer.styles';
import AuthContext from '../context/auth/authContext';



const Timer = () => {
  const authContext = useContext(AuthContext);
  const { isLoggedIn, logOut, user, timeLeft, setTimeLeft } = authContext;

  const [color, setColor] = useState(null);
  const [size, setSize] = useState('tiny');



  useEffect(() => {
    timeLeft < +process.env.REACT_APP_SESSION_ALERT && setColor('red');
    timeLeft < +process.env.REACT_APP_SESSION_ALERT && setSize('');
    timeLeft === 0 && logOut();
    const timer =
      timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);


  return isLoggedIn ? (
    <Wrapper>
      <Label cllassName='timer' as='div' color={color} size={size} image>
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
    </Wrapper>
  ) : null;
};

export default Timer;
