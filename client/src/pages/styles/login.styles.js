import styled from 'styled-components';

export const Wrapper = styled.div`
  .main-segment {
    padding-top: 2rem !important;
    margin-top: 7rem !important;
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
  }

  .buttonWrapper {
    margin-top: 10px !important;
  }

  @media (max-width: 767px) {
    .divider {
      display: none !important;
    }
  }
 .logo {
    position: fixed;
    display: flex;
    flex-direction: column;

    bottom: 10px !important;
  }
`;
