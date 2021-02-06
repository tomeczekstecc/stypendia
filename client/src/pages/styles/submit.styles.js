import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 5% !important;
  .menu {
    margin-top: 6% !important;
  }

  .lead-header {
    position: absolute !important;
    top: -1.8rem !important;
    left: 3rem !important;
    z-index: 1 !important;
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

  .input-left {
    width: 40% !important;
  }
  .input-right {
    width: 50px !important;
  }

  .column {
    padding-left: 2rem !important;
  }
.grade-selector{
/* max-width:145px !important; */
}
  .container {
    padding-bottom: 5rem !important;
  }

  .select-header {
    font-size: 13px !important;
    margin-bottom: 5px !important;
  }

  select:focus,
  select:active {
    border: 1px solid rgba(34, 36, 38, 0.15) !important;
    outline: 0 !important;
  }

  select {
    max-width: 25rem !important;
    padding-top: 10px !important;
    line-height: 38px !important;
  }

  option {
    font-size: 1.1rem !important;
  }

  .adress-wrapper {
    max-width: 25rem !important;
    margin-top: 27px !important;
  }
  input,
  select {
    cursor: ${(props) =>
      props.submitMode === 'watch' ? 'not-allowed' : ''} !important;
  }
  .small-text {
    font-size: 0.9rem !important;
    text-align: center !important;
    /* margin-left:15% !important; */
    transform: translateY(-35px) !important;
    color: red;
  }
  .select {
    font-size: 0.8rem !important;
    text-align: center;
    /* margin-left:15% !important; */
    transform: translateY(0) !important;
    color: red !important;
  }
`;
