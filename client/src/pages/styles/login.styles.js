import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-bottom: 10rem;
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
    justify-content: center;
    align-items: center;
    /* min-width: 100%; */
    margin-left: auto;
    margin-right: auto;
    bottom: 10px;
    margin-top: 2rem;
  }
  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 95%;
    min-width: 500px;
  }
  .intro-warning {
    margin-bottom: -5rem;
    margin-top: 5rem;
    max-width: 60%;
    margin-left: auto;
    margin-right: auto;

  }
  .logo p {
    background-color: #fff;
  }
`;
