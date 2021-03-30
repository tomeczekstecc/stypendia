import styled from 'styled-components';

export const Wrapper = styled.div`
  .notification-container {
    font-size: 14px !important ;
    box-sizing: border-box !important;
    position: fixed !important;
    z-index: 99999999 !important;
  }

  .top-right {
    top: 12px !important;
    right: 12px !important;
    animation: toast-in-right 0.5s !important;
  }

  .bottom-right {
    bottom: 12px !important;
    right: 12px !important;
    animation: toast-in-right 0.5s !important;
  }

  .bottom-left {
    bottom: 12px !important;
    left: 12px !important;
    animation: toast-in-left 0.5s !important;
  }
  .top-left {
    top: 12px !important;
    left: 12px !important;
    animation: toast-in-left 0.5s !important;
  }
  .notification {
    min-width: 350px !important;
    margin-top: 5px !important;
    z-index: -1 !important;
  }

  .notification-title {
    font-weight: 700 !important;
    font-size: 16px !important;
    text-align: left !important;
    margin-bottom: 6px !important;
  }

  @keyframes toast-in-right {
    from {
      transform: translateX(100%) !important;
    }
    to {
      translate: translateX(0) !important;
    }
  }
  @keyframes toast-in-left {
    from {
      transform: translateX(-100%) !important;
    }
    to {
      translate: translateX(0) !important;
    }
  }
`;

export const Close = styled.div`
  position: relative;
  .close-button {
    position: absolute !important;
    /* transform: translate(488px, 30px) !important; */
    top: 9px !important;
    right: 8px !important;
    font-size: 16px !important;
    z-index: 99909999999 !important;
    color: ${(props) => props.color};
    opacity: 0.9 !important;
  }
`;
