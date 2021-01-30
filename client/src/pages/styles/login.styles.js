import styled from 'styled-components';

export const Wrapper = styled.div`
  .main {
    margin-top: 7rem;
  }

  .input {
    max-width: 320px !important;
    margin-bottom: 20px;
  }
  .small {
    font-size: 0.9rem;
    text-align: center;
    transform: translateY(-35px);
    color: red;
  }

  .span {
    font-size: 1rem;
  }

  .buttonWrapper {
    margin-top: 10px;
  }
  @media (max-width: 767px) {
    .divider {
      display: none;
    }
  }
`;
