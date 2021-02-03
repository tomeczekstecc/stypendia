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
    font-size: 0.9rem!important;
    text-align: center!important;
    transform: translateY(-35px)!important;
    color: red!important;
  }

  .span {
    font-size: 1rem!important;
  }

  .buttonWrapper {
    margin-top: 10px!important;
  }

  span {
    color: red!important;
  }
  .checkBox {
    margin-bottom: 30px!important;
  }

  @media (max-width: 767px) {
    .divider {
      display: none!important;
    }
  }
`;
