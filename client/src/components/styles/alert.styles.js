import styled from 'styled-components';

export const Wrapper = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');

  .notification-container {
    font-size: 14px;

    box-sizing: border-box;
    position: fixed;
    z-index: 99999999;

    font-family: Lato, sans-serif;
  }

  .top-right {
    top: 12px;
    right: 12px;
    animation: toast-in-right 0.5s;
  }

  .bottom-right {
    bottom: 12px;
    right: 12px;
    animation: toast-in-right 0.5s;
  }

  .bottom-left {
    bottom: 12px;
    left: 12px;
    animation: toast-in-left 0.5s;
  }
  .top-left {
    top: 12px;
    left: 12px;
    animation: toast-in-left 0.5s;
  }

  .notification {
    background: #fff;
    transition: 0.3s ease;
    position: relative;
    pointer-events: auto;
    overflow: hidden;
    margin: 0 0 6px;
    margin-bottom: 15px;

    width: 300px;
    max-height: 100px;
    border-radius: 3px;
    box-shadow: 0 0 10px #999;
    color: #000;
    opacity: 0.9;
    padding: 20px;
  }

  .notification:hover {
    box-shadow: 0 0 12px #fff;
    opacity: 1;
    cursor: pointer;
  }
  .notification-title {
    font-weight: 700 !important;
    font-size: 16px !important;
    text-align: left !important;
    margin-top: -10px !important;
    margin-bottom: 6px !important;
    margin-left: 10px !important;
    width: 300px !important;
    height: 18px !important;
  }

  .notification-message {
    margin-left: 10px;
    text-align: left;
    height: 18px;
    margin-bottom: 6px;
  }
  .notification-image {
    float: left;
    margin-right: 15px;
    font-size: 36px;
  }

  .toast {
    height: 85px;
    width: 450px;
    color: #fff;
    padding: 20px 15px 10px 10px;
    margin-top: 5px !important;
  }

  @keyframes toast-in-right {
    from {
      transform: translateX(100%);
    }
    to {
      translate: translateX(0);
    }
  }
  @keyframes toast-in-left {
    from {
      transform: translateX(-100%);
    }
    to {
      translate: translateX(0);
    }
  }

  .close-button {
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 18px;
  }
`;
