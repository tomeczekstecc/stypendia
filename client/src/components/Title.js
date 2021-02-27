import React from 'react';
import { Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles/title.styles';

const Title = ({ sub, content }) => {
  return (
    <Wrapper>
      <Header textAlign='center' dividing size='medium'>
        <Header.Subheader className='inlinedis subber'>
          {sub} <span style={{ opacity: '0' }}>I</span>{' '}
        </Header.Subheader>
        <Header.Content className='inlinedis'>{content}</Header.Content>
      </Header>
    </Wrapper>
  );
};

Title.defaultProps = {
  sub: 'Jesteś tutaj: ',
};

Title.propTypes = {
  sub: PropTypes.string,
};

export default Title;
