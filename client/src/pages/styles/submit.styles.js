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
  .dropdown-wrapper {
    min-width: 100% !important;
    margin-bottom: 3rem;
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
  .aver-label {
    margin-bottom: 4rem !important;
    width: 100%;
  }
  .column {
    padding-left: 2rem !important;
  }
  .grade-selector {
    /* max-width:145px !important; */
  }
  .container {
    padding-bottom: 5rem !important;
  }

  .select-header {
    font-size: 14px !important;
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

  .inline-position {
    /* width:30vw !important; */
    display: inline !important;
  }
  .inline-position.header {
    /* transform: translateY(7px) */
  }
  .drop {
    margin: 0 !important;
    margin-left: 1rem !important;
    min-width: 15% !important;
    /* padding-left: 2rem !important; */
  }

  .label-valid {
    margin-left: 2rem !important;
  }

  .segment-vii {
    margin-top: 2rem !important;
    margin-bottom: 3rem !important;
    padding: 1.5rem !important;
  }

  .form-textArea {
    margin: 10px !important;
    min-width: 80%;

    /* margin-top: -70px !important; */
  }

  .form-vii{
margin: 0 !important; width: 100% !important;
  }
`;
