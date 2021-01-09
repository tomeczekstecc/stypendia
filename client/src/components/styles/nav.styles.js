import styled from 'styled-components'


export const Wrapper = styled.div`

    position: fixed;
    bottom: 40px;
    right: 40px;
    opacity: .9;

.submit{
  display: ${props=>props.mode==='edit' ? 'none' : null }
}

.save{
  display: ${props=>props.mode==='new' ? 'none' : null }
}
.save, .submit{
  display: ${props=>props.mode==='watch' ? 'none' : null }
}

`;