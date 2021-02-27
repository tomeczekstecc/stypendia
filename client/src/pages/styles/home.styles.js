import styled from 'styled-components';

export const Wrapper = styled.div`
  min-width: 50% !important;
  padding-top: 50px;

  .card {
    margin: 20px 25px !important;
    min-width: 297px !important;
  }

  .text-left {
    text-align: 'left' !important;
  }

  .cards-wrapper {
    margin-top: 10px !important;
    margin-bottom: 10px !important;
  }

  .label {
    position: absolute !important;
    right: 10px;
    top: -11px;
  }
  .segment-item {
    /* padding: 40px 0 !important; */
    min-height: 220px;
  }

  .relative {
    position: relative !important;
  }

  button {
    /* max-width: 100%; */
    border-radius: 0 !important;
  }

  .watch-btn {
    border-top-left-radius: 3px !important;
    border-bottom-left-radius: 3px !important;
  }

  .pdf-btn {
    border-top-right-radius: 3px !important;
    border-bottom-right-radius: 3px !important;
  }

  .ui.two.buttons {
    min-width: 100% !important;
    margin: 0 auto !important;
    padding: auto !important;
  }
`;
