import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  /* align-self: center; */
  height: 100vh !important;

  .items-container {
    max-width: 600px !important;
  }

  .btn {
    margin-top: 1rem;
  }
  .header {
    margin-bottom: 20px !important;
  }
  button {
    margin-bottom: 20px !important;
  }
  .link {
    transform: translateY(-50%) !important;
  }
`;
