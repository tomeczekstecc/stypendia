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

`;