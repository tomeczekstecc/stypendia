import styled from 'styled-components';

export const Wrapper = styled.div`
  text-align: left;
  font-size: 1.2rem;
  .intro {
    font-size: 1rem !important;
    margin-left: 1.8rem !important;
    margin-top: 2rem !important;
    color: #666 !important;
  }

  ol {
    font-size: 1rem !important;
    line-height: 1.7;
    color: #666 !important;
  }

  .check-wrapper {
    position: relative !important;
  }
  .small-text.err {
    position: absolute !important;
    transform: translate(0,40px) !important;

  }
`;
