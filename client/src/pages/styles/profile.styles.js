import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;

  height: 80vh !important;

  .items-container {
    max-width: 800px !important;
    display: flex;

    & :first-child {
      padding-right: 2rem;
    }
  }

  .header {
    margin-bottom: 5px !important;
  }

  .link {
    transform: translateY(-60%) !important;
    margin-right: 0 !important;
  }
`;
