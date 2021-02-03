 import styled from 'styled-components';

export const Wrapper = styled.div`
  .card {
    min-width: 30% !important;
  }

  .icons {
    position: relative;
    display: inline-block;
    left: 45%;
  }

  .icon-wrapper {
    height: 350px !important;
    /* background-color: gray; */
  }

  img:hover {
    cursor: pointer !important;
  }

  .pond {
    height: 350px !important;
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
    z-index: 10000000000 !important;
    top: 10px !important;
    right: 5px !important;
  }

  .trash-btn {
    display: ${(props) =>
      props.submitMode !== 'new' ? 'none' : null} !important;
  }

  .small-text {
    font-size: 0.9rem !important;
    text-align: center !important;
    /* margin-left:15% !important; */
    margin-bottom: -40px !important;
    color: red !important;
  }
`;
