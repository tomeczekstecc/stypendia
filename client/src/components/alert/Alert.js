import React, { useContext } from 'react';
import { Message } from 'semantic-ui-react';
import './Alert.css';
import AlertContext from '../../context/alert/alertContext';

const Alert = (props) => {
  const alertContext = useContext(AlertContext);
  const { alerts, deleteAlert } = alertContext;

  return (
    <div className={`notification-container ${props.position}`}>
      {alerts.map((alert, i) => {
        if (props.autoDeleteInterval) {
          setInterval(() => {
            deleteAlert(alert.id);
          }, props.autoDeleteInterval);
        }

        switch (alert.resStatus) {
          case 'error':
            return (
              <div key={alert.id} className={`${props.position}`}>
                <Message error className='toast'>
                  <Message.Header>{alert.alertTitle}</Message.Header>
                  <p>{alert.msgPL}</p>
                </Message>
              </div>
            );
          case 'info':
            return (
              <div key={alert.id} className={`${props.position}`}>
                <Message info className='toast'>
                  <Message.Header>{alert.alertTitle}</Message.Header>
                  <p>{alert.msgPL}</p>
                </Message>
              </div>
            );

          case 'warning':
            return (
              <div key={alert.id} className={`${props.position}`}>
                <Message warning className='toast'>
                  <Message.Header>{alert.alertTitle}</Message.Header>
                  <p>{alert.msgPL}</p>
                </Message>
              </div>
            );

          case 'success':
            return (
              <div key={alert.id} className={`${props.position}`}>
                <Message success className='toast'>
                  <Message.Header>{alert.alertTitle}</Message.Header>
                  <p>{alert.msgPL}</p>
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
