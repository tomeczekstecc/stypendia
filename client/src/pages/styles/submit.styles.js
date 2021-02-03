import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 5%;
  .menu {
    margin-top: 6% !important;
  }

  .lead-header {
    position: absolute;
    top: -1.8rem;
    left: 3rem;
    z-index: 1;
  }

  .sub-header {
    margin-top: 2rem !important;
  }

  .form {
    margin-top: 5rem !important;
  }

  .input {
    max-width: 25rem !important;
    margin-bottom: 2rem;
  }

  .column {
    padding-left: 2rem;
  }

  .container {
    padding-bottom: 5rem;
  }

  .select-header {
    font-size: 13px !important;
    margin-bottom: 5px;
  }

  select:focus,
  select:active {
    border: 1px solid rgba(34, 36, 38, 0.15) !important;
    outline: 0;
  }

  select {
    max-width: 25rem !important;
    padding-top: 10px;
    line-height: 38px;
  }

  option {
    font-size: 1.1rem;
  }

  .adress-wrapper {
    max-width: 25rem;
    margin-top: 27px;
  }
  input,
  select {
    cursor: ${(props) =>
      props.submitMode === 'watch' ? 'not-allowed' : ''} !important;
  }
  .small-text {
    font-size: 0.9rem;
    text-align: center;
    /* margin-left:15% !important; */
    transform: translateY(-35px);
    color: red;
  }
  .select {
    font-size: 0.8rem;
    text-align: center;
    /* margin-left:15% !important; */
    transform: translateY(0);
    color: red;
  }
`;
