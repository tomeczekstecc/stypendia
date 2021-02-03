import styled from 'styled-components';

export const Wrapper = styled.div`
  .notification-container {
    font-size: 14px;
    box-sizing: border-box;
    position: fixed;
    z-index: 99999999;
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
    min-width: 350px;
    margin-top:5px !important;
  }

  .notification-title {
    font-weight: 700 !important;
    font-size: 16px !important;
    text-align: left !important;
    margin-bottom: 6px !important;
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
