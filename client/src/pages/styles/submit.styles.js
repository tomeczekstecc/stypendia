import styled from 'styled-components';

export const Wrapper = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,700;1,300&display=swap');
  padding-top: 80px !important;
  .disabled-item,
  .disabled-item label,
  .labeler .disabled-item,
  .disabled-item .input,
  .disabled-item .dropdown {
    color: rgba(0, 0, 0, 1) !important;
    opacity: 0.8 !important;
    cursor: not-allowed !important;
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
  .dropdown {
    max-width: 25rem !important;
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
    text-align: center !important;
    transform: translateY(-35px) !important;
    font-size: 0.85rem !important;
  }

  .small-text.text-selector {
    transform: translateY(0px) !important;
  }

  .small-text.text-selector.upper {
    transform: translateY(-28px) !important;
  }

  .small-text.text-selector.upper2 {
    transform: translateY(-55px) !important;
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
    padding: 0.8rem 2.5rem 0.8rem 2.5rem !important;
    margin-left: 1rem !important;
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
  .form-vii {
    margin: 0 !important;
    width: 100% !important;
  }
  .area-err {
    margin-top: 2.5rem !important;
    margin-left: 0.8rem !important;
  }
  .inputVIIb {
    margin: 0 !important;
    margin-left: 1rem !important;
    padding: 0 !important;
    height: 3rem !important;
  }
  .key-subj-err {
    margin-top: 3px !important;
  }
  .accordion-results {
    transform: translateY(4px) !important;
  }
  .input-cell {
    padding: 10px !important;
  }
  .table-input {
    border: 0;
    font-size: 16px;
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.87);
    text-align: right;
    padding: 10px;
    border-radius: 5px;
    border-style: solid;
    border-color: rgb(235, 234, 232) !important;
    border-collapse: none;
    border-width: 1px;
  }
  .red-clr {
    color: red !important;
  }
  .cell-red {
    background-color: #ffebee !important;
  }
  .visible {
    padding-top: 5px;
    text-align: left;
    color: #eb0000 !important;
    font-size: 13px;
    line-height: 1.15;
  }
  .hidden {
    display: none;
  }
  .substantion {
    min-width: 98% !important;
  }
  .table-err {
    margin-top: 50px !important;
    margin-bottom: -70px !important;
    margin-right: 5px !important;
    /* text-align: right !important; */
  }
  .calculatePriAver {
    margin-bottom: 2rem !important;
    transform: translateY(-55px);
  }
  [data-name='tab1Subj'] {
    min-width: 400px !important;
  }
  .labeler {
    color: rgba(0, 0, 0, 0.87) !important;
    line-height: 1.4285em !important;
    font-weight: 700 !important;
    font-size: 13px !important;
    padding-bottom: 5px !important;
  }
  .addTop {
    padding-top: 5px !important;
  }

  .star {
    color: #eb0000 !important;
  }
  .lower-label {
    padding-bottom: 0 !important;
  }
  label {
    font-size: 13px !important;
  }

  .acc-dimmed,
  .table-disabled {
    opacity: 0.75 !important;
    cursor: not-allowed !important;
  }
  .disabled {
    cursor: not-allowed !important;
  }
  .results-counter {
    color: #01827c !important;
    border-color: #01827c !important;
  }
`;
