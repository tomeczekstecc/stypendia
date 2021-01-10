import styled from 'styled-components';

export const Wrapper = styled.div`
  .main {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
  }

  .right {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 100;
    margin-left: 0;
    margin-right: 0;
  }
`;
