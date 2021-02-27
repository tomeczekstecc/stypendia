import styled from 'styled-components';

export const Wrapper = styled.div`
  .edit-btn {
    /* border-radius: 0 !important; */
  }
  .pdf-btn{
width: 33% !important;
  }
  .required-legend {
    position: absolute;
    right: 10px;
    bottom: -25px;

    & .star {
      color: red !important;
    }

    & .star-text {
      color: black !important;
      font-size: 0.9rem !important;
    }
  }
`;
