import styled from 'styled-components';

export const Wrapper = styled.div`
  .main {
    margin-top: 7rem !important;
    max-width: 95% !important;
    margin: 0 auto;
  }

  .input {
    max-width: 320px !important;

    margin-bottom: 20px !important;
  }
  .small-text {
    font-size: 0.9rem !important;
    text-align: center !important;
    transform: translateY(-35px) !important;
    color: red !important;
  }

  .span {
    font-size: 1rem !important;
    color: #00357a;
  }

  .buttonWrapper {
    margin-top: 10px !important;
  }

  span {
    color: #eb0000;
  }
  .checkBox {
    margin-bottom: 30px !important;
  }

  @media (max-width: 767px) {
    .divider {
      display: none !important;
    }
  }
  .logo {
    position: fixed;

    width: 100%;

    bottom: 10px !important;
  }
  .spacer {
    margin-bottom: 5rem !important;
    min-height: 100px;
  }

  .important-links {
    max-width: 40vw !important;
  }
`;
