import React, { useContext } from 'react';
import { Message } from 'semantic-ui-react';
import './Alert.css';
import { AlertContext } from '../../context/alert/alertContext';


const Alert = (props) => {
  const { state, dispatch } = useContext(AlertContext);

  return (
    <div className={`notification-container ${props.position}`}>
      {state.map((notification, i) => {
        if (props.autoDeleteInterval) {
          setInterval(() => {
            dispatch({
              type: 'DELETE_NOTIFICATION',
              payload: notification.id,
            });
          }, props.autoDeleteInterval);
        }

        switch (notification.type) {
          case 'error':
            return (
              <div key={notification.id} className={`${props.position}`}>
                <Message error className='toast'>
                  <Message.Header>{notification.title}</Message.Header>
                  <p>{notification.message}</p>
                </Message>
              </div>
            );
          case 'info':
            return (
              <div key={notification.id} className={`${props.position}`}>
                <Message info className='toast'>
                  <Message.Header>{notification.title}</Message.Header>
                  <p>{notification.message}</p>
                </Message>
              </div>
            );

          case 'warning':
            return (
              <div key={notification.id} className={`${props.position}`}>
                <Message warning className='toast'>
                  <Message.Header>{notification.title}</Message.Header>
                  <p>{notification.message}</p>
                </Message>
              </div>
            );

          case 'success':
            return (
              <div key={notification.id} className={`${props.position}`}>
                <Message success className='toast'>
                  <Message.Header>{notification.title}</Message.Header>
                  <p>{notification.message}</p>
                </Message>
              </div>
            );

          default:
            break;
        }
      })}
    </div>
  );
};

export default Alert;
