import styled from 'styled-components'


export const Wrapper = styled.div`
  position: absolute;
  bottom: 110px;
  right: 40px;
  opacity: 0.9;

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