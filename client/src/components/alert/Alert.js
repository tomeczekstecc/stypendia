/* eslint-disable array-callback-return */
import React, { useContext } from 'react';
import { Message } from 'semantic-ui-react';
import { FaTimes } from 'react-icons/fa';

import { Close, Wrapper } from '../styles/alert.styles';
import AlertContext from '../../context/alert/alertContext';

const Alert = (props) => {
  const alertContext = useContext(AlertContext);
  const { alerts, deleteAlert } = alertContext;

  return (
    <Wrapper>
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
                  <Close color={'#9c0000'}>
                    <FaTimes
                      className='close-button'
                      onClick={() => deleteAlert(alert.id)}
                    />
                  </Close>
                  <Message error className='notification'>
                    <Message.Header className='notification-title'>
                      {alert.alertTitle}
                    </Message.Header>
                    <Message.Content className='notification-message'>
                      <p> {alert.msgPL}</p>
                    </Message.Content>
                  </Message>
                </div>
              );
            case 'info':
              return (
                <div key={alert.id} className={`${props.position}`}>
                  <Close color={'#00586e'}>
                    <FaTimes
                      className='close-button'
                      onClick={() => deleteAlert(alert.id)}
                    />
                  </Close>
                  <Message info className='notification'>
                    <Message.Header className='notification-title'>
                      {alert.alertTitle}
                    </Message.Header>
                    <Message.Content className='notification-message'>
                      <p> {alert.msgPL}</p>
                    </Message.Content>
                  </Message>
                </div>
              );

            case 'warning':
              return (
                <div key={alert.id} className={`${props.position}`}>
                  <Close color={'#5c3f00'}>
                    <FaTimes
                      className='close-button'
                      onClick={() => deleteAlert(alert.id)}
                    />
                  </Close>
                  <Message warning className='notification'>
                    <Message.Header className='notification-title'>
                      {alert.alertTitle}
                    </Message.Header>
                    <Message.Content className='notification-message'>
                      <p> {alert.msgPL}</p>
                    </Message.Content>
                  </Message>
                </div>
              );

            case 'success':
              return (
                <div key={alert.id} className={`${props.position}`}>
                  <Close color={'#002e0c'}>
                    <FaTimes
                      className='close-button'
                      onClick={() => deleteAlert(alert.id)}
                    />
                  </Close>
                  <Message success className='notification'>
                    <Message.Header className='notification-title'>
                      {alert.alertTitle}
                    </Message.Header>
                    <Message.Content className='notification-message'>
                      <p> {alert.msgPL}</p>
                    </Message.Content>
                  </Message>
                </div>
              );

            default:
              break;
          }
        })}
      </div>
    </Wrapper>
  );
};

export default Alert;
