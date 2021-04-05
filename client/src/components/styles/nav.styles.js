import styled from 'styled-components'


export const Wrapper = styled.div`
  position: absolute !important;
  bottom: 110px !important;
  right: 40px !important;
  opacity: 0.9 !important;

  .submit {
    display: ${(props) => (props.mode === 'edit' ? 'none !important' : null)};
  }

  .save {
    display: ${(props) => (props.mode === 'new' ? 'none !important' : null)};
  }
  .save,
  .submit {
    display: ${(props) => (props.mode === 'watch' ? 'none !important' : null)};
  }

  .buttonik1 {
    background-color: #098024 !important;
    /* font-size: 1.3em !important; */
  }
  .buttonik1:hover {
    background-color: #0a942a !important;
  }
`;