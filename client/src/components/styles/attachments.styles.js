import styled from 'styled-components';

export const Wrapper = styled.div`
  .card-item {
    min-width: 20% !important;
    position: relative !important;
  }

  .card-item.statement {
    cursor: ${(props) => (props.statementDisabled ? 'not-allowed' : 'pointer')};
  }

  .card-item.report_card {
    cursor: ${(props) =>
      props.report_cardDisabled ? 'not-allowed' : 'pointer'};
  }

  .card-item.allowance {
    cursor: ${(props) => (props.allowanceDisabled ? 'not-allowed' : 'pointer')};
  }

  .card-item.attestation {
    cursor: ${(props) =>
      props.attestationDisabled ? 'not-allowed' : 'pointer'};
  }

  .card-item {
    cursor: ${(props) =>
      props.submitMode === 'watch' ? 'not-allowed' : 'pointer'};
  }

  .icons {
    position: relative;
    display: inline-block;
    left: 45%;
  }
  .target {
    position: absolute !important;
    top: 5px !important;
    left: 10px !important;
  }

  .placeholder-image {
    position: relative !important;
  }
  .btn {
    display: inline-block !important;
    margin-left: 3px !important;
    z-index: -1 !important;
    opacity: 0.9;
  }
  .img-button {
    position: absolute !important;
    z-index: 1 !important;
    top: 10px !important;
    right: 5px !important;
    display: ${(props) =>
      props.submitMode === 'watch' ? 'none' : 'inline-flex !important'};
  }

  .small-text.att {
    position: absolute !important;
    width: 100% !important;
    left: 0 !important;
    transform: translateY(-70px) !important;
    font-size: 0.9rem !important;
    text-align: center !important;
    /* margin-left:15% !important; */
    color: red !important;
  }
  .date {
    font-size: 14px !important;
  }

  .card-header {
    font-size: 16px !important;
  }

  .obligatory {
    color: #eb0000 !important;
  }

  .ui.fluid.image::before {
    display: none !important;
  }
  img {
    overflow: hidden !important;
    border-top-left-radius: 4px !important;
    border-top-right-radius: 4px !important;
    overflow: hidden !important;
  }
`;
