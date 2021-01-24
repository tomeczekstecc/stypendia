import styled from 'styled-components';

export const Wrapper = styled.div`
  .card {
    min-width: 30%;
  }

  .icons {
    position: relative;
    display: inline-block;
    left: 45%;
  }

  .icon-wrapper {
    height: 350px;
    /* background-color: gray; */
  }

  img:hover {
    cursor: pointer !important;
  }

  .pond {
    height: 350px !important;
  }
  .target {
    position: absolute;
    top: 5px;
    left: 10px;
  }

  .placeholder-image {
    position: relative;
  }
  .btn {
    display: inline-block !important;
    margin-left: 3px !important;
  }
  .img-button {
    position: absolute;
    z-index: 10000000000;
    top: 10px;
    right: 5px;
  }

  .trash-btn {
    display: ${(props) =>
      props.submitMode !== 'new' ? 'none' : null} !important;
  }
`;
